// "use client";
// import * as React from "react";
// import { render } from "react-dom";
// import {
//     ReactGrid,
//     Column,
//     Row,
//     CellChange,
//     TextCell,
// } from "@silevis/reactgrid";
// import "@silevis/reactgrid/styles.css";
// import { Person, getColumns, getPeople, getRows } from ".";

// const applyChangesToPeople = (
//     changes: CellChange<TextCell>[],
//     prevPeople: Person[]
// ): Person[] => {
//     changes.forEach((change) => {
//         const personIndex = change.rowId;
//         const fieldName = change.columnId;
//         prevPeople[personIndex][fieldName] = change.newCell.text;
//     });
//     return [...prevPeople];
// };

// export default function CSVPage() {
//     const [people, setPeople] = React.useState<Person[]>(getPeople());

//     const rows = getRows(people);
//     const columns = getColumns();

//     const handleChanges = (changes: CellChange<TextCell>[]) => {
//         setPeople((prevPeople) => applyChangesToPeople(changes, prevPeople));
//     };

//     return (
//         <ReactGrid
//             rows={rows}
//             columns={columns}
//             onCellsChanged={handleChanges}
//         />
//     );
// }
