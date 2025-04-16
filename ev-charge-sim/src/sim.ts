import {
  CONSUMPTION_PER_100KM,
  POWER_PER_CHARGER,
  TICKS_PER_DAY,
  TOTAL_TICKS_PER_YEAR,
} from './constants';

import { arrivalProbabilities, chargingNeeds } from './data';
import { ChargePoint, pickRandomNeed, calculateTicksToCharge } from './util';
import { SimulationResult } from './types';

/**
 * Initializes an array of charge points
 * @param numOfChargePoints Number of charge points to create
 * @returns Array of initialized charge points
 */
function initializeChargePoints(numOfChargePoints: number): ChargePoint[] {
  return Array.from({ length: numOfChargePoints }, () => ({
    isBusy: false,
    ticksRemaining: 0,
  }));
}

/**
 * Updates the state of a charge point for a single tick
 * @param charger Charge point to update
 * @param arrivalChance Probability of an EV arrival
 * @returns Energy consumed in this tick (in kWh)
 */
function updateChargePoint(charger: ChargePoint, arrivalChance: number): number {
  let energyConsumed = 0;

  // Update busy chargers
  if (charger.isBusy) {
    charger.ticksRemaining--;
    if (charger.ticksRemaining <= 0) {
      charger.isBusy = false;
    }
    energyConsumed = POWER_PER_CHARGER / 4; // Energy per tick (15 minutes)
  }

  // Handle new arrivals
  if (!charger.isBusy) {
    const roll = Math.random() * 100;
    if (roll < arrivalChance) {
      const need = pickRandomNeed(chargingNeeds);
      if (need.kilometers !== null) {
        const energyNeeded = (need.kilometers / 100) * CONSUMPTION_PER_100KM;
        charger.isBusy = true;
        charger.ticksRemaining = calculateTicksToCharge(energyNeeded, POWER_PER_CHARGER);
      }
    }
  }

  return energyConsumed;
}

/**
 * Simulates EV charging behavior over a year
 * @param numOfChargePoints Number of charge points to simulate
 * @returns Simulation results including power consumption and concurrency factor
 */
export function simulate(numOfChargePoints: number): SimulationResult {
  const chargePoints = initializeChargePoints(numOfChargePoints);
  let totalEnergyConsumed = 0;
  let maxPowerObserved = 0;

  for (let tick = 0; tick < TOTAL_TICKS_PER_YEAR; tick++) {
    const hourOfDay = Math.floor((tick % TICKS_PER_DAY) / 4);
    const arrivalChance = arrivalProbabilities[hourOfDay].prob;

    let activeChargersThisTick = 0;
    let energyConsumedThisTick = 0;

    for (const charger of chargePoints) {
      energyConsumedThisTick += updateChargePoint(charger, arrivalChance);
      if (charger.isBusy) {
        activeChargersThisTick++;
      }
    }

    const currentPower = activeChargersThisTick * POWER_PER_CHARGER;
    maxPowerObserved = Math.max(maxPowerObserved, currentPower);
    totalEnergyConsumed += energyConsumedThisTick;
  }

  const theoreticalMaxPower = numOfChargePoints * POWER_PER_CHARGER;
  const concurrencyFactor = (maxPowerObserved / theoreticalMaxPower) * 100;

  return {
    maxPowerObserved,
    totalEnergyConsumed,
    theoreticalMaxPower,
    concurrencyFactor,
  };
}
