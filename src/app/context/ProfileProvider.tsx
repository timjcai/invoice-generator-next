"use client";

import React, { FC, createContext, useContext, useState } from "react";
import { LocationType, SellerType } from "../types";

interface ProfileContextValue {
    profileDetails: Partial<SellerType>;
    setProfileDetails: (
        prevState:
            | Partial<SellerType>
            | ((prevState: Partial<SellerType>) => Partial<SellerType>)
    ) => void;
    businessLocation: LocationType;
    setBusinessLocation: (
        prevState: LocationType | ((prevState: LocationType) => LocationType)
    ) => void;
    getProfileDetails: () => void;
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
    const [profileDetails, setProfileDetails] = useState<Partial<SellerType>>({
        sellerId: "1",
        businessName: "Tim Jianger Cai",
        ABN: 37676346082,
        sellerPaymentDetails: {
            BSB: 134134,
            ACC: 13613612,
            BankAccount: "Commonwealth Bank",
        },
    });
    const [businessLocation, setBusinessLocation] = useState<LocationType>({
        streetLine1: "3 Elliot Avenue",
        streetLine2: "Flat G07",
        country: "Australia",
        suburb: "CARNEGIE",
        state: "VIC",
        postcode: 3163,
    });

    function getProfileDetails() {}

    function updateProfileDetails() {}

    const value: ProfileContextValue = {
        profileDetails,
        setProfileDetails,
        businessLocation,
        setBusinessLocation,
        getProfileDetails,
        updateProfileDetails,
    };

    return (
        <ProfileDetailsContext.Provider value={value}>
            {children}
        </ProfileDetailsContext.Provider>
    );
};
