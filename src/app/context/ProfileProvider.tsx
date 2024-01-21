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
import {
    BankTransferType,
    LocationType,
    PaymentDetailType,
    SellerType,
} from "../types";
import {
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    updateDoc,
    where,
} from "firebase/firestore";
import { app, auth, db } from "../server";
import { PaymentNotesContextValue, useAuth, usePaymentNotesContext } from ".";
import { onAuthStateChanged } from "firebase/auth";

export interface ProfileContextValue {
    profileDetails: Partial<SellerType>;
    setProfileDetails: Dispatch<SetStateAction<Partial<SellerType>>>;
    locationDetails: Partial<LocationType>;
    setLocationDetails: Dispatch<SetStateAction<Partial<LocationType>>>;
    paymentDetails: Partial<BankTransferType>;
    setPaymentDetails: Dispatch<SetStateAction<Partial<BankTransferType>>>;
    getProfileDetails: (uid: string) => void;
    updateProfileDetails: (
        uid: string,
        locationId: string,
        profileData: Partial<SellerType>,
        locationData: Partial<LocationType>
    ) => void;
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
        Partial<BankTransferType>
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
            // profile details
            const q = query(
                collection(db, "profile"),
                where("user_id", "==", `${uid}`)
            );
            const userQuery = await getDocs(q);
            const profileData = await userQuery.docs[0].data();
            const profileId = userQuery.docs[0].id;

            // businessLocation
            const locationRef = doc(
                db,
                "businessLocation",
                `${profileData.businessLocation}`
            );
            const businessLocationQuery = await getDoc(locationRef);
            const locationData = businessLocationQuery.data();
            const locationId = businessLocationQuery.id;

            // paymentDetails
            const documentRef = doc(
                db,
                "paymentDetails",
                `${profileData.paymentDetails}`
            );
            const paymentDetailQuery = await getDoc(documentRef);
            const paymentData = paymentDetailQuery.data();
            const paymentId = paymentDetailQuery.id;

            setProfileDetails({ ...profileData });
            setLocationDetails({ ...locationData });
            setPaymentDetails({ ...paymentData });
            setProfileId({
                profileId: profileId,
                businessLocationId: locationId,
                paymentDetailsId: paymentId,
            });
        } catch (error) {
            console.error("error fetching data", error);
        }
    }

    async function updateProfileDetails(
        uid: string,
        locationId: string,
        profileData: Partial<SellerType>,
        locationData: Partial<LocationType>
    ) {
        const profileRef = doc(db, "profile", uid);
        console.log(profileRef);
        const locationRef = doc(db, "businessLocation", locationId);
        await updateDoc(profileRef, profileData);
        await updateDoc(locationRef, locationData);
    }

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
