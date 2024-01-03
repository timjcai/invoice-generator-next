"use client";
import { faBedPulse } from "@fortawesome/free-solid-svg-icons/faBedPulse";
import { ProviderProps } from ".";
import { SelectorOptions } from "../components/common";
import { BuyerType } from "../types";
import {
    Dispatch,
    FC,
    SetStateAction,
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

export interface BillerContextValue {
    billerDetails: Partial<BuyerType> | undefined;
    setBillerDetails: Dispatch<SetStateAction<Partial<BuyerType>>> | undefined;
    allBillers: BuyerType[] | undefined;
    setAllBillers: Dispatch<SetStateAction<BuyerType[]>>;
    getBillerDetails: (uid: string) => void;
    createSelectorOptions: () => void;
    billerSelectorOptions: SelectorOptions[];
    setBillerSelectorOptions: Dispatch<SetStateAction<SelectorOptions[]>>;
    updateBillerDetails: (uid: string) => void;
    getBillerIndex: (uid: string) => void;
    billerId: string;
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
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
    const [billerSelectorOptions, setBillerSelectorOptions] = useState<
        SelectorOptions[]
    >([]);
    const [allBillers, setAllBillers] = useState<BuyerType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    async function getBillerIndex(uid: string) {
        try {
            const response = await fetch(`/api/details/merchant?user=${uid}`);
            const billerIndex = await response.json();
            console.log(billerIndex as BuyerType[]);
            setAllBillers(billerIndex);
            let billerArray = [] as SelectorOptions[];
            console.log(billerIndex);
            billerIndex.forEach((merchant: BuyerType) => {
                billerArray.push({
                    value: merchant.id!,
                    label: merchant.businessName,
                });
            });
            setBillerSelectorOptions(billerArray);
            console.log(billerArray);
        } catch (error) {
            console.error("error fetching data", error);
        }
    }

    async function getBillerDetails(billderId: string) {
        try {
            const response = await fetch(
                `/api/details/profile?user=${billderId}`
            );
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

    async function updateBillerDetails(billderId: string) {}

    const value: BillerContextValue = {
        billerDetails,
        setBillerDetails,
        allBillers,
        setAllBillers,
        getBillerDetails,
        getBillerIndex,
        billerSelectorOptions,
        setBillerSelectorOptions,
        updateBillerDetails,
        billerId,
        loading,
        setLoading,
    };

    return (
        <BillerDetailsContext.Provider value={value}>
            {children}
        </BillerDetailsContext.Provider>
    );
};
