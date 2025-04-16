import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useSimulationContext } from '../context/SimulationContext';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export function ChargerUsageChart() {
  const { results } = useSimulationContext();
  if (!results) return null;

  const chargePointStats = results.chargePointStats;

  const data = {
    labels: chargePointStats.map((cp) => `Charger ${cp.id}`),
    datasets: [
      {
        label: 'Total Energy (kWh)',
        data: chargePointStats.map((cp) => cp.totalEnergy),
        backgroundColor: '#60A5FA',
        borderRadius: 4,
      },
      {
        label: 'Average Power (kW)',
        data: chargePointStats.map((cp) => cp.averagePower),
        backgroundColor: '#34D399',
        borderRadius: 4,
      },
      {
        label: 'Charging Events',
        data: chargePointStats.map((cp) => cp.chargingEvents),
        backgroundColor: '#FBBF24',
        borderRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Charge Point Statistics',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-4 text-gray-600">
        Charge Point Details
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {chargePointStats.map((cp) => (
          <div
            key={cp.id}
            className="bg-white p-4 rounded-lg shadow text-gray-800"
          >
            <h4 className="font-semibold mb-2">Charger {cp.id}</h4>
            <div className="space-y-1">
              <p>Total Energy: {cp.totalEnergy.toFixed(2)} kWh</p>
              <p>Average Power: {cp.averagePower.toFixed(2)} kW</p>
              <p>Charging Events: {cp.chargingEvents}</p>
            </div>
          </div>
        ))}
      </div>
      <Bar data={data} options={options} />
    </div>
  );
}
