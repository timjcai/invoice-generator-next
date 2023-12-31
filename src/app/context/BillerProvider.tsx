"use client";
import { ProviderProps } from ".";
import { SelectorOptions } from "../components/common";
import { BuyerType, LocationType, PaymentDetailType } from "../types";
import {
    Dispatch,
    FC,
    SetStateAction,
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";
import { db } from "../server";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";

export interface BillerContextValue {
    billerId: string;
    setBillerId: Dispatch<SetStateAction<string>>;
    billerDetails: Partial<BuyerType>;
    setBillerDetails: Dispatch<SetStateAction<Partial<BuyerType>>>;
    billerLocation: Partial<LocationType>;
    setBillerLocation: Dispatch<SetStateAction<Partial<LocationType>>>;
    billerPaymentDetails: Partial<PaymentDetailType>;
    setBillerPaymentDetails: Dispatch<
        SetStateAction<Partial<PaymentDetailType>>
    >;
    allBillers: BuyerType[];
    setAllBillers: Dispatch<SetStateAction<BuyerType[]>>;
    selectorOptions: SelectorOptions[];
    setSelectorOptions: Dispatch<SetStateAction<SelectorOptions[]>>;
    getBillerDetails: (billderId: string) => void;
    updateBillerDetails: (billderId: string) => void;
    getBillerIndex: (uid: string) => void;
    createBiller: (postData: Partial<BuyerType>, uid: string) => void;
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
    const [billerDetails, setBillerDetails] = useState<Partial<BuyerType>>({});
    const [billerLocation, setBillerLocation] = useState<Partial<LocationType>>(
        {}
    );
    const [billerPaymentDetails, setBillerPaymentDetails] = useState<
        Partial<PaymentDetailType>
    >({});
    const [allBillers, setAllBillers] = useState<BuyerType[]>([]);
    const [selectorOptions, setSelectorOptions] = useState<SelectorOptions[]>(
        []
    );
    const [loading, setLoading] = useState<boolean>(true);

    async function getBillerIndex(uid: string) {
        try {
            const response = await fetch(`/api/details/merchant?user=${uid}`);
            const billerIndex = await response.json();
            setAllBillers(billerIndex.allMerchants);
            setSelectorOptions(billerIndex.selectorOptions);
            setLoading(false);
        } catch (error) {
            console.error("error fetching data", error);
        }
    }

    async function createBiller(postData: Partial<BuyerType>, uid: string) {
        console.log(postData);
        try {
            const docRef = await addDoc(collection(db, "merchant"), {
                ...postData,
                associatedUser: uid,
            });
            console.log(`${docRef.id}`);
        } catch (error) {
            console.error("error in creating biller", error);
        }
    }

    // function createSelectorOptions(
    //     billerIndex: BuyerType[]
    // ): SelectorOptions[] {
    //     let billerArray = [] as SelectorOptions[];
    //     console.log(billerIndex);
    //     billerIndex.forEach((merchant: BuyerType) => {
    //         billerArray.push({
    //             value: merchant.id!,
    //             label: merchant.businessName,
    //         });
    //     });
    //     console.log(billerArray);
    //     return billerArray;
    // }

    async function getBillerDetails(billerId: string) {
        try {
            const merchantRef = doc(db, "merchant", `${billerId}`);
            const merchantResponse = await getDoc(merchantRef);
            const merchantData = merchantResponse.data() as BuyerType;
            const merchantId = merchantResponse.id;
            // const paymentResponse = await fetch(
            //     `/api/details/payment?payment=${merchantData.paymentDetails}`
            // );
            // const paymentDetailsData = await paymentResponse.json();
            const locationResponse = await fetch(
                `/api/details/businessLocation?location=${merchantData.businessLocation}`
            );
            const locationDetailsData = await locationResponse.json();
            // const paymentDetails = await paymentResponse.json();
            // const businessLocation = await locationResponse.json();
            setBillerLocation(locationDetailsData);
            setBillerDetails(merchantData);
            // setBillerDetails(billerDetails);
        } catch (error) {
            console.error("error fetching data", error);
        }
    }

    async function updateBillerDetails(billderId: string) {}

    const value: BillerContextValue = {
        billerDetails,
        setBillerDetails,
        billerId,
        setBillerId,
        billerLocation,
        setBillerLocation,
        billerPaymentDetails,
        setBillerPaymentDetails,
        allBillers,
        setAllBillers,
        selectorOptions,
        setSelectorOptions,
        getBillerDetails,
        createBiller,
        getBillerIndex,
        updateBillerDetails,
        loading,
        setLoading,
    };

    return (
        <BillerDetailsContext.Provider value={value}>
            {children}
        </BillerDetailsContext.Provider>
    );
};
