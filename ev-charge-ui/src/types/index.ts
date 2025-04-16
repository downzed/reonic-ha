export type SimulationValueTypes = {
  chargePoints: number; // 1 - 30
  arrivalMultiplier: number; // 20% - 200% (as number), default: 100%
  consumptionPer100km: number; // kWh/100km, default: 18
  powerPerCharger: number; // kW, default: 11
};

export type ChargingEvent = {
  timestamp: string;
  power: number;
  chargePointId: number;
};

export type TimePeriodStats = {
  year: number;
  month: number;
  day: number;
};

export type ChargePointStats = {
  id: number;
  totalEnergy: number;
  averagePower: number;
  chargingEvents: number;
};

export type SimulationResults = {
  totalEnergy: number; // kWh
  peakPower: number; // kW
  concurrencyFactor: number; // percentage
  chargingEvents: TimePeriodStats;
  chargePointStats: ChargePointStats[];
  hourlyData: ChargingEvent[];
};

export type SimulationInputUiType = {
  label: string;
  type: 'number' | 'text';
  name: string;
  range: {
    min: number;
    max: number;
  };
  step: number;
  unit: string;
};
