import React, { FC } from "react";

export const NotesForm: FC = () => {
    function saveNoteDetails(
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) {
        e.preventDefault();
    }
    return (
        <div className="w-full">
            <form className="flex flex-col">
                <label htmlFor="bankName" className="text-md font-medium mb-2">
                    Bank Name
                </label>
                <input
                    id="bankName"
                    className="border-2 border-[#EDEEEF] p-3 mb-4 rounded-md"
                    placeholder="Enter your Bank Name"
                />
                <label htmlFor="BSB" className="text-md font-medium mb-2">
                    BSB
                </label>
                <input
                    id="BSB"
                    className="border-2 border-[#EDEEEF] p-3 mb-4 rounded-md"
                    placeholder="Enter your BSB"
                />
                <label htmlFor="ACCNumber" className="text-md font-medium mb-2">
                    Account Number
                </label>
                <input
                    id="ACCNumber"
                    className="border-2 border-[#EDEEEF] p-3 mb-4 rounded-md"
                    placeholder="Enter your Account Number"
                />
                <label htmlFor="notes" className="text-md font-medium mb-2">
                    Notes
                </label>
                <textarea
                    id="notes"
                    className="border-2 border-[#EDEEEF] p-3 mb-4 rounded-md"
                    placeholder="Enter your notes for Invoicee"
                />
                <label
                    htmlFor="paymentNotes"
                    className="text-md font-medium mb-2"
                >
                    Payment Notes
                </label>
                <textarea
                    id="paymentNotes"
                    className="border-2 border-[#EDEEEF] p-3 mb-4 rounded-md"
                    placeholder="Enter any additional payment instructions for Invoicee"
                />
                <button
                    type="submit"
                    className="w-full border-2 bg-[#212122] border-[#212122] py-2 text-white font-light rounded-md mt-4 mb-4 disabled:opacity-40"
                    onClick={(e) => saveNoteDetails(e)}
                    // disabled={!userEmail || !userPassword}
                >
                    Save
                </button>
            </form>
        </div>
    );
};
