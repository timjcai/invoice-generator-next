"use client";
import { Column, Row } from "@silevis/reactgrid";
import { Person } from ".";

interface InvoiceType = {
    
}

export const getPeople = (): Person[] => [
    { name: "Thomas", surname: "Goldman" },
    { name: "Susie", surname: "Quattro" },
    { name: "", surname: "" },
];

export const getInvoiceColumns = (): Column[] => [
    { columnId: "description", width: 600 },
    { columnId: "quantity", width: 150 },
    { columnId: "rate", width: 150 },
    { columnId: "amount", width: 150 },
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

export const getInvoiceRows = (invoice: Person[]): Row[] => [
    invoiceHeaderRow,
    ...people.map<Row>((invoice, idx) => ({
        rowId: idx,
        cells: [
            { type: "text", text: invoice.description },
            { type: "text", text: person.surname },
        ],
    })),
];
