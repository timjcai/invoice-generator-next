"use client";

import React, { FC, createContext, useContext, useState } from "react";
import { LocationType, SellerType } from "../types";
import { doc } from "firebase/firestore";
import { app } from "../server";

interface ProfileContextValue {
    profileDetails: Partial<SellerType>;
    setProfileDetails: (
        prevState:
            | Partial<SellerType>
            | ((prevState: Partial<SellerType>) => Partial<SellerType>)
    ) => void;
    getProfileDetails: (uid: string) => void;
    updateProfileDetails: () => void;
}

export const ProfileDetailsContext = createContext<
    ProfileContextValue | undefined
>(undefined);

export type ProviderProps = {
    children: React.JSX.Element;
};

export function useProfileContext() {
    return useContext(ProfileDetailsContext);
}

export const ProfileProvider: FC<ProviderProps> = ({ children }) => {
    const [profileDetails, setProfileDetails] = useState<Partial<SellerType>>();
    //     {
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
    //     sellerPaymentDetails: {
    //         BSB: 134134,
    //         ACC: 13613612,
    //         BankAccount: "Commonwealth Bank",
    //     },
    // }

    function getProfileDetails(uid: string) {
        const docRef = doc(app, "user_id", uid);
        console.log("hello");
        console.log(docRef);
    }

    function updateProfileDetails() {}

    const value: ProfileContextValue = {
        profileDetails,
        setProfileDetails,
        getProfileDetails,
        updateProfileDetails,
    };

    return (
        <ProfileDetailsContext.Provider value={value}>
            {children}
        </ProfileDetailsContext.Provider>
    );
};
