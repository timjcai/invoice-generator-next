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

const applyChangesToLineItems = (
    changes: CellChange<TextCell>[],
    prevPeople: LineItemType[]
): LineItemType[] => {
    changes.forEach((change) => {
        const itemIndex = change.rowId;
        const fieldName = change.columnId;
        prevPeople[itemIndex][fieldName] = change.newCell.text;
    });
    return [...prevPeople];
};

export const InvoiceGrid = () => {
    const [lineItems, setLineItems] = React.useState<LineItemType[]>(
        getInvoice()
    );

    const rows = getInvoiceRows(lineItems);
    const columns = getInvoiceColumns();

    const handleChanges = (changes: CellChange<TextCell>[]) => {
        setLineItems((prevLineItems) =>
            applyChangesToLineItems(changes, prevLineItems)
        );
    };

    return (
        <ReactGrid
            rows={rows}
            columns={columns}
            onCellsChanged={handleChanges}
        />
    );
};
