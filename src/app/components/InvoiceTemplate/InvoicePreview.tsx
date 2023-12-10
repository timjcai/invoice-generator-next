"use client";

import React, { FC } from "react";
import { BubbleWrapper } from ".";
import { BuyerType, LocationType, SellerType } from "@/app/types";

export type InvoiceType = {
    invoiceNumber: number;
    sellerDetails: SellerType;
    buyerDetails: BuyerType;
};

export const InvoicePreview: FC<InvoiceType> = ({
    invoiceNumber,
    sellerDetails,
    buyerDetails,
}) => {
    return (
        <BubbleWrapper>
            <section>
                <h1>Invoice #{invoiceNumber}</h1>
            </section>
            <section className="flex flex-row gap-8">
                <div id="sellerDetails">
                    <div>Business Name: {sellerDetails.businessName}</div>
                    <div>ABN: {sellerDetails.ABN}</div>
                    <div>
                        Location:
                        <LocationGrid {...sellerDetails.businessLocation} />
                    </div>
                </div>
                <div id="buyerDetails">
                    <div>Business Name: {buyerDetails.businessName}</div>
                    <div>ABN: {buyerDetails.ABN}</div>
                    <div>
                        Location:
                        <LocationGrid {...buyerDetails.businessLocation} />
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
