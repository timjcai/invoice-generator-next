export type PaymentDetailType = BankTransferType | BPayType

export type BankTransferType = {
    BSB: number;
    ACC: number;
    BankAccount: string;
}

export type BPayType = "hello"