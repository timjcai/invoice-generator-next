"use client";
import { ProviderProps } from ".";
import { BuyerType } from "../types";
import { FC, createContext, useContext, useState } from "react";

export interface BillerContextValue {
    billerDetails: Partial<BuyerType> | undefined;
    setBillerDetails: (
        prevState:
            | Partial<BuyerType>
            | undefined
            | ((
                  prevState: Partial<BuyerType> | undefined
              ) => Partial<BuyerType> | undefined)
    ) => void;
    getBillerDetails: (uid: string) => void;
    updateBillerDetails: (uid: string) => void;
    billerId: string;
    loading: boolean;
}

export const BillerDetailsContext = createContext<
    BillerContextValue | undefined
>(undefined);

export function useBillerContext() {
    return useContext(BillerDetailsContext);
}

export const BillerProvider: FC<ProviderProps> = ({ children }) => {
    const [billerId, setBillerId] = useState<string>("");
    const [billerDetails, setBillerDetails] = useState<Partial<BuyerType>>();
    const [loading, setLoading] = useState<boolean>(true);

    async function getBillerDetails(uid: string) {
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
            let billerDetails = {
                ...profileData,
                businessLocation: businessLocation,
                sellerPaymentDetails: paymentDetails,
            };
            setBillerDetails(billerDetails);
        } catch (error) {
            console.error("error fetching data", error);
        }
    }

    async function updateBillerDetails(uid: string) {}

    const value: BillerContextValue = {
        billerDetails,
        setBillerDetails,
        getBillerDetails,
        updateBillerDetails,
        billerId,
        loading,
    };

    return (
        <BillerDetailsContext.Provider value={value}>
            {children}
        </BillerDetailsContext.Provider>
    );
};
