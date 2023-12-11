"use client";

import React, { FC, useState } from "react";
import { BubbleWrapper } from ".";
import {
    BuyerType,
    DescriptionType,
    LocationType,
    SellerType,
} from "@/app/types";

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
        <BubbleWrapper>
            <section>
                <h1>Invoice #{invoiceNumber}</h1>
            </section>
            <section className="flex flex-col gap-8">
                <div id="sellerDetails">
                    <div>Business Name: {sellerDetails.businessName}</div>
                    <div>ABN: {sellerDetails.ABN}</div>
                    <div>
                        Location:
                        <LocationGrid {...sellerDetails.businessLocation} />
                    </div>
                </div>
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
                    <div>
                        <p>Invoice #:</p>
                        <p>{invoiceNumber}</p>
                        <p>Work Date:</p>
                        <p>{invoiceDate.toDateString()}</p>
                        <p>Due Date:</p>
                        <p>{dueDate.toDateString()}</p>
                        <p>Balance Due:</p>
                        <p>{totalBalance}</p>
                    </div>
                </div>
            </section>
            <section>
                <h1>Title</h1>
            </section>
        </BubbleWrapper>
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
        <div>
            <p>{streetLine1},</p>
            {streetLine2 && <p>{streetLine2},</p>}
            <p>
                {suburb} {state} {postcode}
            </p>
            <p>{country}</p>
        </div>
    );
};
