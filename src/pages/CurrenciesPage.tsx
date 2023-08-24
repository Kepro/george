import { useMemo } from "react";
import { useQuery } from "../hooks/useQuery";
import CurrencyList from "../components/CurrencyList";
import { useHashRouter } from "../hooks/useHashRouter";
import {
  isValidCurrency,
  addCountryFieldsToCurrency,
  checkSearchParamInCurrencyFields,
} from "../utils/currencies";
import { MockyCurrencies } from "../types/MockyCurrencies";
import { Loading } from "../components/common/Loading";
import { Box } from "../components/common/Box";

// Each currency list item should contain:
//
// Flag of the country
// Name of the country
// Currency of the country - all of them have it
// Exchange rate of that currency

export const CurrenciesPage = () => {
  const { status, data } = useQuery<MockyCurrencies>(
    "https://run.mocky.io/v3/c88db14a-3128-4fbd-af74-1371c5bb0343",
  );
  const searchParam = useHashRouter().hash.trim().toLowerCase();

  const currencyList = useMemo(() => {
    if (!data) return null;

    // TODO: ask PO if we should show/hide legacy currencies + to have some toggle for them

    const list = data.fx
      .filter((currency) => isValidCurrency(currency))
      .map((currency) => addCountryFieldsToCurrency(currency));

    list.sort((a, b) => a.countryName.localeCompare(b.countryName));

    return list;
  }, [data]);

  const filteredList = useMemo(() => {
    if (!currencyList) return null;
    if (!searchParam) return currencyList;

    return currencyList.filter((currency) =>
      checkSearchParamInCurrencyFields(currency, searchParam),
    );
  }, [currencyList, searchParam]);

  if (status === "failed") {
    return (
      <Box role="alert" className="text-red-500 font-bold">
        Unexpected error occurred
      </Box>
    );
  }

  if (status === "pending") return <Loading />;

  if (filteredList)
    return (
      <div>
        <CurrencyList currencies={filteredList} />
        <div className="my-4 text-sm text-gray-600 text-right">
          Last updated: {new Date(data!.lastUpdated).toLocaleString()}
        </div>
      </div>
    );

  return <Box>No Data :&apos;(</Box>;
};
