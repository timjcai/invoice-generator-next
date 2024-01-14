"use client";
import React, { useEffect, useState } from "react";
import CSVPage from "./components/ReactGrid/CSVPage";
import { InvoicePreview } from "./components/InvoiceTemplate";
import { BuyerType, LineItemsType, LocationType, SellerType } from "./types";
import { AppTabs } from "./components/Navigation";
import {
    AuthContextValue,
    BillerContextValue,
    InvoiceContextValue,
    InvoiceDetailContext,
    LineItemsContextValue,
    PaymentNotesContextValue,
    ProfileContextValue,
    useAuth,
    useBillerContext,
    useInvoiceDetailContext,
    useLineItemsContext,
    usePaymentNotesContext,
    useProfileContext,
} from "./context";
import { signOut } from "firebase/auth";
import { auth } from "./server";
import { get } from "http";
import { generateInvoice } from "./utils/InvoiceGenerator";

// const Tim: SellerType = {
//     sellerId: "1",
//     businessName: "Tim Jianger Cai",
//     businessLocation: {
//         streetLine1: "3 Elliot Avenue",
//         streetLine2: "Flat G07",
//         country: "Australia",
//         suburb: "CARNEGIE",
//         state: "VIC",
//         postcode: 3163,
//     },
//     ABN: 37676346082,
//     paymentDetails: {
//         BSB: 134134,
//         ACC: 13613612,
//         bankAccount: "Commonwealth Bank",
//     },
// };

// const ABNGroup: BuyerType = {
//     businessName: "ABN Group",
//     businessLocation: {
//         streetLine1: "82 Lorimer Street",
//         country: "Australia",
//         suburb: "DOCKLANDS",
//         state: "VIC",
//         postcode: 3008,
//     },
//     ABN: 82130382188,
// };

//  add signout functionality

export default function Home() {
    const { currentUser, getUser } = useAuth() as AuthContextValue;
    const {
        profileDetails,
        locationDetails: sellerLocation,
        setProfileDetails,
        getProfileDetails,
        paymentDetails,
        uid,
        loading,
    } = useProfileContext() as ProfileContextValue;
    const { billerDetails, billerLocation } =
        useBillerContext() as BillerContextValue;
    const { invoiceDetails } = useInvoiceDetailContext() as InvoiceContextValue;
    const { notes, paymentNotes } =
        usePaymentNotesContext() as PaymentNotesContextValue;
    const { total, subtotal, taxrate, allItems } =
        useLineItemsContext() as LineItemsContextValue;

    if (loading) {
        return <p>Loading...</p>;
    }

    // async function generateInvoiceHandler() {
    //     // // placeholder - POST request to '/api/generate-invoice'
    //     // try {
    //     //     const response = await fetch("/api/generate-invoice", {
    //     //         method: "POST",
    //     //         headers: {
    //     //             "Content-Type": "application/json",
    //     //         },
    //     //         body: JSON.stringify({ message: "hello" }),
    //     //     });
    //     //     if (response.ok) {
    //     //         const data = await response.json();
    //     //         console.log(data);
    //     //     } else {
    //     //         console.error("failed to handle post request");
    //     //     }
    //     // } catch (error) {
    //     //     console.error("Error:", error);
    //     // }
    // }

    useEffect(() => {
        getProfileDetails(uid);
    }, []);

    return (
        <>
            <div className="flex flex-col items-center justify-center">
                <div>{uid}</div>
                <button onClick={() => signOut(auth)}>Logout</button>
                <div className="flex items-center justify-center flex-col mx-4 md:mx-[100px] lg:w-[1024px]">
                    <div className="flex flex-col py-[32px]">
                        <h1>Free Invoice Generator</h1>
                        <p>
                            Build minimally designed invoices in bulk! Create
                            invoices within the browser through our in-line
                            excel-like spreadsheet fast, without having to
                            download and reupload your excel spreadsheet or CSV
                            file.
                        </p>
                        <button className="border-2 bg-[#212122] border-[#212122] py-1 text-white font-light rounded-md px-6 justify-center items-center mx-3 flex h-[40px] mb-2">
                            Sign Up
                        </button>
                        <button
                            className="border-2 bg-[#212122] border-[#212122] py-1 text-white font-light rounded-md px-6 justify-center items-center mx-3 flex h-[40px] mb-2"
                            onClick={(e) =>
                                generateInvoice({
                                    profileDetails: {
                                        ...profileDetails,
                                        businessLocation:
                                            sellerLocation as LocationType,
                                    },
                                    billerDetails: {
                                        ...billerDetails,
                                        businessLocation:
                                            billerLocation as LocationType,
                                    },
                                    invoiceDetails: invoiceDetails,
                                    paymentAndNotes: {
                                        paymentDetails: paymentDetails,
                                        notes: notes,
                                        paymentNotes: paymentNotes,
                                    },
                                    lineItems: allItems as LineItemsType[],
                                    totals: {
                                        subtotal: subtotal,
                                        taxrate: taxrate,
                                        total: total,
                                        amountPaid: 0,
                                    },
                                })
                            }
                        >
                            Generate Invoice
                        </button>
                    </div>
                    <AppTabs></AppTabs>
                    <InvoicePreview
                        itemDescriptions={[]}
                        termsAndConditions={"these are my terms and conditions"}
                        notes={"job number: 1234"}
                    />
                </div>
            </div>
        </>
    );
}

// libraries
// react to pdf: https://github.com/ivmarcos/react-to-pdf
// docx: https://www.npmjs.com/package/docx
// react grid: https://github.com/silevis/reactgrid
