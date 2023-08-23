import {
  getCountryCodeByCurrency,
  getCountryNameByCurrency,
} from "./countries";
import { CURRENCIES_COUNTRY_MAP } from "../consts/currenciesCountryMap";

describe("Currency to Country mappings", () => {
  it("should return country code for a given currency", () => {
    expect(getCountryCodeByCurrency("MVR")).toBe("MV");
    expect(getCountryCodeByCurrency("FJD")).toBe("FJ");
    // override by CURRENCY_COUNTRY_MAP
    expect(getCountryCodeByCurrency("USD")).toBe("US");
    expect(getCountryCodeByCurrency("GBP")).toBe("GB");
  });

  it("should return country name for a given currency", () => {
    expect(getCountryNameByCurrency("MVR")).toBe("Maldives");
    expect(getCountryNameByCurrency("FJD")).toBe("Fiji");
    // override by CURRENCY_COUNTRY_MAP
    expect(getCountryNameByCurrency("USD")).toBe("United States");
    expect(getCountryNameByCurrency("GBP")).toBe("United Kingdom");
  });

  describe("Currency to Country Mappings Verification", () => {
    Object.entries(CURRENCIES_COUNTRY_MAP).forEach(
      ([currency, countryDetails]) => {
        it(`should verify currency ${currency} mapping to country details`, () => {
          expect(getCountryCodeByCurrency(currency)).toBe(
            countryDetails.countryCode,
          );
          expect(getCountryNameByCurrency(currency)).toBe(
            countryDetails.countryName,
          );
        });
      },
    );
  });

  it("should return null when currency code is not valid", () => {
    expect(getCountryCodeByCurrency("XYZ")).toBeNull();
    expect(getCountryNameByCurrency("ABC")).toBeNull();
  });
});
