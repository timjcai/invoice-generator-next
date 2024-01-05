import { InvoiceContextValue, useInvoiceDetailContext } from "@/app/context";
import { InvoiceDetailType } from "@/app/types";
import { formatDate } from "@/app/utils";
import React, { FC } from "react";

export const InvoiceDetailsForm: FC = () => {
    const { invoiceDetails, setInvoiceDetails } =
        useInvoiceDetailContext() as InvoiceContextValue;

    function saveInvoicedetails(
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) {
        e.preventDefault();
        console.log(invoiceDetails);
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
                    value={invoiceDetails?.invoiceNumber}
                    onChange={(e) =>
                        setInvoiceDetails(
                            (prevState: Partial<InvoiceDetailType>) => ({
                                ...prevState,
                                invoiceNumber: Number(e.target.value),
                            })
                        )
                    }
                ></input>
                <label htmlFor="workDate" className="text-md font-medium mb-2">
                    Work Date
                </label>
                <input
                    id="workDate"
                    type="date"
                    placeholder="Enter your Work date"
                    className="border-2 border-[#EDEEEF] p-3 mb-4 rounded-md"
                    value={formatDate(new Date(invoiceDetails.workDate!))}
                    onChange={(e) =>
                        setInvoiceDetails(
                            (prevState: Partial<InvoiceDetailType>) => ({
                                ...prevState,
                                workDate: new Date(e.target.value),
                            })
                        )
                    }
                ></input>
                <label htmlFor="dueDate" className="text-md font-medium mb-2">
                    Due Date
                </label>
                <input
                    id="dueDate"
                    type="date"
                    placeholder="Enter your Due Date"
                    className="border-2 border-[#EDEEEF] p-3 mb-4 rounded-md"
                    min={formatDate(new Date(invoiceDetails.workDate!))}
                    value={formatDate(new Date(invoiceDetails.dueDate!))}
                    onChange={(e) =>
                        setInvoiceDetails(
                            (prevState: Partial<InvoiceDetailType>) => ({
                                ...prevState,
                                dueDate: new Date(e.target.value),
                            })
                        )
                    }
                ></input>
                <label htmlFor="PONumber" className="text-md font-medium mb-2">
                    PO Number
                </label>
                <input
                    id="PONumber"
                    type="text"
                    placeholder="Enter your Purchase Order Number"
                    className="border-2 border-[#EDEEEF] p-3 mb-4 rounded-md"
                    value={invoiceDetails.PONumber}
                    onChange={(e) =>
                        setInvoiceDetails(
                            (prevState: Partial<InvoiceDetailType>) => ({
                                ...prevState,
                                PONumber: e.target.value,
                            })
                        )
                    }
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
