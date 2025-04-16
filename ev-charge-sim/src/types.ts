export interface ChargePoint {
  isBusy: boolean;
  ticksRemaining: number;
}

export interface ChargingNeedOption {
  kilometers: number | null;
  prob: number;
}

export interface ArrivalProbability {
  hour: number;
  prob: number;
}

export interface SimulationResult {
  maxPowerObserved: number;
  totalEnergyConsumed: number;
  theoreticalMaxPower: number;
  concurrencyFactor: number;
} 