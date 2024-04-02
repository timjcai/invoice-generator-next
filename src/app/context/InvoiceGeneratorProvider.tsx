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
    InvoiceContextValue,
    LineItemsContextValue,
    MerchantContextValue,
    PaymentNotesContextValue,
    ProfileContextValue,
    ProviderProps,
    useInvoiceDetailContext,
    useLineItemsContext,
    useMerchantContext,
    usePaymentNotesContext,
    useProfileContext,
} from ".";
import {
    GeneratorType,
    InvoiceDetailType,
    LineItemsType,
    LocationType,
} from "../types";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { generateInvoice } from "../utils";
import { db } from "../server";

export interface InvoiceGeneratorContextValue {
    invoiceGenerator: Partial<GeneratorType>;
    setInvoiceGenerator: Dispatch<SetStateAction<Partial<GeneratorType>>>;
    currentInvoiceNumber: number | undefined;
    saveInvoiceToFirebase: (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => void;

    getTotalInvoices: (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => void;
}

export const InvoiceGeneratorContext = createContext<
    InvoiceGeneratorContextValue | undefined
>(undefined);

export function useInvoiceGeneratorContext() {
    return useContext(InvoiceGeneratorContext);
}

const InvoiceGeneratorProvider: FC<ProviderProps> = ({ children }) => {
    const [invoiceGenerator, setInvoiceGenerator] = useState<
        Partial<GeneratorType>
    >({});
    const [currentInvoiceNumber, setCurrentInvoiceNumber] = useState<
        number | undefined
    >(undefined);

    const {
        profileDetails,
        locationDetails: sellerLocation,
        paymentDetails,
        uid,
        loading,
    } = useProfileContext() as ProfileContextValue;
    const { merchantDetails, merchantLocation, merchantId } =
        useMerchantContext() as MerchantContextValue;
    const { invoiceDetails } = useInvoiceDetailContext() as InvoiceContextValue;
    const { notes, paymentNotes } =
        usePaymentNotesContext() as PaymentNotesContextValue;
    const { total, subtotal, taxrate, allItems } =
        useLineItemsContext() as LineItemsContextValue;

    useEffect(() => {
        getTotalInvoices();
    }, [uid, merchantId]);

    async function saveInvoiceToFirebase(
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) {
        e.preventDefault;
        const currentInvoiceDetails: GeneratorType = {
            profileDetails: {
                ...profileDetails,
                businessLocation: sellerLocation as LocationType,
            },
            merchantDetails: {
                ...merchantDetails,
                businessLocation: merchantLocation as LocationType,
            },
            invoiceDetails: invoiceDetails,
            paymentAndNotes: {
                paymentDetails: paymentDetails,
                notes: notes,
                paymentNotes: paymentNotes,
            },
            lineItems: allItems as LineItemsType[],
            totals: {
                subtotal: subtotal,
                taxrate: taxrate,
                total: total,
                amountPaid: 0,
            },
        };
        console.log(currentInvoiceDetails);
        try {
            const invoiceRef = await addDoc(collection(db, "invoiceData"), {
                ...currentInvoiceDetails,
                associatedUser: uid,
                merchantId: merchantId,
            });
            console.log(`${invoiceRef}`);
            getTotalInvoices();
            // await generateInvoice(currentInvoiceDetails);
        } catch (error) {
            console.error("error in creating biller", error);
        }
    }

    // add additional functions here
    async function getTotalInvoices() {
        const q = query(
            collection(db, "invoiceData"),
            where("associatedUser", "==", uid),
            where("merchantId", "==", merchantId)
        );
        const querySnapshot = await getDocs(q);
        setCurrentInvoiceNumber(querySnapshot.docs.length);
    }

    const value: InvoiceGeneratorContextValue = {
        invoiceGenerator,
        setInvoiceGenerator,
        currentInvoiceNumber,
        saveInvoiceToFirebase,
        getTotalInvoices,
    };

    return (
        <InvoiceGeneratorContext.Provider value={value}>
            {children}
        </InvoiceGeneratorContext.Provider>
    );
};

export default InvoiceGeneratorProvider;
