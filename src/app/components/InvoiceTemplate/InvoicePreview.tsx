"use client";

import React, { FC, useState } from "react";
import {
    BuyerType,
    DescriptionType,
    LocationType,
    SellerType,
} from "@/app/types";
import { displayABN, displayCurrency } from "@/app/utils";
import { ImageDropzone } from "../Dropzone";
import { InvoiceGrid } from "../ReactGrid";
import {
    BillerContextValue,
    InvoiceContextValue,
    useBillerContext,
    useInvoiceDetailContext,
} from "@/app/context";

export type InvoiceType = {
    invoiceNumber: number;
    sellerDetails: Partial<SellerType>;
    sellerLocation: Partial<LocationType>;
    buyerDetails: Partial<BuyerType>;
    buyerLocation: Partial<LocationType>;
    invoiceDate: Date;
    dueDate: Date;
    itemDescriptions: DescriptionType[];
    termsAndConditions?: string;
    notes?: string;
};

export const InvoicePreview: FC<InvoiceType> = ({
    invoiceNumber,
    sellerDetails,
    sellerLocation,
    buyerDetails,
    buyerLocation,
    invoiceDate,
    dueDate,
    itemDescriptions,
    termsAndConditions,
    notes,
}) => {
    const [totalBalance, setTotalBalance] = useState<number>(10.1);
    const {} = useBillerContext() as BillerContextValue;
    const { invoiceDetails } = useInvoiceDetailContext() as InvoiceContextValue;
    return (
        <div className="w-[840px] bg-[rgba(154, 152, 152, 0.53)] backdrop-filter backdrop-blur-lg rounded-xl border-2 border-[#ccc] p-12 shadow-black">
            <div className="flex flex-row justify-between mb-8 border-b-black border-b-2 pb-4">
                {<ImageDropzone />}
                <div className="w-64">
                    <h1 className="text-4xl mb-1">
                        Invoice #{invoiceDetails.invoiceNumber}
                    </h1>
                    <div id="sellerDetails">
                        <p className="font-medium text-md">
                            {sellerDetails?.businessName}
                        </p>
                        <p className="text-sm">
                            ABN:
                            {sellerDetails !== undefined &&
                                displayABN(sellerDetails.ABN)}
                        </p>
                        <LocationGrid {...sellerLocation} />
                    </div>
                </div>
            </div>
            <div className="flex flex-row justify-between gap-8 mb-8">
                <div id="buyerDetails" className="flex flex-row gap-4">
                    <div id="billTo">
                        <p>Bill to:</p>
                        <p>{buyerDetails.businessName}</p>
                        <div>ABN: {buyerDetails.ABN}</div>
                    </div>
                    <div id="shipTo">
                        <p>Ship to:</p>
                        <LocationGrid {...buyerLocation} />
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
                <h1>Title</h1>
                <InvoiceGrid />
            </div>
            <div className="flex flex-row justify-between border-t-black border-t-2 pt-4">
                <div className="w-96">
                    <h1>Notes:</h1>
                    <textarea className="w-full border-black border-[0.5px]"></textarea>
                    <h1>Payment Terms:</h1>
                    <textarea className="w-full border-black border-[0.5px]"></textarea>
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
            <p>{streetLine1},</p>
            {streetLine2 && <p>{streetLine2},</p>}
            <p>
                {suburb} {state} {postcode}
            </p>
            <p>{country}</p>
        </div>
    );
};
