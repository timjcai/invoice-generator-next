import { CurrencyType } from "../types";

export function displayABN(abn: number): string {
    // Convert the number to a string
    let numberString = abn.toString();

    // Split the string into groups of three digits from the end
    let groups = [];
    while (numberString.length > 0) {
        groups.unshift(numberString.slice(-3));
        numberString = numberString.slice(0, -3);
    }

    // Join the groups with spaces
    let formattedNumber = groups.join(' ');

    return formattedNumber;
}

export function displayCurrency(money: number, currencyCode: CurrencyType): string {
    const formattedCurrency = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currencyCode,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(money);

    return `${formattedCurrency} ${currencyCode}`;
}