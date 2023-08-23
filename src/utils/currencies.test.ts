import {
  isValidCurrency,
  transformObsoleteCurrencyToCurrent,
  addCountryFieldsToCurrency,
  checkSearchParamInCurrencyFields,
} from "./currencies";
import { CurrencyItem, ExchangeCurrency } from "../types/ExchangeCurrency";
import { FILTERED_CURRENCIES } from "../consts/currenciesList";

describe("isValidCurrency", () => {
  test("returns false for an empty currency", () => {
    expect(isValidCurrency({ currency: "" } as ExchangeCurrency)).toBe(false);
  });

  test("returns false for an filtered currency", () => {
    expect(
      isValidCurrency({ currency: FILTERED_CURRENCIES[0] } as ExchangeCurrency),
    ).toBe(false);
  });

  test("returns false for an valid currency", () => {
    expect(isValidCurrency({ currency: "USD" } as ExchangeCurrency)).toBe(true);
  });
});

describe("transformObsoleteCurrencyToCurrent", () => {
  test("transforms an obsolete currency to its current value", () => {
    expect(transformObsoleteCurrencyToCurrent("MZM")).toBe("MZN");
    expect(transformObsoleteCurrencyToCurrent("ROL")).toBe("RON");
  });
});

describe("addCountryFieldsToCurrency", () => {
  test("adds country fields to a given currency item", () => {
    const currencyItem = addCountryFieldsToCurrency({
      currency: "USD",
    } as ExchangeCurrency);
    expect(currencyItem.countryName).toBe("United States");
    expect(currencyItem.countryCode).toBe("US");
  });
});

describe("checkSearchParamInCurrencyFields", () => {
  test("checks if a given search parameter currency exists in currency fields", () => {
    const result = checkSearchParamInCurrencyFields(
      { currency: "USD" } as CurrencyItem,
      "UsD",
    );
    expect(result).toBe(true);
  });

  test("checks if a given search parameter countryName exists in currency fields", () => {
    const result = checkSearchParamInCurrencyFields(
      { currency: "USD", countryName: "United States" } as CurrencyItem,
      "  sTaTeS  ",
    );
    expect(result).toBe(true);
  });

  test("checks if a given search parameter countryCode exists in currency fields", () => {
    const result = checkSearchParamInCurrencyFields(
      {
        currency: "XYZ",
        countryName: "America",
        countryCode: "US",
      } as CurrencyItem,
      "us",
    );
    expect(result).toBe(true);
  });
});
