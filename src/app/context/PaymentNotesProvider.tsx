"use client";
import React, { FC, useContext, createContext } from "react";
import { ProviderProps } from ".";

// InvoiceContextValue Type
export interface PaymentNotesContextValue {}

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
    const value: PaymentNotesContextValue = {};
    return (
        <PaymentNotesContext.Provider value={value}>
            {children}
        </PaymentNotesContext.Provider>
    );
};
