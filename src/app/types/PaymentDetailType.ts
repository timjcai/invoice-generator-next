export type PaymentDetailType = BankTransferType | BPayType

export type BankTransferType = {
    BSB: number;
    ACC: number;
    bankAccount: string;
}

export type BPayType = "hello"