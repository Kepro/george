import { ExchangeCurrency, CurrencyItem } from "../types/ExchangeCurrency";
import {
  FILTERED_CURRENCIES,
  REPLACED_CURRENCIES,
  REPLACED_MAP_CURRENCIES,
} from "../consts/currenciesList";
import {
  getCountryCodeByCurrency,
  getCountryNameByCurrency,
} from "./countries";
import { CURRENCIES_COUNTRY_MAP } from "../consts/currenciesCountryMap";

/**
 * Checks if a given currency is valid.
 *
 * @param {ExchangeCurrency} currency - The currency to be validated.
 * @returns {boolean} - Returns true if the currency is valid, otherwise false.
 */
export const isValidCurrency = (currency: ExchangeCurrency): boolean => {
  // filter empty currency
  if (!currency.currency.trim()) return false;
  if (currency.currency && FILTERED_CURRENCIES.includes(currency.currency)) {
    return false;
  }

  return true;
};

/**
 * Transforms a currency into its replacement value
 *
 * @param {string} currency - The currency to transform
 * @returns {string} The transformed currency value
 */
export const transformObsoleteCurrencyToCurrent = (
  currency: (typeof REPLACED_CURRENCIES)[number],
): string => {
  return REPLACED_MAP_CURRENCIES[currency];
};

/**
 * Adds country fields to the given currency item.
 *
 * @param {ExchangeCurrency} exchangeCurrency - The currency item to update.
 * @returns {CurrencyItem} - The updated currency item with country fields.
 */
export const addCountryFieldsToCurrency = (
  exchangeCurrency: ExchangeCurrency,
): CurrencyItem => {
  const legacyCurrency = REPLACED_CURRENCIES.includes(
    exchangeCurrency.currency as (typeof REPLACED_CURRENCIES)[number],
  );
  // TODO: ask PO if he want it this way or we should hide obsolete currencies
  const currency = legacyCurrency
    ? transformObsoleteCurrencyToCurrent(
        exchangeCurrency.currency as (typeof REPLACED_CURRENCIES)[number],
      )
    : exchangeCurrency.currency;

  // if currency is used in multi countries we need to pick one
  if (CURRENCIES_COUNTRY_MAP[currency]) {
    const mapCountry = CURRENCIES_COUNTRY_MAP[currency];
    return {
      ...exchangeCurrency,
      ...mapCountry,
      legacyCurrency,
    };
  }

  return {
    ...exchangeCurrency,
    countryName: getCountryNameByCurrency(currency)!,
    countryCode: getCountryCodeByCurrency(currency)!,
    legacyCurrency,
  };
};

/**
 * Checks if a given search parameter exists in currency fields.
 *
 * @param {CurrencyItem} currency - The currency item to check.
 * @param {string} searchParam - The search parameter to check for.
 * @returns {boolean} - True if the search parameter exists in any of the currency fields, false otherwise.
 */
export const checkSearchParamInCurrencyFields = (
  currency: CurrencyItem,
  searchParam: string,
): boolean => {
  const param = searchParam.trim().toLowerCase();
  const searchFields = [
    "nameI18N",
    "countryName",
    "countryCode",
    "currency",
  ] as const;

  return searchFields.some(
    (field) => currency[field]?.trim().toLowerCase().includes(param),
  );
};
