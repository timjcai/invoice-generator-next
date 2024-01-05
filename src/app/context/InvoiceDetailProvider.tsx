"use client";
import React, {
    Dispatch,
    FC,
    SetStateAction,
    createContext,
    useContext,
    useState,
} from "react";
import { ProviderProps } from ".";
import { InvoiceDetailType } from "../types";

// InvoiceContextValue Type

export interface InvoiceContextValue {
    invoiceDetails: Partial<InvoiceDetailType>;
    setInvoiceDetails: Dispatch<SetStateAction<Partial<InvoiceDetailType>>>;
}
// CreateContext

export const InvoiceDetailContext = createContext<
    InvoiceContextValue | undefined
>(undefined);

export function useInvoiceDetailContext() {
    return useContext(InvoiceDetailContext);
}

// Provider
// what state held?
//  what functions exposed
// CRUD

export const InvoiceDetailProvider: FC<ProviderProps> = ({ children }) => {
    const [invoiceDetails, setInvoiceDetails] = useState<
        Partial<InvoiceDetailType>
    >({ workDate: new Date() });
    const value: InvoiceContextValue = { invoiceDetails, setInvoiceDetails };

    return (
        <InvoiceDetailContext.Provider value={value}>
            {children}
        </InvoiceDetailContext.Provider>
    );
};
