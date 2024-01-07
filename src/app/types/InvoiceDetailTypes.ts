import { BankTransferType, BuyerType, PaymentDetailType, SellerType } from ".";

export type InvoiceDetailType = {
    invoiceNumber: number;
    workDate: Date;
    dueDate: Date;
    PONumber: string;
}

export type LineItemsType = {

}

export type PaymentNotesType = {
    paymentDetails: Partial<BankTransferType>;
    notes: string;
    paymentNotes: string;
}

export type GeneratorType = {
    profileDetails?: Partial<SellerType>,
    billerDetails?: Partial<BuyerType>,
    invoiceDetails?: Partial<InvoiceDetailType>,
    paymentAndNotes?: Partial<PaymentNotesType>,
    // lineItems: LineItemsType,
}