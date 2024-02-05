import {
    BillerContextValue,
    ProfileContextValue,
    useBillerContext,
    useProfileContext,
} from "@/app/context";
import { BuyerType, LocationType } from "@/app/types";
import React, {
    Dispatch,
    FC,
    SetStateAction,
    useEffect,
    useState,
} from "react";
import { SingleValue } from "react-select";
import AsyncCreatableSelect from "react-select/async-creatable";
import CreatableSelect from "react-select/creatable";

export interface SelectorOptions {
    readonly value: string;
    readonly label: string;
}
// const testOptions: SelectorOptions[] = [
//     { value: "129tgakdlfjsf0-15i12hdasf", label: "Business One" },
//     { value: "abc123def456ghi789", label: "XYZ Corporation" },
//     { value: "qwerty098765", label: "Alpha Solutions" },
//     { value: "9876lkjh5432zxcv", label: "Innovate Technologies" },
//     { value: "pqrst4567uvw890", label: "Global Innovations Ltd." },
// ];

export interface BillerSelectorProps {
    initOptions?: SelectorOptions[];
    setState?: Dispatch<SetStateAction<string>>;
    defaultValue?: string;
}

export const BillerSelector: FC<BillerSelectorProps> = ({
    initOptions,
    setState,
    defaultValue,
}) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [options, setOptions] = useState<SelectorOptions[]>(initOptions!);
    const [value, setValue] = useState<SelectorOptions | null>();
    const { billerDetails, createBiller } =
        useBillerContext() as BillerContextValue;
    const { uid } = useProfileContext() as ProfileContextValue;

    // value = firestore id, we let firestore handle id generation on creation
    const createOption = (label: string) => ({
        label: label,
        value: label,
    });

    const handleClick = (newValue: SingleValue<SelectorOptions>) => {
        if (setState) {
            setState(newValue!.value as string);
            setValue(newValue);
        }
    };

    const handleCreate = (inputValue: string) => {
        setIsLoading(true);
        setTimeout(() => {
            const newOption = createOption(inputValue);
            setIsLoading(false);
            setOptions((prev) => [...prev, newOption]);
            setValue(newOption);
        }, 1000);
        const payload = billerDetails;
        createBiller(payload, uid);
    };

    return (
        <CreatableSelect
            defaultInputValue={defaultValue}
            isClearable
            isDisabled={isLoading}
            isLoading={isLoading}
            onChange={(newValue) => handleClick(newValue)}
            onCreateOption={handleCreate}
            options={options}
            value={value}
        ></CreatableSelect>
    );
};

export interface StateSelectorProps {
    initOptions?: SelectorOptions[];
    setState?: Dispatch<SetStateAction<Partial<LocationType>>>;
    defaultValue?: string;
}

export const StateSelector: FC<StateSelectorProps> = ({
    initOptions,
    setState,
    defaultValue,
}) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [value, setValue] = useState<SelectorOptions | null>();

    const options = [
        { value: "NSW", label: "NSW" },
        { value: "VIC", label: "VIC" },
        { value: "QLD", label: "QLD" },
        { value: "WA", label: "WA" },
        { value: "SA", label: "SA" },
        { value: "TAS", label: "TAS" },
        { value: "NT", label: "NT" },
    ];

    const handleClick = (newValue: SingleValue<SelectorOptions>) => {
        if (setState) {
            setState((prevOption) => ({
                ...prevOption,
                state: newValue!.value,
            }));
            setValue(newValue);
        }
    };
    return (
        <CreatableSelect
            isClearable
            isDisabled={isLoading}
            isLoading={isLoading}
            onChange={(newValue) => handleClick(newValue)}
            options={options}
            value={value}
            defaultInputValue={defaultValue}
        />
    );
};
