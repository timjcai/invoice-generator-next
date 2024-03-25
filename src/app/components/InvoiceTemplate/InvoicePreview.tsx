"use client";

import React, { FC, useState } from "react";
import {
    BuyerType,
    DescriptionType,
    LocationType,
    SellerType,
} from "@/app/types";
import {
    displayABN,
    displayBankNumber,
    displayCurrency,
    displayPercentage,
} from "@/app/utils";
// import { InvoiceGrid } from "../ReactGrid";
import {
    InvoiceContextValue,
    LineItemsContextValue,
    MerchantContextValue,
    PaymentNotesContextValue,
    ProfileContextValue,
    useInvoiceDetailContext,
    useLineItemsContext,
    useMerchantContext,
    usePaymentNotesContext,
    useProfileContext,
} from "@/app/context";

export type InvoiceType = {
    itemDescriptions?: DescriptionType[];
    termsAndConditions?: string;
    notes?: string;
};

export const InvoicePreview: FC<InvoiceType> = ({}) => {
    const [totalBalance, setTotalBalance] = useState<number>(10.1);
    const [amountPaid, setAmountPaid] = useState<number>(0);
    const { merchantDetails, merchantLocation } =
        useMerchantContext() as MerchantContextValue;
    const {
        profileDetails,
        locationDetails: sellerLocation,
        paymentDetails,
    } = useProfileContext() as ProfileContextValue;
    const { invoiceDetails } = useInvoiceDetailContext() as InvoiceContextValue;
    const { notes, paymentNotes } =
        usePaymentNotesContext() as PaymentNotesContextValue;

    const { total, subtotal, taxrate, allItems } =
        useLineItemsContext() as LineItemsContextValue;

    return (
        <div className="h-[75vh] w-[800px] bg-[rgba(154, 152, 152, 0.53)] backdrop-filter backdrop-blur-lg rounded-xl border-2 border-[#ccc] p-12 shadow-black">
            <div className="flex flex-row justify-between mb-8 border-b-black border-b-2 pb-4">
                <div className="w-[50px] h-[50px]"></div>
                {/* {<ImageDropzone />} */}
                <div className="w-64">
                    <h1 className="text-4xl mb-1">
                        Invoice #{invoiceDetails.invoiceNumber}
                    </h1>
                    <div id="sellerDetails">
                        <p className="font-medium text-md">
                            {profileDetails?.businessName}
                        </p>
                        <p className="text-sm">
                            ABN:
                            {profileDetails !== undefined &&
                                ` ${displayABN(profileDetails.ABN)}`}
                        </p>
                        <LocationGrid {...sellerLocation} />
                    </div>
                </div>
            </div>
            <div className="flex flex-row justify-between gap-8 mb-8">
                <div id="buyerDetails" className="flex flex-row gap-4">
                    <div id="billTo">
                        <p>Bill to:</p>
                        <p className="text-sm">
                            {merchantDetails.businessName}
                        </p>
                        <div className="text-sm">
                            ABN: {merchantDetails.ABN}
                        </div>
                    </div>
                    <div id="shipTo">
                        <p>Ship to:</p>
                        <LocationGrid {...merchantLocation} />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <p className="flex justify-end">Invoice #:</p>
                    <p className="w-36">{invoiceDetails.invoiceNumber}</p>
                    <p className="flex justify-end">Work Date:</p>
                    <p>{invoiceDetails.workDate?.toDateString()}</p>
                    <p className="flex justify-end">Due Date:</p>
                    <p>{invoiceDetails.dueDate?.toDateString()}</p>
                    <p className="flex justify-end">PO Number</p>
                    <p>{invoiceDetails.PONumber}</p>
                </div>
            </div>
            <div className="mb-4 border-t-black border-t-2 pt-4">
                {/* <InvoiceGrid /> */}
                <table className="w-full">
                    <thead>
                        <tr className="grid grid-cols-6">
                            <th className="col-span-3 text-left">
                                Description
                            </th>
                            <th className="col-span-1 text-left">Quantity</th>
                            <th className="col-span-1 text-left">Rate</th>
                            <th className="col-span-1 text-left">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allItems.map((LineItemArray) => {
                            return (
                                <tr className="grid grid-cols-6">
                                    <td className="col-span-3">
                                        {LineItemArray.description}
                                    </td>
                                    <td className="col-span-1">
                                        {" "}
                                        {LineItemArray.quantity!}
                                    </td>
                                    <td className="col-span-1">
                                        {" "}
                                        {displayCurrency(
                                            LineItemArray.rate!,
                                            "AUD"
                                        )}
                                    </td>
                                    <td className="col-span-1">
                                        {LineItemArray.quantity! *
                                        LineItemArray.rate!
                                            ? displayCurrency(
                                                  LineItemArray.quantity! *
                                                      LineItemArray.rate!,
                                                  "AUD"
                                              )
                                            : 0}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div className="flex flex-row justify-between border-t-black border-t-2 pt-4">
                <div className="w-96">
                    <h1>Notes:</h1>
                    <div className="border-2 border-[#EDEEEF] p-3 mb-4 rounded-md">
                        {notes}
                    </div>
                    <h1>Payment Terms:</h1>
                    <div className="border-2 border-[#EDEEEF] p-3 mb-4 rounded-md">
                        <div>{paymentDetails.bankAccount}</div>
                        <div>
                            BSB:{" "}
                            {paymentDetails.BSB
                                ? displayBankNumber(paymentDetails.BSB!)
                                : null}
                        </div>
                        <div>
                            Account Number:{" "}
                            {paymentDetails.ACC
                                ? displayBankNumber(paymentDetails.ACC!)
                                : null}
                        </div>
                        <div>{paymentNotes}</div>
                    </div>
                </div>
                <div>
                    <div className="grid grid-cols-2 gap-2">
                        <p className="flex justify-end">Subtotal</p>
                        <p className="w-36">
                            {displayCurrency(subtotal, "AUD")}
                        </p>
                        <p className="flex justify-end">Tax</p>
                        <p>{displayPercentage(taxrate)}</p>
                        <p className="flex justify-end">Total</p>
                        <p className="w-36">{displayCurrency(total, "AUD")}</p>
                        <p className="flex justify-end">Amount Paid</p>
                        <p>{displayCurrency(amountPaid, "USD")}</p>
                        <p className="flex justify-end">Balance Due</p>
                        <p>{displayCurrency(total - amountPaid, "USD")}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const LocationGrid: FC<Partial<LocationType>> = ({
    streetLine1,
    streetLine2,
    country,
    suburb,
    state,
    postcode,
}) => {
    return (
        <div className="text-sm">
            <p>
                {streetLine1 && `${streetLine1},`}{" "}
                {streetLine2 && `${streetLine2},`}
            </p>
            <p>
                {suburb} {state} {postcode}
            </p>
            <p>{country}</p>
        </div>
    );
};
