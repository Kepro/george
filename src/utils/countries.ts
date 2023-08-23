import {
  getAllCountriesByCurrencyOrSymbol,
  getAllISOByCurrencyOrSymbol,
} from "iso-country-currency";
import { CURRENCIES_COUNTRY_MAP } from "../consts/currenciesCountryMap";

export const getCountryCodeByCurrency = (currency: string) => {
  if (CURRENCIES_COUNTRY_MAP[currency]) {
    return CURRENCIES_COUNTRY_MAP[currency].countryCode;
  }

  try {
    return getAllISOByCurrencyOrSymbol("currency", currency).toString();
  } catch (e) {
    return null;
  }
};

export const getCountryNameByCurrency = (currency: string) => {
  if (CURRENCIES_COUNTRY_MAP[currency]) {
    return CURRENCIES_COUNTRY_MAP[currency].countryName;
  }

  try {
    return getAllCountriesByCurrencyOrSymbol("currency", currency).toString();
  } catch (e) {
    return null;
  }
};
