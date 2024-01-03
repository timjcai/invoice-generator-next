"use client";

import React, {
    FC,
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";
import { LocationType, SellerType } from "../types";
import { doc } from "firebase/firestore";
import { app, auth } from "../server";
import { useAuth } from ".";
import { onAuthStateChanged } from "firebase/auth";

export interface ProfileContextValue {
    profileDetails: Partial<SellerType> | undefined;
    setProfileDetails: (
        prevState:
            | Partial<SellerType>
            | undefined
            | ((
                  prevState: Partial<SellerType> | undefined
              ) => Partial<SellerType> | undefined)
    ) => void;
    getProfileDetails: (uid: string) => void;
    updateProfileDetails: (uid: string) => void;
    uid: string;
    loading: boolean;
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
    const [uid, setUid] = useState<string>("");
    const [profileDetails, setProfileDetails] = useState<Partial<SellerType>>();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUid(user.uid);
            } else {
                setUid(null);
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    async function getProfileDetails(uid: string) {
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
    }

    function updateProfileDetails(uid: string) {}

    const value: ProfileContextValue = {
        profileDetails,
        setProfileDetails,
        getProfileDetails,
        updateProfileDetails,
        uid,
        loading,
    };

    return (
        <ProfileDetailsContext.Provider value={value}>
            {children}
        </ProfileDetailsContext.Provider>
    );
};
