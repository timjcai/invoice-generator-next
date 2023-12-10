"use client";
import { Column, Row } from "@silevis/reactgrid";

export interface Person {
    name: string;
    surname: string;
}

export const getPeople = (): Person[] => [
    { name: "Thomas", surname: "Goldman" },
    { name: "Susie", surname: "Quattro" },
    { name: "", surname: "" },
];

export const getColumns = (): Column[] => [
    { columnId: "name", width: 150 },
    { columnId: "surname", width: 150 },
];

export const headerRow: Row = {
    rowId: "header",
    cells: [
        { type: "header", text: "Name" },
        { type: "header", text: "Surname" },
    ],
};

export const getRows = (people: Person[]): Row[] => [
    headerRow,
    ...people.map<Row>((person, idx) => ({
        rowId: idx,
        cells: [
            { type: "text", text: person.name },
            { type: "text", text: person.surname },
        ],
    })),
];
