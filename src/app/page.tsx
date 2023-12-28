"use client";
import React, { useEffect, useState } from "react";
import CSVPage from "./components/ReactGrid/CSVPage";
import { InvoicePreview } from "./components/InvoiceTemplate";
import { BuyerType, SellerType } from "./types";
import { AppTabs } from "./components/Navigation";
import {
    AuthContextValue,
    ProfileContextValue,
    useAuth,
    useProfileContext,
} from "./context";
import { signOut } from "firebase/auth";
import { auth } from "./server";
import { get } from "http";

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

//  add signout functionality

export default function Home() {
    const { currentUser, getUser } = useAuth() as AuthContextValue;
    const {
        profileDetails,
        setProfileDetails,
        getProfileDetails,
        uid,
        loading,
    } = useProfileContext() as ProfileContextValue;

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const loadedUser = await getUser();
    //         setLoading(true);
    //         getProfileDetails(loadedUser.uid);
    //     };
    //     fetchData();
    // }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    const getProfileData = async () => {
        try {
            const response = await fetch(`/api/details/profile?user=${uid}`);
            const profileData = await response.json();
            const paymentResponse = await fetch(
                `/api/details/payment?payment=${profileData.paymentDetails}`
            );
            const locationResponse = await fetch(
                `/api/details/businessLocation?location=${profileData.businessLocation}`
            );
            const paymentDetails = await paymentResponse.json();
            const businessLocation = await locationResponse.json();
            let profileDetails = {
                ...profileData,
                businessLocation: businessLocation,
                sellerPaymentDetails: paymentDetails,
            };
            setProfileDetails(profileDetails);
        } catch (error) {
            console.error("error fetching data", error);
        }
    };

    useEffect(() => {
        getProfileData();
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
                        <button className="border-2 border-black px-4 py-2 w-36">
                            Sign Up
                        </button>
                    </div>
                    <AppTabs></AppTabs>
                    <InvoicePreview
                        sellerDetails={profileDetails}
                        invoiceNumber={1}
                        buyerDetails={ABNGroup}
                        invoiceDate={new Date()}
                        dueDate={new Date()}
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
