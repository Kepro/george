import { FC, useEffect, useRef } from "react";
import { CurrencyItem } from "../types/ExchangeCurrency";

const getFlagByCountryCode = (countryCode: string) =>
  import(`../assets/flags/${countryCode}.png`);

type Props = {
  currency: CurrencyItem;
};

const CurrencyListItem: FC<Props> = ({ currency }) => {
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    getFlagByCountryCode(currency.countryCode.toLowerCase())
      .then((flag) => {
        imgRef.current!.src = flag.default;
      })
      .catch(() => {
        // missing flag
      });
  }, [currency.countryCode]);

  return (
    <li
      className="flex items-center p-4 space-x-4"
      aria-label={currency.countryName}
      data-testid="list-item"
    >
      <img
        alt={currency.countryName}
        ref={imgRef}
        className="w-[50px] h-[34px] sm:w-[70px] sm:h-[47px] "
        // TODO: ask UX for flag placeholder
        src={`data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg"/>`}
      />
      <div className="grow font-semibold sm:font-bold text-sm sm:text-base">
        {currency.countryName}
        {currency.legacyCurrency && (
          <span className="text-sm font-normal ml-1 text-gray-500">
            (legacy)
          </span>
        )}
      </div>
      <div
        className="font-semibold sm:font-bold text-sm sm:text-base text-right"
        title={currency.nameI18N}
        data-testid="list-item-exchange-rate"
      >
        {currency.exchangeRate ? (
          <span>
            {currency.exchangeRate.buy} {currency.currency}
          </span>
        ) : (
          <span className="text-red-500">-</span>
        )}
      </div>
    </li>
  );
};

export default CurrencyListItem;
