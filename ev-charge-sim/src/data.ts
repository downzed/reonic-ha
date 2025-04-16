import { ArrivalProbability, ChargingNeedOption } from './types';

export const arrivalProbabilities: ArrivalProbability[] = [
  { hour: 0, prob: 0.94 },
  { hour: 1, prob: 0.94 },
  { hour: 2, prob: 0.94 },
  { hour: 3, prob: 0.94 },
  { hour: 4, prob: 0.94 },
  { hour: 5, prob: 0.94 },
  { hour: 6, prob: 0.94 },
  { hour: 7, prob: 0.94 },
  { hour: 8, prob: 2.83 },
  { hour: 9, prob: 2.83 },
  { hour: 10, prob: 5.66 },
  { hour: 11, prob: 5.66 },
  { hour: 12, prob: 5.66 },
  { hour: 13, prob: 7.55 },
  { hour: 14, prob: 7.55 },
  { hour: 15, prob: 7.55 },
  { hour: 16, prob: 10.38 },
  { hour: 17, prob: 10.38 },
  { hour: 18, prob: 10.38 },
  { hour: 19, prob: 4.72 },
  { hour: 20, prob: 4.72 },
  { hour: 21, prob: 4.72 },
  { hour: 22, prob: 0.94 },
  { hour: 23, prob: 0.94 },
];

export const chargingNeeds: ChargingNeedOption[] = [
  { kilometers: null, prob: 34.31 }, // Doesn't charge
  { kilometers: 5, prob: 4.9 },
  { kilometers: 10, prob: 9.8 },
  { kilometers: 20, prob: 11.76 },
  { kilometers: 30, prob: 8.82 },
  { kilometers: 50, prob: 11.76 },
  { kilometers: 100, prob: 10.78 },
  { kilometers: 200, prob: 4.9 },
  { kilometers: 300, prob: 2.94 },
];
