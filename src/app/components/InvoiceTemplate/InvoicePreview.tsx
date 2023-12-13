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
                <p>Logo</p>
                <div className="pe-8">
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
                    <p>{invoiceNumber}</p>
                    <p className="flex justify-end">Work Date:</p>
                    <p>{invoiceDate.toDateString()}</p>
                    <p className="flex justify-end">Due Date:</p>
                    <p>{dueDate.toDateString()}</p>
                    <p className="flex justify-end">Balance Due:</p>
                    <p>{displayCurrency(totalBalance, "USD")}</p>
                </div>
            </div>
            <section>
                <h1>Title</h1>
            </section>
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
