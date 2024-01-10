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
    total: number;
    setTotal: Dispatch<SetStateAction<number>>;
    calculateTotal: () => number;
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
    const [total, setTotal] = useState<number>(0);

    useEffect(() => {
        setTotal(calculateTotal());
    }, [allItems]);

    function calculateTotal(): number {
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

    const value: LineItemsContextValue = {
        counter,
        setCounter,
        currentLine,
        setCurrentLine,
        allItems,
        setAllItems,
        total,
        setTotal,
        calculateTotal,
    };

    return (
        <LineItemsContext.Provider value={value}>
            {children}
        </LineItemsContext.Provider>
    );
};
