import React, { FC } from "react";

export const InvoiceDetailsForm: FC = () => {
    function saveInvoicedetails(
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) {
        e.preventDefault();
    }

    return (
        <div className="w-full">
            <form className="flex flex-col">
                <label
                    htmlFor="invoiceNumber"
                    className="text-md font-medium mb-2"
                >
                    Invoice Number
                </label>
                <input
                    id="invoiceNumber"
                    type="number"
                    placeholder="Enter your Invoice Number"
                    className="border-2 border-[#EDEEEF] p-3 mb-4 rounded-md"
                ></input>
                <label htmlFor="workDate" className="text-md font-medium mb-2">
                    Work Date
                </label>
                <input
                    id="workDate"
                    type="date"
                    placeholder="Enter your Work date"
                    className="border-2 border-[#EDEEEF] p-3 mb-4 rounded-md"
                ></input>
                <label htmlFor="dueDate" className="text-md font-medium mb-2">
                    Due Date
                </label>
                <input
                    id="dueDate"
                    type="date"
                    placeholder="Enter your Due Date"
                    className="border-2 border-[#EDEEEF] p-3 mb-4 rounded-md"
                ></input>
                <label htmlFor="PONumber" className="text-md font-medium mb-2">
                    PO Number
                </label>
                <input
                    id="PONumber"
                    type="text"
                    placeholder="Enter your Purchase Order Number"
                    className="border-2 border-[#EDEEEF] p-3 mb-4 rounded-md"
                ></input>
                <button
                    type="submit"
                    className="w-full border-2 bg-[#212122] border-[#212122] py-2 text-white font-light rounded-md mt-4 mb-4 disabled:opacity-40"
                    onClick={(e) => saveInvoicedetails(e)}
                    // disabled={!userEmail || !userPassword}
                >
                    Save
                </button>
            </form>
        </div>
    );
};
