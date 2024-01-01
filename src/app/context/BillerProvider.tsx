import { ProviderProps } from ".";
import { BuyerType } from "../types";
import { FC, createContext, useContext, useState } from "react";

export interface BillerContextValue {
    billerDetails: Partial<BuyerType> | undefined;
    setBillerDetails: (
        prevState:
            | Partial<BuyerType>
            | undefined
            | ((
                  prevState: Partial<BuyerType> | undefined
              ) => Partial<BuyerType> | undefined)
    ) => void;
    getBillerDetails: (uid: string) => void;
    updateProfileDetails: () => void;
    uid: string;
    loading: boolean;
}

export const BillerDetailsContext = createContext<
    BillerContextValue | undefined
>(undefined);

export function useBillerContext() {
    return useContext(BillerDetailsContext);
}

export const BillerProvider: FC<ProviderProps> = ({ children }) => {
    const [billerProfileDetials, setBillerProfileDetails] =
        useState<Partial<BuyerType>>();
    const [loading, setLoading] = useState<boolean>(true);
    const value: BillerContextValue = {};

    return (
        <BillerDetailsContext.Provider value={value}>
            {children}
        </BillerDetailsContext.Provider>
    );
};
