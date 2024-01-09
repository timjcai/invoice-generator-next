import {
    PaymentNotesContextValue,
    ProfileContextValue,
    usePaymentNotesContext,
    useProfileContext,
} from "@/app/context";
import { BankTransferType } from "@/app/types";
import { displayBankNumber } from "@/app/utils";
import React, { FC } from "react";

export const NotesForm: FC = () => {
    const { notes, setNotes, paymentNotes, setPaymentNotes, getPaymentNotes } =
        usePaymentNotesContext() as PaymentNotesContextValue;
    const { paymentDetails, setPaymentDetails } =
        useProfileContext() as ProfileContextValue;

    function saveNoteDetails(
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) {
        e.preventDefault();
        console.log({
            paymentDetails: paymentDetails,
            notes: notes,
            paymentNotes: paymentNotes,
        });
    }

    function getPaymentDetails(
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) {
        e.preventDefault();
        getPaymentNotes(uid);
    }

    return (
        <div className="w-full">
            <form className="flex flex-col">
                <button
                // onClick={(e) => {
                //     getPaymentDetails(e);
                // }}
                >
                    get payment details
                </button>
                <label
                    htmlFor="bankAccount"
                    className="text-md font-medium mb-2"
                >
                    Bank Account Name
                </label>
                <input
                    id="bankAccount"
                    type="text"
                    className="border-2 border-[#EDEEEF] p-3 mb-4 rounded-md"
                    placeholder="Enter your Bank Account Name"
                    value={paymentDetails?.bankAccount}
                    onChange={(e) =>
                        setPaymentDetails(
                            (prevState: Partial<BankTransferType>) => ({
                                ...prevState,
                                bankAccount: e.target.value,
                            })
                        )
                    }
                />
                <label htmlFor="BSB" className="text-md font-medium mb-2">
                    BSB
                </label>
                <input
                    id="BSB"
                    type="number"
                    className="border-2 border-[#EDEEEF] p-3 mb-4 rounded-md"
                    placeholder="Enter your BSB"
                    value={paymentDetails.BSB!}
                    onChange={(e) =>
                        setPaymentDetails(
                            (prevState: Partial<BankTransferType>) => ({
                                ...prevState,
                                BSB: Number(e.target.value),
                            })
                        )
                    }
                />
                <label htmlFor="ACCNumber" className="text-md font-medium mb-2">
                    Account Number
                </label>
                <input
                    id="ACCNumber"
                    type="number"
                    className="border-2 border-[#EDEEEF] p-3 mb-4 rounded-md"
                    placeholder="Enter your Account Number"
                    value={paymentDetails?.ACC}
                    onChange={(e) =>
                        setPaymentDetails(
                            (prevState: Partial<BankTransferType>) => ({
                                ...prevState,
                                ACC: Number(e.target.value),
                            })
                        )
                    }
                />
                <label htmlFor="notes" className="text-md font-medium mb-2">
                    Notes
                </label>
                <textarea
                    id="notes"
                    className="border-2 border-[#EDEEEF] p-3 mb-4 rounded-md"
                    placeholder="Enter your notes for Invoicee"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
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
                    value={paymentNotes}
                    onChange={(e) => setPaymentNotes(e.target.value)}
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
