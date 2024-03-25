"use client";
import { ProfileContextValue, ProviderProps, useProfileContext } from ".";
import { SelectorOptions } from "../components/common";
import {
    BuyerType,
    LocationType,
    PaymentDetailType,
    StateType,
} from "../types";
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
import {
    addDoc,
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    updateDoc,
    where,
} from "firebase/firestore";

export interface MerchantContextValue {
    merchantId: string | null;
    setMerchantId: Dispatch<SetStateAction<string | null>>;
    merchantLocationId: string;
    setMerchantLocationId: Dispatch<SetStateAction<string>>;
    merchantDetails: Partial<BuyerType>;
    setMerchantDetails: Dispatch<SetStateAction<Partial<BuyerType>>>;
    merchantLocation: Partial<LocationType>;
    setMerchantLocation: Dispatch<SetStateAction<Partial<LocationType>>>;
    merchantPaymentDetails: Partial<PaymentDetailType>;
    setMerchantPaymentDetails: Dispatch<
        SetStateAction<Partial<PaymentDetailType>>
    >;
    allMerchants: BuyerType[];
    setAllMerchants: Dispatch<SetStateAction<BuyerType[]>>;
    selectorOptions: SelectorOptions[];
    setSelectorOptions: Dispatch<SetStateAction<SelectorOptions[]>>;
    getMerchantDetails: (merchantId: string | null) => void;
    updateMerchantDetails: () => void;
    getMerchantIndex: (uid: string) => void;
    createMerchant: (postData: Partial<BuyerType>, uid: string) => void;
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
}

export const BillerDetailsContext = createContext<
    MerchantContextValue | undefined
>(undefined);

export function useMerchantContext() {
    return useContext(BillerDetailsContext);
}

export const MerchantProvider: FC<ProviderProps> = ({ children }) => {
    // Merchant Details
    const [merchantId, setMerchantId] = useState<string | null>(null);

    const [merchantDetails, setMerchantDetails] = useState<Partial<BuyerType>>(
        {}
    );
    const [merchantBusinessName, setMerchantBusinessName] = useState<string>();
    const [merchantABN, setMerchantABN] = useState<number>();

    // Merchant Location
    const [merchantLocationId, setMerchantLocationId] = useState<string>("");
    const [merchantLocation, setMerchantLocation] = useState<
        Partial<LocationType>
    >({});
    const [streetLine1, setStreetLine1] = useState<string>();
    const [streetLine2, setStreetLine2] = useState<string>();
    const [country, setCountry] = useState<string>();
    const [suburb, setSuburb] = useState<string>();
    const [locationState, setLocationState] = useState<StateType>();
    const [postcode, setPostcode] = useState<string>();

    // Merchant Payment Details
    const [merchantPaymentDetails, setMerchantPaymentDetails] = useState<
        Partial<PaymentDetailType>
    >({});
    const [merchantBSB, setMerchantBSB] = useState<number>();
    const [merchantACC, setMerchantACC] = useState<number>();
    const [merchantBankAccount, setMerchantBankAccount] = useState<string>();

    // CRUD useState
    const [allMerchants, setAllMerchants] = useState<BuyerType[]>([]);

    // UTIL
    const [selectorOptions, setSelectorOptions] = useState<SelectorOptions[]>(
        []
    );
    const [loading, setLoading] = useState<boolean>(true);

    // CRUD Functions
    async function getMerchantIndex(uid: string) {
        try {
            // const response = await fetch(`/api/details/merchant?user=${uid}`);
            // const billerIndex = await response.json();
            const q = query(
                collection(db, "merchant"),
                where("associatedUser", "==", `${uid}`)
            );
            const userQuery = await getDocs(q);

            // allMerchants
            let allMerchants = [] as BuyerType[];
            userQuery.docs.forEach((item) => {
                allMerchants.push({ ...item.data(), id: item.id } as BuyerType);
            });

            // allMerchants as options for Selector
            let options = [] as SelectorOptions[];
            allMerchants.forEach((merchant) => {
                options.push({
                    value: merchant.id!,
                    label: merchant.businessName,
                });
            });
            setAllMerchants(allMerchants);
            setSelectorOptions(options);
            setLoading(false);
        } catch (error) {
            console.error("error fetching data", error);
        }
    }

    async function createMerchant(postData: Partial<BuyerType>, uid: string) {
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

    async function getMerchantDetails(billerId: string | null) {
        setLoading(true);
        try {
            if (billerId === null) {
                setMerchantLocation({
                    streetLine1: "",
                    streetLine2: "",
                    country: "",
                    suburb: "",
                    state: "VIC",
                    postcode: "",
                });
                setMerchantDetails({
                    businessName: "",
                    ABN: "",
                });
                setMerchantLocationId("");
            } else {
                const merchantRef = doc(db, "merchant", `${billerId}`);
                const merchantResponse = await getDoc(merchantRef);
                const merchantData = merchantResponse.data() as BuyerType;
                const merchantId = merchantResponse.id;
                // const paymentResponse = await fetch(
                //     `/api/details/payment?payment=${merchantData.paymentDetails}`
                // );
                // const paymentDetailsData = await paymentResponse.json();

                const locationRef = doc(
                    db,
                    "businessLocation",
                    `${merchantData.businessLocation}`
                );
                const businessLocationQuery = await getDoc(locationRef);
                const locationData =
                    businessLocationQuery.data() as LocationType;
                const locationId = businessLocationQuery.id;

                // const locationResponse = await fetch(
                //     `/api/details/businessLocation?location=${merchantData.businessLocation}`
                // );
                // const locationDetailsData = await locationResponse.json();
                // const paymentDetails = await paymentResponse.json();
                // const businessLocation = await locationResponse.json();
                setMerchantLocation(locationData);
                setMerchantDetails(merchantData);
                setMerchantLocationId(locationId);
                setLoading(false);
                // setBillerDetails(billerDetails);
            }
        } catch (error) {
            console.error("error fetching data", error);
        }
    }

    async function updateMerchantDetails() {
        setLoading(true);
        if (merchantId === null) {
            console.log("merchantId is null");
        } else {
            const merchantRef = doc(db, "merchant", merchantId);
            console.log(merchantRef);
            const locationRef = doc(db, "businessLocation", merchantLocationId);
            await updateDoc(merchantRef, merchantDetails);
            await updateDoc(locationRef, merchantLocation);
        }
    }

    const value: MerchantContextValue = {
        merchantDetails,
        setMerchantDetails,
        merchantLocationId,
        setMerchantLocationId,
        merchantId,
        setMerchantId,
        merchantLocation,
        setMerchantLocation,
        merchantPaymentDetails,
        setMerchantPaymentDetails,
        allMerchants,
        setAllMerchants,
        selectorOptions,
        setSelectorOptions,
        getMerchantDetails,
        createMerchant,
        getMerchantIndex,
        updateMerchantDetails,
        loading,
        setLoading,
    };

    return (
        <BillerDetailsContext.Provider value={value}>
            {children}
        </BillerDetailsContext.Provider>
    );
};
