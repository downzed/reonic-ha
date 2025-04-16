import { simulate } from './sim';
import { SimulationResult } from './types';

/**
 * Runs simulation for different numbers of charge points and displays concurrency factors
 */
const runConcurrencyAnalysis = (): void => {
  console.log('\nConcurrency Factor by Number of Chargepoints');
  console.log('--------------------------------------------');
  
  for (let n = 1; n <= 30; n++) {
    const { concurrencyFactor } = simulate(n);
    console.log(`→ ${n.toString().padStart(2)} chargepoints: ${concurrencyFactor.toFixed(2)}%`);
  }
};

/**
 * Runs simulation for a fixed number of charge points and displays detailed results
 */
const runDetailedAnalysis = (): void => {
  const NUM_CHARGE_POINTS = 20;
  const result: SimulationResult = simulate(NUM_CHARGE_POINTS);

  console.log('\nDetailed Analysis for 20 Charge Points');
  console.log('-------------------------------------');
  console.log(`Max Power Observed:    ${result.maxPowerObserved.toFixed(2)} kW`);
  console.log(`Total Energy Consumed: ${result.totalEnergyConsumed.toFixed(2)} kWh`);
  console.log(`Concurrency Factor:    ${result.concurrencyFactor.toFixed(2)}%`);
};

// Run analyses
runDetailedAnalysis();
runConcurrencyAnalysis();
