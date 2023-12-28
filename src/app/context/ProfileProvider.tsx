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
    updateProfileDetails: () => void;
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
        // const docRef = doc(app, "user_id", uid);
        console.log("hello");
        // console.log(docRef);
    }

    function updateProfileDetails() {}

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
