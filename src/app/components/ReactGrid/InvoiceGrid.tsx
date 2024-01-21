// import * as React from "react";
// import { render } from "react-dom";
// import { ReactGrid, CellChange, TextCell } from "@silevis/reactgrid";
// import "@silevis/reactgrid/styles.css";
// import { getInvoiceColumns, getInvoiceRows } from ".";
// import { LineItemsType } from "@/app/types";
// import { LineItemsContextValue, useLineItemsContext } from "@/app/context";

// const applyChangesToLineItems = (
//     changes: CellChange<TextCell>[],
//     prevPeople: Partial<LineItemsType>[]
// ): Partial<LineItemsType>[] => {
//     changes.forEach((change) => {
//         const itemIndex = change.rowId;
//         const fieldName = change.columnId;
//         prevPeople[itemIndex][fieldName] = change.newCell.text;
//     });
//     return [...prevPeople];
// };

// export const InvoiceGrid = () => {
//     // const [lineItems, setAllItems] = React.useState<Partial<LineItemsType>[]>(
//     //     getInvoice()
//     // );

//     const { allItems, setAllItems } =
//         useLineItemsContext() as LineItemsContextValue;

//     // const addRow = () => {
//     //     setAllItems((prevLineItems) => [
//     //         ...prevLineItems,
//     //         { description: "", quantity: 0, rate: 0 },
//     //     ]);
//     // };

//     const rows = getInvoiceRows(allItems);
//     const columns = getInvoiceColumns();

//     const handleChanges = (changes: CellChange<TextCell>[]) => {
//         setAllItems((prevLineItems) =>
//             applyChangesToLineItems(changes, prevLineItems)
//         );
//     };

//     return (
//         <>
//             <ReactGrid
//                 rows={rows}
//                 columns={columns}
//                 onCellsChanged={handleChanges}
//             />
//         </>
//     );
// };
