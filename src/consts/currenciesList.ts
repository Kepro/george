export const CRYPTO_CURRENCIES = [
  "ATX", // Aston (ATX) is a cryptocurrency and operates on the Ethereum platform.
  "MUE", // MonetaryUnit (MUE) is a cryptocurrency
];

export const EUR_CURRENCIES = [
  "ATS", // The schilling was the currency of Austria from 1925 to 1938 and from 1945 to 1999
  "BEF", // The Belgian franc was the currency of the Kingdom of Belgium from 1832 until 2002 when the Euro was introduced
  "ESP", // The peseta was the currency of Spain between 1868 and 2002
  "EEK", // The Estonian Kroon (EEK) was the official currency of Estonia, a country located in Northern Europe, from 1992 until 2011
  "FRF", // French Franc
  "CYP", // Since 1st January 2008, the euro has been the official currency of the Republic of Cyprus
  "GRD", // The Greek Drachma, (GRD) is obsolete. It was replaced with the Euro (EUR) on January 1, 2001
  "DEM", // The Deutsche mark was Germany's legal currency from 1948 to 2002. In 2002, Germany replaced the Deutsche mark with the euro.
  "LVL", // Latvian lats - already EUR
  "HRK", // Croatian Kuna from 1.1.2023
  "ITL", // The lira was the currency of Italy between 1861 and 2002
  "LTL", // Lithuanian Litas
  "LUF", // Luxembourg franc
  "SKK", // Slovakia
  "FIM", // Finland joined the European Union in 1995 and was one of the firstcountries to adopt the euro on 1 January 1999.
  "NLG", // Dutch guilder - already EUR
  "IEP", // The pound (Irish: punt) was the currency of the Republic of Ireland until 2002.
  "PTE", // Portugal - Currency PTE doesn't have legal tender anymore, it was replaced by currency EUR since 1999-01-01.
  "MTL", // What Was the Maltese Lira (MTL)? The Maltese Lira (MTL) was the national currency of the Republic of Malta, prior to being replaced by the Euro (EUR) in 2007.
];

export const DEAD_CURRENCIES = [
  "XEU", // XEU is dead
  "CUC", // The CUC (Cuban Convertible Peso) has gone and the country now has a single-currency economy.
  "SDD", // The Sudanese dinar (SDD) was the official currency of Sudan between 1992 and 2007
  "SVC", // El Salvador colón, which was the official currency for El Salvador from 1892 to 2001; its symbol is a C with two slashes running through it.
  "SIT", // The ISO 4217 currency code for the Slovenian tolar was SIT.
  "TPE", // Portuguese Timorese escudo; a currency used from 1959 to 1976.
  "VEB", // The VEB is the currency abbreviation for the Venezuelan bolivar, which was the currency for Venezuela from 1879 to January 2008.
  "ZMK", // Zambian kwacha; a currency used from 1968 to 2012.
];

export const REPLACED_CURRENCIES = [
  "MZM", // Currency MZM doesn't have legal tender anymore, it was replaced by currency MZN since
  "MGF", // now MGA The franc (ISO 4217 code MGF) was the currency of Madagascar until 1 January 2005.
  "MRO", // MRU (numeric: 929) before 2014: MRO[1]
  "GHC", // now GHS currency of Ghana.
  "TRL", // As of 1 January 2005 the currency of the Republic of Turkey is the new Turkish lira (TRY)
  "CSD", // now RSD - Serbian dinar
  "ZWD", // The ZWD is no longer minted or recognized as the official currency of Zimbabwe. The country issued new Zimbabwean dollars with the 2009 currency version (ZWL)
  "ROL", // The Old Romanian Leu (ROL) is obsolete. It was replaced with the New Romanian Leu (RON)
  "TMM", // Turkmenistan New Manat (TMT) is equivalent to the old Turkmenistan Manat (TMM)
] as const;

export const REPLACED_MAP_CURRENCIES: Record<
  (typeof REPLACED_CURRENCIES)[number],
  string
> = {
  MZM: "MZN",
  MGF: "MGA",
  MRO: "MRU",
  GHC: "GHS",
  TRL: "TRY",
  CSD: "RSD",
  ZWD: "ZWL",
  ROL: "RON",
  TMM: "TMT",
};

export const FILTERED_CURRENCIES = [
  "XXX", // The code XXX is used to denote a "transaction" involving no currency.
  "EUR", // 1:1
  ...EUR_CURRENCIES,
  ...CRYPTO_CURRENCIES,
  ...DEAD_CURRENCIES,
  // ...REPLACED_CURRENCIES,
];
