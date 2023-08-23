export interface ExchangeCurrency {
  currency: string;
  precision: number;
  legacyCurrency: boolean;
  denominations?: number[];
  nameI18N?: string;
  banknoteRate?: ExchangeRate;
  exchangeRate?: ExchangeRate;
  flags?: ["provided"];
}

export interface CurrencyItem extends ExchangeCurrency {
  countryName: string;
  countryCode: string;
}

export interface ExchangeRate {
  buy: number;
  indicator: number;
  lastModified: string;
  middle: number;
  sell: number;
}
