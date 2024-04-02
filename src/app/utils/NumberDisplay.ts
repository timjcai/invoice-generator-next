import { CurrencyType } from "../types";

export function displayABN(abn: string | undefined | null): string {
    // Convert the number to a string
    if (abn === null || abn === undefined) {
        return "hello"
    } else {
        
    }

    // Split the string into groups of three digits from the end
    let groups = [];
    let arrayABN = abn.toString().split('')
    while (arrayABN.length > 0) {
        groups.unshift(arrayABN.slice(-3).join(''));
        arrayABN = arrayABN.slice(0, -3);
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

    return `${formattedCurrency}`;
}

export function formatDate(currentDate: Date) {
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate
} 

export function displayBankNumber(BankNumber: number): string {
    if (BankNumber != undefined) {
        const BankNumberArray = BankNumber.toString().split('')
        const midpoint = Math.ceil(BankNumberArray.length/2)
    
        const firstHalf = BankNumberArray.slice(0,midpoint).join('')
        const secondHalf = BankNumberArray.slice(midpoint).join('');
        return `${firstHalf} ${secondHalf}`
    } else {
        return ''
    }
}

export function displayPercentage(decimal: number): string {
    return (`${decimal*100} %`)

}