export function oneMonthLater(): Date {
    const today = new Date();
    const oneMonthLater = new Date()
    oneMonthLater.setMonth(today.getMonth() + 1)
    return oneMonthLater
}