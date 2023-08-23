import { FC } from "react";
import CurrencyListItem from "./CurrencyListItem";
import { CurrencyItem } from "../types/ExchangeCurrency";

type Props = {
  currencies: CurrencyItem[];
};

const CurrencyList: FC<Props> = ({ currencies }) => {
  return (
    <ul
      className="divide-y divide-slate-200 bg-white rounded"
      aria-label="Currency list"
      data-testid="list"
    >
      {currencies.map((currency) => (
        <CurrencyListItem key={currency.currency} currency={currency} />
      ))}
    </ul>
  );
};

export default CurrencyList;
