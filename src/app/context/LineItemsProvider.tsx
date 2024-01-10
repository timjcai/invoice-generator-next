"use client";
import React, {
    FC,
    useContext,
    createContext,
    useState,
    Dispatch,
    SetStateAction,
    useEffect,
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
    subtotal: number;
    setSubtotal: Dispatch<SetStateAction<number>>;
    taxrate: number;
    setTaxrate: Dispatch<SetStateAction<number>>;
    total: number;
    setTotal: Dispatch<SetStateAction<number>>;
    calculateSubtotal: () => number;
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
    const [subtotal, setSubtotal] = useState<number>(0);
    const [taxrate, setTaxrate] = useState<number>(0.1);
    const [total, setTotal] = useState<number>(0);

    useEffect(() => {
        setSubtotal(calculateSubtotal());
    }, [allItems]);

    useEffect(() => {
        setTotal(calculateTotal());
    }, [subtotal]);

    function calculateSubtotal(): number {
        let amounts: number[] = [];
        allItems.forEach((line) => {
            amounts.push(line.rate! * line.quantity!);
        });
        const sum = amounts.reduce(
            (accumulator, currentValue) => accumulator + currentValue,
            0
        );
        return sum;
    }

    function calculateTotal(): number {
        return subtotal * (1 + taxrate);
    }

    const value: LineItemsContextValue = {
        counter,
        setCounter,
        currentLine,
        setCurrentLine,
        allItems,
        setAllItems,
        subtotal,
        setSubtotal,
        total,
        setTotal,
        taxrate,
        setTaxrate,
        calculateSubtotal,
    };

    return (
        <LineItemsContext.Provider value={value}>
            {children}
        </LineItemsContext.Provider>
    );
};
