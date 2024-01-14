import { BankTransferType, BuyerType, PaymentDetailType, SellerType } from ".";

export type InvoiceDetailType = {
    invoiceNumber: number;
    workDate: Date;
    dueDate: Date;
    PONumber: string;
}

export type LineItemsType = {
    description: string;
    quantity: number;
    rate: number;
    total?: number;
}

export type PaymentNotesType = {
    paymentDetails: Partial<BankTransferType>;
    notes: string;
    paymentNotes: string;
}

export type TotalType = {
    subtotal: number;
    taxrate: number;
    total: number;
    amountPaid?: number;
    balanceDue?: number;
}

export type GeneratorType = {
    profileDetails?: Partial<SellerType>,
    billerDetails?: Partial<BuyerType>,
    invoiceDetails?: Partial<InvoiceDetailType>,
    paymentAndNotes?: Partial<PaymentNotesType>,
    lineItems?: LineItemsType[],
    totals?: TotalType,
}