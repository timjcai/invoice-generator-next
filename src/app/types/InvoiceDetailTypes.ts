import { PaymentDetailType } from ".";

export type InvoiceDetailType = {
    invoiceNumber: number;
    workDate: Date;
    dueDate: Date;
    PONumber: string;
}

export type LineItemsType = {

}

export type PaymentNotesType = {
    paymentDetails: PaymentDetailType;
    notes: string;
    paymentNotes: string;
}