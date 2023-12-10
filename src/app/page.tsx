"use client";
import * as React from "react";
import CSVPage from "./components/ReactGrid/CSVPage";
import { InvoicePreview } from "./components/InvoiceTemplate";
import { BuyerType, SellerType } from "./types";

const Tim: SellerType = {
    sellerId: "1",
    businessName: "Tim Jianger Cai",
    businessLocation: {
        streetLine1: "3 Elliot Avenue",
        streetLine2: "Flat G07",
        country: "Australia",
        suburb: "CARNEGIE",
        state: "VIC",
        postcode: 3163,
    },
    ABN: 37676346082,
    sellerPaymentDetails: {
        BSB: 134134,
        ACC: 13613612,
        BankAccount: "Commonwealth Bank",
    },
};

const ABNGroup: BuyerType = {
    businessName: "ABN Group",
    businessLocation: {
        streetLine1: "82 Lorimer Street",
        country: "Australia",
        suburb: "DOCKLANDS",
        state: "VIC",
        postcode: 3008,
    },
    ABN: 82130382188,
};

export default function Home() {
    return (
        <div className="w-screen flex justify-center flex-col">
            <section className="flex flex-col py-[32px] max-w-screen-lg">
                <h1>Free Invoice Generator</h1>
                <p>
                    Build minimally designed invoices in bulk! Create invoices
                    within the browser through our in-line excel-like
                    spreadsheet fast, without having to download and reupload
                    your excel spreadsheet or CSV file.
                </p>
                <button className="border-2 border-black px-4 py-2 w-36">
                    Sign Up
                </button>
            </section>
            <CSVPage />
            <InvoicePreview
                sellerDetails={Tim}
                invoiceNumber={1}
                buyerDetails={ABNGroup}
            />
        </div>
    );
}

// libraries
// react to pdf: https://github.com/ivmarcos/react-to-pdf
// docx: https://www.npmjs.com/package/docx
// react grid: https://github.com/silevis/reactgrid
