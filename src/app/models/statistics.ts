export interface Statistics {
  continent: string;
  country: string;
  population: number;
  cases: {
    new: number;
    active: number;
    critical: number;
    recovered: number;
    total: number;
  };
  deaths: {
    new: number;
    total: number;
  };
  tests: {
    total: number;
  };
  day: Date;
  time: Date;
}
