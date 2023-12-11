export type Country = {
    name: string;
    countryCode: CountryCode;
    currency: string;
}

export type BCP47Code = `${LanguageCode}-${CountryCode}`

export type LanguageCode = 
    | "ar"
    | "cs"
    | "da"
    | "de"
    | "el"
    | "en"
    | "es"
    | "fi"
    | "fr"
    | "he"
    | "hi"
    | "hu"
    | "id"
    | "it"
    | "ja"
    | "ko"
    | "nl"
    | "no"
    | "pl"
    | "pt"
    | "ro"
    | "ru"
    | "sk"
    | "sv"
    | "th"
    | "tr"
    | "zh"

export type BCP47Languages = 
    | "Arabic"
    | "Czech"
    | "Danish"
    | "German" 
    | "Modern Greek"
    | "English"
    | "Spanish"
    | "Finnish"
    | "French"
    | "Hebrew"
    | "Hindi"
    | "Hungarian"
    | "Indonesian"
    | "Italian"
    | "Japanese"
    | "Korean"
    | "Dutch"
    | "Norwegian"
    | "Polish"
    | "Portuguese"
    | "Romanian"
    | "Russian"
    | "Slovak"
    | "Swedish"
    | "Thai"
    | "Turkish"
    | "Chinese"


export type CountryCode =
    | 'SA'
    | 'CZ'
    | 'DK'
    | 'DE'
    | 'GR'
    | 'AU'
    | 'GB'
    | 'IE'
    | 'US'
    | 'ZA'
    | 'ES'
    | 'MX'
    | 'FI'
    | 'CA'
    | 'FR'
    | 'IL'
    | 'IN'
    | 'HU'
    | 'ID'
    | 'IT'
    | 'JP'
    | 'KR'
    | 'BE'
    | 'NL'
    | 'NO'
    | 'PL'
    | 'BR'
    | 'PT'
    | 'RO'
    | 'RU';

export type BCP47Countries = 
    | 'Saudi Arabia'
    | 'Czech Republic'
    | 'Denmark'
    | 'Germany'
    | 'Greece'
    | 'Australia'
    | 'United Kingdom'
    | 'Ireland'
    | 'United States'
    | 'South Africa'
    | 'Spain'
    | 'Mexico'
    | 'Finland'
    | 'Canada'
    | 'France'
    | 'Israel'
    | 'India'
    | 'Hungary'
    | 'Indonesia'
    | 'Italy'
    | 'Japan'
    | 'Republic of Korea'
    | 'Belgium'
    | 'Netherlands'
    | 'Norway'
    | 'Poland'
    | 'Brazil'
    | 'Portugal'
    | 'Romania'
    | 'Russian Federation'
    | 'Slovakia'
    | 'Sweden'
    | 'Thailand'
    | 'Turkey'
    | 'China'
    | 'Hong Kong'
    | 'Taiwan'

export type CurrencyType = 
    | 'SAR' // Saudi Riyal (Saudi Arabia)
    | 'CZK' // Czech Koruna (Czech Republic)
    | 'DKK' // Danish Krone (Denmark)
    | 'EUR' // Euro (Germany, Greece, Spain, Finland, France, Ireland, Italy, Netherlands, Portugal, Romania, Slovakia)
    | 'AUD' // Australian Dollar (Australia)
    | 'GBP' // British Pound (United Kingdom)
    | 'USD' // United States Dollar (United States)
    | 'ZAR' // South African Rand (South Africa)
    | 'MXN' // Mexican Peso (Mexico)
    | 'INR' // Indian Rupee (India)
    | 'HUF' // Hungarian Forint (Hungary)
    | 'IDR' // Indonesian Rupiah (Indonesia)
    | 'JPY' // Japanese Yen (Japan)
    | 'KRW' // South Korean Won (Republic of Korea)
    | 'BRL' // Brazilian Real (Brazil)
    | 'CAD' // Canadian Dollar (Canada)
    | 'ILS' // Israeli New Shekel (Israel)
    | 'NOK' // Norwegian Krone (Norway)
    | 'PLN' // Polish Złoty (Poland)
    | 'RUB' // Russian Ruble (Russian Federation)
    | 'SEK' // Swedish Krona (Sweden)
    | 'THB' // Thai Baht (Thailand)
    | 'TRY' // Turkish Lira (Turkey)
    | 'CNY' // Chinese Yuan (China)
    | 'HKD' // Hong Kong Dollar (Hong Kong)
    | 'TWD'; // New Taiwan Dollar (Taiwan)