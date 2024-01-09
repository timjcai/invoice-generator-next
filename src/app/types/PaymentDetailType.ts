export type PaymentDetailType = BankTransferType 

export type BankTransferType = {
    BSB: number;
    ACC: number;
    bankAccount: string;
}