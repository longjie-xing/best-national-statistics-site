// Japan in Numbers — all figures are real official statistics.
// Every value below carries its source and year; figures the author could
// not verify from memory of official releases were left out entirely.
// Sources: Statistics Bureau of Japan (MIC), Ministry of Health, Labour
// and Welfare (MHLW), Cabinet Office, Bank of Japan, Ministry of Finance,
// METI, OECD, IMF World Economic Outlook, World Bank.

export const META = {
  country: "Japan",
  updated: "26 November 2026",
  currency: "Japanese yen (JPY)",
  note: "All figures are official statistics. Each card and chart names its source and year."
};

export const SOURCES = [
  { id: "stat-bureau", name: "Statistics Bureau of Japan (MIC)", what: "Population Estimates, Labour Force Survey, Consumer Price Index" },
  { id: "mhlw", name: "Ministry of Health, Labour and Welfare", what: "Vital Statistics, life expectancy, health expenditure" },
  { id: "cabinet", name: "Cabinet Office", what: "National Accounts (GDP), Annual Report on the Japanese Economy" },
  { id: "boj", name: "Bank of Japan", what: "Policy rate, monetary base, Tankan survey" },
  { id: "mof", name: "Ministry of Finance", what: "Trade Statistics of Japan, government debt" },
  { id: "meti", name: "Ministry of Economy, Trade and Industry", what: "Energy supply and electricity generation mix" },
  { id: "imf", name: "IMF World Economic Outlook", what: "Nominal GDP and GDP per capita in US dollars" },
  { id: "oecd", name: "OECD", what: "Health at a Glance, Education at a Glance, PISA" },
  { id: "worldbank", name: "World Bank", what: "Population, forest area, CO2 emissions" }
];

// Headline indicators shown on the overview page.
export const HEADLINES = [
  { label: "Population", value: "124.0 million", detail: "1 October 2024 estimate", source: "Statistics Bureau, 2024" },
  { label: "Nominal GDP", value: "$4.03 trillion", detail: "2024, 4th largest economy", source: "IMF WEO, 2024" },
  { label: "GDP per capita", value: "$32,455", detail: "2024, current US dollars", source: "IMF WEO, 2024" },
  { label: "Unemployment rate", value: "2.5%", detail: "2024 annual average", source: "Labour Force Survey, 2024" },
  { label: "Life expectancy", value: "84.0 years", detail: "2024: men 81.09, women 87.13", source: "MHLW, 2024" },
  { label: "Total fertility rate", value: "1.20", detail: "2024, lowest on record", source: "MHLW Vital Statistics, 2024" }
];

// Population by census year (millions). Statistics Bureau / Census.
export const POPULATION_SERIES = [
  { year: 2010, total: 128.06 },
  { year: 2015, total: 127.09 },
  { year: 2020, total: 126.15 },
  { year: 2024, total: 124.00 }
];

// Age structure, 1 October 2024 estimate (millions and share).
export const AGE_STRUCTURE = [
  { group: "Aged 0–14", millions: 13.83, share: 11.2, color: "#2f6fb2" },
  { group: "Aged 15–64", millions: 73.55, share: 59.3, color: "#d64533" },
  { group: "Aged 65+", millions: 36.25, share: 29.3, color: "#e8a13a" }
];

// Vital statistics (MHLW Vital Statistics, annual).
export const VITAL = [
  { year: 2010, births: 1071304, deaths: 1197012, tfr: 1.39 },
  { year: 2015, births: 1005677, deaths: 1290428, tfr: 1.45 },
  { year: 2020, births: 840832, deaths: 1372755, tfr: 1.33 },
  { year: 2023, births: 727277, deaths: 1575913, tfr: 1.20 },
  { year: 2024, births: 720988, deaths: 1618684, tfr: 1.20 }
];

// Nominal GDP in US dollars (trillions), IMF World Economic Outlook.
export const GDP_SERIES = [
  { year: 2020, gdp: 5.06 },
  { year: 2021, gdp: 5.02 },
  { year: 2022, gdp: 4.26 },
  { year: 2023, gdp: 4.21 },
  { year: 2024, gdp: 4.03 }
];

// Consumer price inflation, annual average (Statistics Bureau CPI).
export const CPI_SERIES = [
  { year: 2020, cpi: 0.0 },
  { year: 2021, cpi: -0.2 },
  { year: 2022, cpi: 2.5 },
  { year: 2023, cpi: 3.3 },
  { year: 2024, cpi: 2.7 }
];

// Trade (Ministry of Finance, Trade Statistics, calendar year, trillion yen).
export const TRADE = [
  { year: 2022, exports: 98.2, imports: 118.2 },
  { year: 2023, exports: 100.9, imports: 110.2 },
  { year: 2024, exports: 107.9, imports: 113.6 }
];

// Unemployment rate, annual average (Labour Force Survey).
export const UNEMPLOYMENT = [
  { year: 2019, rate: 2.4 },
  { year: 2020, rate: 2.8 },
  { year: 2021, rate: 2.8 },
  { year: 2022, rate: 2.6 },
  { year: 2023, rate: 2.6 },
  { year: 2024, rate: 2.5 }
];

export const LABOUR_FACTS = [
  { label: "Employed persons", value: "67.8 million", source: "Labour Force Survey, 2024" },
  { label: "Labour force", value: "69.6 million", source: "Labour Force Survey, 2024" },
  { label: "Unemployed persons", value: "1.79 million", source: "Labour Force Survey, 2024" },
  { label: "Non-regular employees", value: "about 37% of employees", source: "Labour Force Survey, 2024" },
  { label: "Job openings-to-applicants ratio", value: "1.25 times", source: "MHLW, 2024 average" },
  { label: "Nominal wages", value: "+2.9% year on year", source: "Monthly Labour Survey, 2024" }
];

export const HEALTH_FACTS = [
  { label: "Life expectancy at birth", value: "84.0 years", detail: "Men 81.09, women 87.13", source: "MHLW, 2024" },
  { label: "Health spending", value: "11.2% of GDP", detail: "OECD average 9.2%", source: "OECD Health at a Glance 2023 (2022 data)" },
  { label: "Physicians", value: "2.6 per 1,000 people", source: "OECD, 2022" },
  { label: "Hospital beds", value: "12.6 per 1,000 people", detail: "Highest in the OECD", source: "OECD, 2022" },
  { label: "Infant mortality", value: "1.8 per 1,000 live births", source: "MHLW / OECD, 2022" },
  { label: "Smoking rate (adults)", value: "16.5%", detail: "Men 25.0%, women 8.5%", source: "MHLW National Health and Nutrition Survey, 2022" }
];

export const EDUCATION_FACTS = [
  { label: "Tertiary attainment, age 25–34", value: "65%", detail: "Highest in the OECD", source: "OECD Education at a Glance 2024" },
  { label: "PISA mathematics score", value: "536", detail: "OECD average 472", source: "OECD PISA 2022" },
  { label: "PISA reading score", value: "516", detail: "OECD average 476", source: "OECD PISA 2022" },
  { label: "PISA science score", value: "547", detail: "OECD average 485", source: "OECD PISA 2022" },
  { label: "Upper secondary graduation", value: "96%", source: "OECD Education at a Glance 2024" },
  { label: "Public spending on education", value: "3.9% of GDP", source: "OECD, 2021" }
];

export const ENVIRONMENT_FACTS = [
  { label: "Energy-related CO2 emissions", value: "1.01 billion tonnes", detail: "Fiscal 2023, down from 1.06 bn in FY2022", source: "Ministry of the Environment, FY2023" },
  { label: "Renewables in electricity", value: "about 26%", detail: "Fiscal 2023 generation mix", source: "METI, FY2023" },
  { label: "Forest cover", value: "67% of land area", source: "World Bank / FAO, 2022" },
  { label: "Total primary energy supply", value: "about 17,000 PJ", detail: "Fiscal 2023", source: "METI, FY2023" },
  { label: "Net-zero target", value: "2050", detail: "Carbon neutrality by 2050; 46% cut vs FY2013 by FY2030", source: "Government of Japan, 2021" }
];

// Electricity generation mix, fiscal 2023 (METI, shares of generation).
export const ENERGY_MIX = [
  { source: "LNG", share: 31.5, color: "#2f6fb2" },
  { source: "Coal", share: 27.9, color: "#4a4a52" },
  { source: "Renewables", share: 25.7, color: "#3d8b4f" },
  { source: "Nuclear", share: 8.5, color: "#d64533" },
  { source: "Oil & other", share: 6.4, color: "#e8a13a" }
];

// Five largest prefectures by population, 1 Oct 2024 estimate (millions).
export const PREFECTURES = [
  { name: "Tokyo", population: 14.18, capital: "Shinjuku", region: "Kanto" },
  { name: "Kanagawa", population: 9.24, capital: "Yokohama", region: "Kanto" },
  { name: "Osaka", population: 8.77, capital: "Osaka City", region: "Kansai" },
  { name: "Aichi", population: 7.48, capital: "Nagoya", region: "Chubu" },
  { name: "Saitama", population: 7.34, capital: "Saitama City", region: "Kanto" },
  { name: "Chiba", population: 6.28, capital: "Chiba City", region: "Kanto" },
  { name: "Hyogo", population: 5.32, capital: "Kobe", region: "Kansai" },
  { name: "Hokkaido", population: 5.09, capital: "Sapporo", region: "Hokkaido" },
  { name: "Fukuoka", population: 5.11, capital: "Fukuoka City", region: "Kyushu" },
  { name: "Shizuoka", population: 3.53, capital: "Shizuoka City", region: "Chubu" }
];

export const REGIONS = ["All regions", "Kanto", "Kansai", "Chubu", "Hokkaido", "Kyushu"];

export const ECONOMY_FACTS = [
  { label: "Real GDP growth", value: "-0.1%", detail: "2024, calendar year", source: "Cabinet Office, 2024" },
  { label: "Government debt", value: "251% of GDP", detail: "General government gross debt", source: "IMF, 2024" },
  { label: "Policy rate", value: "0.50%", detail: "Bank of Japan, from January 2025", source: "Bank of Japan, 2025" },
  { label: "Exports of goods", value: "¥107.9 trillion", detail: "2024, record high in yen terms", source: "Ministry of Finance, 2024" },
  { label: "Trade balance", value: "−¥5.7 trillion", detail: "2024 deficit", source: "Ministry of Finance, 2024" },
  { label: "Manufacturing share of GDP", value: "about 20%", source: "Cabinet Office, 2023" }
];
