"use client";
import * as React from "react";
import CSVPage from "./components/ReactGrid/CSVPage";
import { InvoicePreview } from "./components/InvoiceTemplate";
import { BuyerType, SellerType } from "./types";
import { AppTabs } from "./components/Navigation";

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
        <div className="flex items-center justify-center flex-col mx-4 md:mx-[100px] lg:w-[1024px]">
            <div className="flex flex-col py-[32px]">
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
            </div>
            <AppTabs></AppTabs>
            <CSVPage />
            <InvoicePreview
                sellerDetails={Tim}
                invoiceNumber={1}
                buyerDetails={ABNGroup}
                invoiceDate={new Date()}
                dueDate={new Date()}
                itemDescriptions={[]}
                termsAndConditions={"these are my terms and conditions"}
                notes={"job number: 1234"}
            />
        </div>
    );
}

// libraries
// react to pdf: https://github.com/ivmarcos/react-to-pdf
// docx: https://www.npmjs.com/package/docx
// react grid: https://github.com/silevis/reactgrid
