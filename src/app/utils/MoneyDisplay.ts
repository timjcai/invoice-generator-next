import { BCP47Code, BCP47Countries, Country, CountryCode, CurrencyType } from "../types";

function formatAsCurrency(number: number, countrycode: BCP47Code, country: Country) {
    
}

export const currencyMap: {[key in BCP47Countries]: CurrencyType  } = {
    'Saudi Arabia': 'SAR',
    'Czech Republic': 'CZK',
    'Denmark': 'DKK',
    'Germany': 'EUR', 
    'Greece': 'EUR', 
    'Australia': 'AUD',
    'United Kingdom': 'GBP',
    'Ireland': 'EUR', 
    'United States': 'USD' ,
    'South Africa': 'ZAR',
    'Spain': 'EUR',
    'Mexico': 'MXN',
    'Finland': 'EUR', 
    'Canada': 'CAD',
    'France': 'EUR', 
    'Israel': 'ILS',
    'India': 'INR',
    'Hungary': 'HUF',
    'Indonesia': 'IDR',
    'Italy': 'EUR', 
    'Japan': 'JPY',
    'Republic of Korea': 'KRW',
    'Belgium': 'EUR', 
    'Netherlands': 'EUR',
    'Norway': 'NOK',
    'Poland': 'PLN',
    'Brazil': 'BRL',
    'Portugal': 'EUR', 
    'Romania': 'EUR', 
    'Russian Federation': 'RUB',
    'Slovakia': 'EUR', 
    'Sweden': 'SEK',
    'Thailand': 'THB',
    'Turkey': 'TRY',
    'China': 'CNY',
    'Hong Kong': 'HKD',
    'Taiwan': "TWD"
} 