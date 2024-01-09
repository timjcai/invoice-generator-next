"use client";
import React, {
    FC,
    useContext,
    createContext,
    useState,
    Dispatch,
    SetStateAction,
} from "react";
import { ProviderProps } from ".";
import {
    BankTransferType,
    PaymentDetailType,
    PaymentNotesType,
} from "../types";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../server";

// InvoiceContextValue Type
export interface PaymentNotesContextValue {
    paymentDetails: Partial<BankTransferType>;
    setPaymentDetails: Dispatch<SetStateAction<Partial<BankTransferType>>>;
    paymentDetailId: string;
    setPaymentDetailId: Dispatch<SetStateAction<string>>;
    notes: Partial<string>;
    setNotes: Dispatch<SetStateAction<Partial<string>>>;
    paymentNotes: Partial<string>;
    setPaymentNotes: Dispatch<SetStateAction<Partial<string>>>;
    getPaymentNotes: (uid: string) => void;
}

// CreateContext
export const PaymentNotesContext = createContext<
    PaymentNotesContextValue | undefined
>(undefined);

export function usePaymentNotesContext() {
    return useContext(PaymentNotesContext);
}

// Provider
// what state held?
//  what functions exposed
// CRUD

export const PaymentNotesProvider: FC<ProviderProps> = ({ children }) => {
    const [paymentDetails, setPaymentDetails] = useState<
        Partial<BankTransferType>
    >({});
    const [paymentDetailId, setPaymentDetailId] = useState<string>("");
    const [notes, setNotes] = useState<string>("");
    const [paymentNotes, setPaymentNotes] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);

    async function getPaymentNotes(uid: string) {
        try {
            const documentRef = doc(db, "paymentDetails", `${uid}`);
            const paymentDetailQuery = await getDoc(documentRef);
            const documentData = paymentDetailQuery.data();
            console.log(documentData);
            setPaymentDetailId(paymentDetailQuery.id);
        } catch (error) {
            console.error("error fetching data", error);
        }
    }

    const value: PaymentNotesContextValue = {
        paymentDetails,
        setPaymentDetails,
        paymentDetailId,
        setPaymentDetailId,
        notes,
        setNotes,
        paymentNotes,
        setPaymentNotes,
        getPaymentNotes,
    };
    return (
        <PaymentNotesContext.Provider value={value}>
            {children}
        </PaymentNotesContext.Provider>
    );
};
