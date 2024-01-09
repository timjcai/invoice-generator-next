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
    counter: number;
    setCounter: Dispatch<SetStateAction<number>>;
    currentLine: Partial<LineItemsType>;
    setCurrentLine: Dispatch<SetStateAction<Partial<LineItemsType>>>;
    allItems: Partial<LineItemsType>[];
    setAllItems: Dispatch<SetStateAction<Partial<LineItemsType>[]>>;
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
    const [counter, setCounter] = useState<number>(0);
    const [currentLine, setCurrentLine] = useState<Partial<LineItemsType>>({
        description: "",
        quantity: 1,
        rate: 0,
    });
    const [allItems, setAllItems] = useState<Partial<LineItemsType>[]>([]);

    const value: LineItemsContextValue = {
        counter,
        setCounter,
        currentLine,
        setCurrentLine,
        allItems,
        setAllItems,
    };

    return (
        <LineItemsContext.Provider value={value}>
            {children}
        </LineItemsContext.Provider>
    );
};
