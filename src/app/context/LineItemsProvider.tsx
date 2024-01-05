"use client";
import React, { FC, useContext, createContext } from "react";
import { ProviderProps } from ".";

// InvoiceContextValue Type
export interface LineItemsContextValue {}

// CreateContext
export const LineItemsContext = createContext<
    LineItemsContextValue | undefined
>(undefined);

export function useLineItemsContext() {
    return useContext(LineItemsContext);
}

// Provider
// what state held?
//  what functions exposed
// CRUD

export const LineItemsProvider: FC<ProviderProps> = ({ children }) => {
    const value: LineItemsContextValue = {};
    return (
        <LineItemsContext.Provider value={value}>
            {children}
        </LineItemsContext.Provider>
    );
};
