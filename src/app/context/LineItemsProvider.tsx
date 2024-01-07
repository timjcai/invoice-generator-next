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
import { LineItemsType } from "../types";

// InvoiceContextValue Type
export interface LineItemsContextValue {
    lineItems: Partial<LineItemsType>[];
    setLineItems: Dispatch<SetStateAction<Partial<LineItemsType>[]>>;
}

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
    const [lineItems, setLineItems] = useState<Partial<LineItemsType>[]>([]);

    const value: LineItemsContextValue = {
        lineItems,
        setLineItems,
    };

    return (
        <LineItemsContext.Provider value={value}>
            {children}
        </LineItemsContext.Provider>
    );
};
