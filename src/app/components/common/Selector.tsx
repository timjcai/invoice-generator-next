import { useBillerContext, useProfileContext } from "@/app/context";
import React, { FC, useEffect, useState } from "react";
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

export interface SelectorProps {
    initOptions?: SelectorOptions[];
}

export const Selector: FC<SelectorProps> = ({ initOptions }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [options, setOptions] = useState<SelectorOptions[]>(initOptions!);
    const [value, setValue] = useState<SelectorOptions | null>();
    const { billerDetails, createBiller } = useBillerContext();
    const { uid } = useProfileContext();

    // value = firestore id, we let firestore handle id generation on creation
    const createOption = (label: string) => ({
        label: label,
        value: label,
    });

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
            isClearable
            isDisabled={isLoading}
            isLoading={isLoading}
            onChange={(newValue) => setValue(newValue)}
            onCreateOption={handleCreate}
            options={options}
            value={value}
        ></CreatableSelect>
    );
};
