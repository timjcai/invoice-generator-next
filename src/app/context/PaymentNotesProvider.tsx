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

// InvoiceContextValue Type
export interface PaymentNotesContextValue {
    paymentDetails: Partial<BankTransferType>;
    setPaymentDetails: Dispatch<SetStateAction<Partial<BankTransferType>>>;
    notes: Partial<string>;
    setNotes: Dispatch<SetStateAction<Partial<string>>>;
    paymentNotes: Partial<string>;
    setPaymentNotes: Dispatch<SetStateAction<Partial<string>>>;
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
    const [notes, setNotes] = useState<string>("");
    const [paymentNotes, setPaymentNotes] = useState<string>("");

    const value: PaymentNotesContextValue = {
        paymentDetails,
        setPaymentDetails,
        notes,
        setNotes,
        paymentNotes,
        setPaymentNotes,
    };
    return (
        <PaymentNotesContext.Provider value={value}>
            {children}
        </PaymentNotesContext.Provider>
    );
};
