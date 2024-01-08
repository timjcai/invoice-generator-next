"use client";
import { Column, Row } from "@silevis/reactgrid";
import { Person } from ".";

export interface LineItemType {
    description: string;
    quantity: number | string;
    rate: number | string;
}

export const getInvoice = (): LineItemType[] => [
    { description: "example", quantity: 1, rate: 100 },
    { description: "", quantity: 0, rate: 0 },
];

export const getInvoiceColumns = (): Column[] => [
    { columnId: "description", width: 400 },
    { columnId: "quantity", width: 100 },
    { columnId: "rate", width: 100 },
    { columnId: "amount", width: 100 },
];

export const invoiceHeaderRow: Row = {
    rowId: "header",
    cells: [
        { type: "header", text: "Description" },
        { type: "header", text: "Quantity" },
        { type: "header", text: "Rate" },
        { type: "header", text: "Amount" },
    ],
};

export const getInvoiceRows = (invoice: LineItemType[]): Row[] => [
    invoiceHeaderRow,
    ...invoice.map<Row>((invoice, idx) => ({
        rowId: idx,
        cells: [
            { type: "text", text: invoice.description },
            { type: "number", value: invoice.quantity },
            { type: "number", value: invoice.rate },
            { type: "number", value: invoice.quantity * invoice.rate },
        ],
    })),
];
