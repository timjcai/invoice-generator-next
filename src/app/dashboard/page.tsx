"use client";
import React, { useEffect, useState } from "react";
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
} from "../context";
import { signOut } from "firebase/auth";
import { auth } from "../server";
import { AppTabs, Navbar } from "../components/Navigation";
import { InvoicePreview } from "../components/InvoiceTemplate";
import { generateInvoice } from "../utils";
import { LineItemsType, LocationType } from "../types";
const page = () => {
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

    useEffect(() => {
        getProfileDetails(uid);
    }, [uid]);

    return (
        <div className="flex flex-col items-center h-screen w-screen">
            <Navbar />
            <div className="flex items-center justify-center flex-col mx-4 md:mx-[100px] lg:w-[1024px]">
                <div className="flex flex-col">
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
            </div>
            <div className="w-full grid grid-cols-8 gap-10">
                <div className="col-span-4 ms-20 max-w-[840px] justify-self-end">
                    <AppTabs></AppTabs>
                </div>
                <div className="col-span-4 h-full">
                    <InvoicePreview
                        itemDescriptions={[]}
                        termsAndConditions={"these are my terms and conditions"}
                        notes={"job number: 1234"}
                    />
                </div>
            </div>
        </div>
    );
};

export default page;
