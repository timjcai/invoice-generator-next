import * as React from "react";
import { render } from "react-dom";
import {
    ReactGrid,
    Column,
    Row,
    CellChange,
    TextCell,
} from "@silevis/reactgrid";
import "@silevis/reactgrid/styles.css";
import {
    LineItemType,
    Person,
    getColumns,
    getInvoice,
    getInvoiceColumns,
    getInvoiceRows,
    getPeople,
    getRows,
} from ".";
import { Icon } from "../UI";
import { LineItemsType } from "@/app/types";

const applyChangesToLineItems = (
    changes: CellChange<TextCell>[],
    prevPeople: Partial<LineItemsType>[]
): Partial<LineItemsType>[] => {
    changes.forEach((change) => {
        const itemIndex = change.rowId;
        const fieldName = change.columnId;
        prevPeople[itemIndex][fieldName] = change.newCell.text;
    });
    return [...prevPeople];
};

export const InvoiceGrid = () => {
    const [lineItems, setLineItems] = React.useState<Partial<LineItemsType>[]>(
        getInvoice()
    );

    const addRow = () => {
        setLineItems((prevLineItems) => [
            ...prevLineItems,
            { description: "", quantity: 0, rate: 0 },
        ]);
    };

    const rows = getInvoiceRows(lineItems);
    const columns = getInvoiceColumns();

    const handleChanges = (changes: CellChange<TextCell>[]) => {
        setLineItems((prevLineItems) =>
            applyChangesToLineItems(changes, prevLineItems)
        );
    };

    return (
        <>
            <ReactGrid
                rows={rows}
                columns={columns}
                onCellsChanged={handleChanges}
            />
            <button
                className="flex flex-row border-black border-[0.5px] py-1 pe-2 rounded-[4px] mt-2 text-sm"
                onClick={() => addRow()}
            >
                <Icon label={"add"} />
                Line item
            </button>
        </>
    );
};
