"use client";
import React, { FC, createContext, useContext } from "react";
import { ProviderProps } from ".";

// InvoiceContextValue Type

export interface InvoiceContextValue {}
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
    const value: InvoiceContextValue = {};

    return (
        <InvoiceDetailContext.Provider value={value}>
            {children}
        </InvoiceDetailContext.Provider>
    );
};
