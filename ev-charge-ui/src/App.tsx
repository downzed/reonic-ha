import './index.css';
import { SimulationForm } from './components/SimulationForm';
import TimePeriodCharts from './components/TimePeriodCharts';
import { useSimulationContext } from './context/SimulationContext';

const App = () => {
  const { results } = useSimulationContext();

  const resultsMap = [
    { label: 'Total Energy', value: results?.totalEnergy, suffix: 'kWh' },
    { label: 'Peak Power', value: results?.peakPower, suffix: 'kW' },
    {
      label: 'Concurrency Factor',
      value: results?.concurrencyFactor,
      suffix: '%',
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      <h1 className="text-2xl text-gray-700 font-bold text-center py-6">
        EV Simulation UI
      </h1>

      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Form */}
          <div className="lg:w-1/3">
            <SimulationForm />
          </div>

          {/* Right Column - Results and Charts */}
          <div className="lg:w-2/3">
            {results && (
              <div className="space-y-8">
                <div className="bg-white p-6 rounded-lg shadow">
                  <h2 className="text-xl text-gray-600 font-semibold mb-4">
                    Simulation Result
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {resultsMap.map((item) => (
                      <div
                        className="bg-blue-50 p-4 rounded-lg"
                        key={`${item.label}-${item.suffix}`}
                      >
                        <h3 className="text-sm font-medium text-gray-600">
                          {item.label}
                        </h3>
                        <p className="text-2xl font-bold text-blue-600">
                          {item.value?.toFixed(2)} {item.suffix}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="py-2">
                  <TimePeriodCharts result={results} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default App;
