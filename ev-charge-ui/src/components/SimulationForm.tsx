import { type ChangeEvent, useState } from 'react';
import {
  defaultValues,
  useSimulationContext,
} from '../context/SimulationContext';
import type { SimulationInputUiType } from '../types';

const inputs: SimulationInputUiType[] = [
  {
    label: 'Number of Chargepoints',
    type: 'number',
    name: 'chargePoints',
    range: { min: 1, max: 30 },
    step: 1,
    unit: '',
  },
  {
    label: 'Arrival Multiplier',
    type: 'number',
    name: 'arrivalMultiplier',
    range: { min: 20, max: 200 },
    step: 5,
    unit: '%',
  },
  {
    label: 'Consumption',
    type: 'number',
    name: 'consumptionPer100km',
    range: { min: 10, max: 30 },
    step: 0.5,
    unit: 'kWh/100km',
  },
  {
    label: 'Charging Power per Point',
    type: 'number',
    name: 'powerPerCharger',
    range: { min: 3, max: 22 },
    step: 0.5,
    unit: 'kW',
  },
];

type SliderInputProps = {
  item: SimulationInputUiType;
  value: number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const SliderInput = ({ item, value, onChange }: SliderInputProps) => {
  const getSliderBackground = (value: number, min: number, max: number) => {
    const percentage = ((value - min) / (max - min)) * 100;
    return `linear-gradient(to right, #60A5FA 0%, #60A5FA ${percentage}%, #E5E7EB ${percentage}%, #E5E7EB 100%)`;
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label 
          htmlFor={item.name} 
          className="block font-medium text-gray-700"
          id={`${item.name}-label`}
        >
          {item.label}
        </label>
        <span 
          className="text-lg font-semibold text-blue-600"
          aria-live="polite"
          aria-atomic="true"
        >
          {value}
          {item.unit}
        </span>
      </div>

      <div className="relative">
        <input
          type="range"
          id={item.name}
          name={item.name}
          min={item.range.min}
          max={item.range.max}
          step={item.step}
          value={value}
          onChange={onChange}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          style={{
            background: getSliderBackground(value, item.range.min, item.range.max),
          }}
          aria-labelledby={`${item.name}-label`}
          aria-valuemin={item.range.min}
          aria-valuemax={item.range.max}
          aria-valuenow={value}
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>
            {item.range.min}
            {item.unit}
          </span>
          <span>
            {item.range.max}
            {item.unit}
          </span>
        </div>
      </div>
    </div>
  );
};

export function SimulationForm() {
  const { input, setInput, setResults } = useSimulationContext();
  const [showValue, setShowValue] = useState<Record<string, number>>({});
  const [isCalculating, setIsCalculating] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numValue = Number(value);
    const inputConfig = inputs.find((i) => i.name === name);

    if (inputConfig?.range) {
      if (numValue < inputConfig.range.min) {
        setInput({ ...input, [name]: inputConfig.range.min });
        return;
      }
      if (numValue > inputConfig.range.max) {
        setInput({ ...input, [name]: inputConfig.range.max });
        return;
      }
    }

    setInput({ ...input, [name]: numValue });
    setShowValue({ ...showValue, [name]: numValue });
  };

  const handleSubmit = async () => {
    try {
      setIsCalculating(true);
      // Calculate base daily events based on charge points and arrival multiplier
      const baseDailyEvents = Math.floor(
        input.chargePoints * (input.arrivalMultiplier / 100),
      );

      // Generate mock data for demonstration
      const mockResults = {
        totalEnergy: input.chargePoints * 1000,
        peakPower: input.chargePoints * input.powerPerCharger * 0.45,
        concurrencyFactor: 45 + Math.random() * 5,
        chargingEvents: {
          year: baseDailyEvents * 365,
          month: baseDailyEvents * 30,
          day: baseDailyEvents,
        },
        chargePointStats: Array.from({ length: input.chargePoints }, (_, i) => ({
          id: i + 1,
          totalEnergy: 1000 + Math.random() * 500,
          averagePower: input.powerPerCharger * (0.3 + Math.random() * 0.4),
          chargingEvents: baseDailyEvents,
        })),
        hourlyData: Array.from({ length: 24 }, (_, hour) => ({
          timestamp: `${hour}:00`,
          power: input.powerPerCharger * (0.2 + Math.random() * 0.6),
          chargePointId: Math.floor(Math.random() * input.chargePoints) + 1,
        })),
      };
      setResults(mockResults);
    } catch (error) {
      console.error('Error calculating simulation:', error);
    } finally {
      setIsCalculating(false);
    }
  };

  const handleReset = () => {
    setInput(defaultValues);
    setResults(null);
    setShowValue({});
  };

  return (
    <form className="space-y-6 max-w-md mx-auto bg-white px-6 py-2 rounded-lg shadow">
      <h2 className="text-xl text-teal-600 font-semibold text-center mb-6">
        Simulation Parameters
      </h2>

      {inputs.map((item) => (
        <SliderInput
          key={item.name}
          item={item}
          value={showValue[item.name] ?? input[item.name as keyof typeof input]}
          onChange={handleChange}
        />
      ))}

      <div className="flex space-x-4 pt-4">
        <button
          onClick={handleSubmit}
          className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          type="button"
          disabled={isCalculating}
        >
          {isCalculating ? 'Calculating...' : 'Run Simulation'}
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          Reset
        </button>
      </div>
    </form>
  );
}
