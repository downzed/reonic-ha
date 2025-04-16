import { ChargingNeedOption } from './types';

export type ChargePoint = {
  isBusy: boolean;
  ticksRemaining: number;
};

export type ArrivalProbability = {
  hour: number;
  prob: number;
};

/**
 * Selects a random charging need based on probability distribution
 * @param options Array of charging need options with their probabilities
 * @returns Selected charging need option
 */
export function pickRandomNeed(options: ChargingNeedOption[]): ChargingNeedOption {
  const roll = Math.random() * 100;
  let cumulative = 0;

  for (const option of options) {
    cumulative += option.prob;
    if (roll <= cumulative) return option;
  }

  // Fallback if rounding errors occur
  return options[options.length - 1];
}

/**
 * Calculates the number of ticks needed to charge a given amount of energy
 * @param energyNeeded Energy needed in kWh
 * @param powerPerCharger Power per charger in kW
 * @returns Number of ticks needed to charge
 */
export function calculateTicksToCharge(energyNeeded: number, powerPerCharger: number): number {
  const hoursToCharge = energyNeeded / powerPerCharger;
  return Math.ceil(hoursToCharge * 4); // 4 ticks per hour
}
