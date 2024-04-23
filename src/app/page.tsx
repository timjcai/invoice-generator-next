"use client";
import React, { useEffect, useState } from "react";
// import CSVPage from "./components/ReactGrid/CSVPage";
import { InvoicePreview } from "./components/InvoiceTemplate";
import { BuyerType, LineItemsType, LocationType, SellerType } from "./types";
import { AppTabs, Navbar } from "./components/Navigation";
import {
    AuthContextValue,
    MerchantContextValue,
    InvoiceContextValue,
    InvoiceDetailContext,
    LineItemsContextValue,
    PaymentNotesContextValue,
    ProfileContextValue,
    useAuth,
    useMerchantContext,
    useInvoiceDetailContext,
    useLineItemsContext,
    usePaymentNotesContext,
    useProfileContext,
} from "./context";
import { signOut } from "firebase/auth";
import { auth } from "./server";
import { generateInvoice } from "./utils/InvoiceGenerator";
import { LandingPage } from "./components/LandingPage";

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
    const { merchantDetails, merchantLocation } =
        useMerchantContext() as MerchantContextValue;
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
