"use client";

import React, { FC, useState } from "react";
import { BubbleWrapper } from ".";
import {
    BuyerType,
    DescriptionType,
    LocationType,
    SellerType,
} from "@/app/types";
import { displayABN, displayCurrency } from "@/app/utils";
import { ImageDropzone } from "../Dropzone";

export type InvoiceType = {
    invoiceNumber: number;
    sellerDetails: SellerType;
    buyerDetails: BuyerType;
    invoiceDate: Date;
    dueDate: Date;
    itemDescriptions: DescriptionType[];
    termsAndConditions?: string;
    notes?: string;
};

export const InvoicePreview: FC<InvoiceType> = ({
    invoiceNumber,
    sellerDetails,
    buyerDetails,
    invoiceDate,
    dueDate,
    itemDescriptions,
    termsAndConditions,
    notes,
}) => {
    const [totalBalance, setTotalBalance] = useState<number>(10.1);
    return (
        <div className="w-[840px] bg-[rgba(154, 152, 152, 0.53)] backdrop-filter backdrop-blur-lg rounded-xl border-2 border-[#ccc] p-12 shadow-black">
            <div className="flex flex-row justify-between mb-8 border-b-black border-b-2 pb-4">
                {<ImageDropzone />}
                <div className="w-64">
                    <h1 className="text-4xl mb-1">Invoice #{invoiceNumber}</h1>
                    <div id="sellerDetails">
                        <p className="font-medium text-md">
                            {sellerDetails.businessName}
                        </p>
                        <p className="text-sm">
                            ABN: {displayABN(sellerDetails.ABN)}
                        </p>
                        <LocationGrid {...sellerDetails.businessLocation} />
                    </div>
                </div>
            </div>
            <div className="flex flex-row justify-between gap-8">
                <div id="buyerDetails" className="flex flex-row gap-4">
                    <div id="billTo">
                        <p>Bill to:</p>
                        <p>{buyerDetails.businessName}</p>
                        <div>ABN: {buyerDetails.ABN}</div>
                    </div>
                    <div id="shipTo">
                        <p>Ship to:</p>
                        <LocationGrid {...buyerDetails.businessLocation} />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <p className="flex justify-end">Invoice #:</p>
                    <p className="w-36">{invoiceNumber}</p>
                    <p className="flex justify-end">Work Date:</p>
                    <p>{invoiceDate.toDateString()}</p>
                    <p className="flex justify-end">Due Date:</p>
                    <p>{dueDate.toDateString()}</p>
                    <p className="flex justify-end">PO Number</p>
                    <p>PO number</p>
                </div>
            </div>
            <div className="mb-4">
                <h1>Title</h1>
            </div>
            <div className="flex flex-row justify-between border-t-black border-t-2 pt-4">
                <div className="w-96">
                    <h1>Notes:</h1>
                    <textarea className="w-full"></textarea>
                    <h1>Payment Terms:</h1>
                    <textarea className="w-full"></textarea>
                </div>
                <div>
                    <div className="grid grid-cols-2 gap-2">
                        <p className="flex justify-end">Subtotal</p>
                        <p className="w-36">{invoiceNumber}</p>
                        <p className="flex justify-end">Tax</p>
                        <p>RATE</p>
                        <p className="flex justify-end">Amount Paid</p>
                        <p>{displayCurrency(0, "USD")}</p>
                        <p className="flex justify-end">Balance Due</p>
                        <p>{displayCurrency(totalBalance, "USD")}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const LocationGrid: FC<LocationType> = ({
    streetLine1,
    streetLine2,
    country,
    suburb,
    state,
    postcode,
}) => {
    return (
        <div className="text-sm">
            <p>{streetLine1},</p>
            {streetLine2 && <p>{streetLine2},</p>}
            <p>
                {suburb} {state} {postcode}
            </p>
            <p>{country}</p>
        </div>
    );
};
