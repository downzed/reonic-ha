import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import { useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import type { SimulationResults } from '../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
);

type TimePeriod = 'day' | 'month' | 'year';

type TimePeriodData = {
  label: string;
  multiplier: number;
  timePoints: number;
};

type ChartDataPoint = {
  timestamp: string;
  power: number;
  chargePointId: number;
};

type PowerData = {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string;
    borderColor?: string;
    borderRadius?: number;
    tension?: number;
    fill?: boolean;
  }[];
};

const useTimePeriod = (initialPeriod: TimePeriod = 'day') => {
  const [activePeriod, setActivePeriod] = useState<TimePeriod>(initialPeriod);

  const getPeriodData = (period: TimePeriod): TimePeriodData => {
    const multiplier = period === 'day' ? 1 : period === 'month' ? 30 : 365;
    const timePoints = period === 'day' ? 24 : period === 'month' ? 30 : 12;
    return {
      label: period.charAt(0).toUpperCase() + period.slice(1),
      multiplier,
      timePoints,
    };
  };

  return {
    activePeriod,
    setActivePeriod,
    periodData: getPeriodData(activePeriod),
  };
};

const generateTimeBasedData = (
  period: TimePeriod,
  hourlyData: ChartDataPoint[],
  timePoints: number,
): ChartDataPoint[] => {
  if (period === 'day') {
    return hourlyData;
  }

  return Array.from({ length: timePoints }, (_, i) => {
    const basePower = hourlyData[i % 24].power;
    return {
      timestamp: period === 'month' ? `Day ${i + 1}` : `Month ${i + 1}`,
      power: basePower * (1 + Math.sin(i * 0.5) * 0.2),
      chargePointId: hourlyData[i % 24].chargePointId,
    };
  });
};

const generatePowerData = (
  result: SimulationResults,
  period: TimePeriod,
  timePoints: number,
): PowerData => {
  const timeBasedData = generateTimeBasedData(
    period,
    result.hourlyData,
    timePoints,
  );
  return {
    labels: timeBasedData.map((d) => d.timestamp),
    datasets: [
      {
        label: 'Power Usage (kW)',
        data: timeBasedData.map((d) => d.power),
        borderColor: '#7e9cd8',
        backgroundColor: 'rgba(126, 156, 216, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };
};

const generateChargePointData = (
  result: SimulationResults,
  period: TimePeriod,
): PowerData => {
  const powerMultiplier = period === 'day' ? 1 : period === 'month' ? 1.2 : 1.5;
  const peakMultiplier =
    period === 'day' ? 1.5 : period === 'month' ? 1.8 : 2.2;

  return {
    labels: result.chargePointStats.map((cp) => `Charger ${cp.id}`),
    datasets: [
      {
        label: 'Average Power (kW)',
        data: result.chargePointStats.map(
          (cp) => cp.averagePower * powerMultiplier,
        ),
        backgroundColor: '#60A5FA',
        borderRadius: 4,
      },
      {
        label: 'Peak Power (kW)',
        data: result.chargePointStats.map(
          (cp) => cp.averagePower * peakMultiplier,
        ),
        backgroundColor: '#FBBF24',
        borderRadius: 4,
      },
    ],
  };
};

const generateEnergyData = (
  result: SimulationResults,
  multiplier: number,
): PowerData => ({
  labels: result.chargePointStats.map((cp) => `Charger ${cp.id}`),
  datasets: [
    {
      label: 'Total Energy (kWh)',
      data: result.chargePointStats.map((cp) => cp.totalEnergy * multiplier),
      backgroundColor: '#34D399',
      borderRadius: 4,
    },
  ],
});

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    tooltip: {
      callbacks: {
        // biome-ignore lint/suspicious/noExplicitAny: reason
        label: (context: any) => {
          const label = context.dataset.label || '';
          const value = context.raw;
          return `${label}: ${Number(value).toFixed(2)}`;
        },
      },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: 'kW / kWh',
      },
    },
  },
};

const TimePeriodTabs = ({
  activePeriod,
  setActivePeriod,
}: {
  activePeriod: TimePeriod;
  setActivePeriod: (period: TimePeriod) => void;
}) => (
  <div className="flex space-x-4 mb-4">
    {(['day', 'month', 'year'] as TimePeriod[]).map((period) => (
      <button
        key={period}
        type="button"
        onClick={() => setActivePeriod(period)}
        className={`px-4 py-2 capitalize rounded-md ${
          activePeriod === period
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
        }`}
      >
        {period}
      </button>
    ))}
  </div>
);

const ChartCard = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div>
    <h3 className="text-lg font-semibold mb-4 text-gray-800">{title}</h3>
    <div className="bg-white p-4 rounded-lg shadow">{children}</div>
  </div>
);

const TimePeriodCharts = ({ result }: { result: SimulationResults }) => {
  const { activePeriod, setActivePeriod, periodData } = useTimePeriod();
  const [error, setError] = useState<string | null>(null);

  try {
    const powerData = generatePowerData(result, activePeriod, periodData.timePoints);
    const chargePointData = generateChargePointData(result, activePeriod);
    const energyData = generateEnergyData(result, periodData.multiplier);

    return (
      <div className="space-y-8">
        <TimePeriodTabs
          activePeriod={activePeriod}
          setActivePeriod={setActivePeriod}
        />

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <div className="space-y-6">
          <ChartCard
            title={`Power Usage per Charge Point (${periodData.label})`}
          >
            <Bar data={chargePointData} options={chartOptions} />
          </ChartCard>

          <ChartCard
            title={`${periodData.label} Power Usage Pattern`}
          >
            <Line data={powerData} options={chartOptions} />
          </ChartCard>

          <ChartCard
            title={`Total Energy Charged per Point (${periodData.label})`}
          >
            <Bar data={energyData} options={chartOptions} />
          </ChartCard>
        </div>
      </div>
    );
  } catch (err) {
    setError('Error rendering charts. Please try again.');
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        Error rendering charts. Please try again.
      </div>
    );
  }
};

export default TimePeriodCharts;
