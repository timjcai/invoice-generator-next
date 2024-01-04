"use client";

import React, {
    Dispatch,
    FC,
    SetStateAction,
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";
import { LocationType, PaymentDetailType, SellerType } from "../types";
import { doc } from "firebase/firestore";
import { app, auth } from "../server";
import { useAuth } from ".";
import { onAuthStateChanged } from "firebase/auth";

export interface ProfileContextValue {
    profileDetails: Partial<SellerType>;
    setProfileDetails: Dispatch<SetStateAction<Partial<SellerType>>>;
    locationDetails: Partial<LocationType>;
    setLocationDetails: Dispatch<SetStateAction<Partial<LocationType>>>;
    paymentDetails: Partial<PaymentDetailType>;
    setPaymentDetails: Dispatch<SetStateAction<Partial<PaymentDetailType>>>;
    getProfileDetails: (uid: string) => void;
    updateProfileDetails: (uid: string) => void;
    uid: string;
    loading: boolean;
    profileId: Partial<ProfileIdProps>;
}

export type ProviderProps = {
    children: React.JSX.Element;
};

export type ProfileIdProps = {
    profileId: string;
    businessLocationId: string;
    paymentDetailsId: string;
};

export const ProfileDetailsContext = createContext<
    ProfileContextValue | undefined
>(undefined);

export function useProfileContext() {
    return useContext(ProfileDetailsContext);
}

export const ProfileProvider: FC<ProviderProps> = ({ children }) => {
    const [uid, setUid] = useState<string>("");
    const [profileId, setProfileId] = useState<Partial<ProfileIdProps>>({});
    const [profileDetails, setProfileDetails] = useState<Partial<SellerType>>(
        {}
    );
    const [locationDetails, setLocationDetails] = useState<
        Partial<LocationType>
    >({});
    const [paymentDetails, setPaymentDetails] = useState<
        Partial<PaymentDetailType>
    >({});
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUid(user.uid);
            } else {
                setUid("");
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
            const paymentDetailsData = await paymentResponse.json();
            const businessLocationData = await locationResponse.json();
            const { profileid, ...profileOG } = profileData;
            const { locationid, ...businessLocationOG } = businessLocationData;
            const { paymentid, ...paymentDetailsOG } = paymentDetailsData;
            setProfileDetails({ ...profileOG });
            setLocationDetails({ ...businessLocationOG });
            setPaymentDetails({ ...paymentDetailsOG });
            setProfileId({
                profileId: profileid,
                businessLocationId: locationid,
                paymentDetailsId: paymentid,
            });
        } catch (error) {
            console.error("error fetching data", error);
        }
    }

    function updateProfileDetails(uid: string) {}

    const value: ProfileContextValue = {
        profileDetails,
        setProfileDetails,
        locationDetails,
        setLocationDetails,
        paymentDetails,
        setPaymentDetails,
        getProfileDetails,
        updateProfileDetails,
        uid,
        loading,
        profileId,
    };

    return (
        <ProfileDetailsContext.Provider value={value}>
            {children}
        </ProfileDetailsContext.Provider>
    );
};
