import { ExchangeCurrency } from "./ExchangeCurrency";

export type MockyCurrencies = {
  baseCurrency: string;
  comparisonDate: string;
  fx: ExchangeCurrency[];
  institute: number;
  lastUpdated: string;
};
