"use client";
import React, { useEffect, useState } from "react";
import CSVPage from "./components/ReactGrid/CSVPage";
import { InvoicePreview } from "./components/InvoiceTemplate";
import { BuyerType, LineItemsType, LocationType, SellerType } from "./types";
import { AppTabs, Navbar } from "./components/Navigation";
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
import { generateInvoice } from "./utils/InvoiceGenerator";
import { LandingPage } from "./components/common";

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

    return (
        <div className="flex flex-col items-center h-screen w-screen">
            <Navbar />
            <LandingPage />
        </div>
    );
}

// libraries
// react to pdf: https://github.com/ivmarcos/react-to-pdf
// docx: https://www.npmjs.com/package/docx
// react grid: https://github.com/silevis/reactgrid
