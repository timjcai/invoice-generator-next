"use client";

import React, { FC, useState } from "react";
import { Icon } from "../UI";
import { IconType } from "@/app/types";
import ProfileForm from "../Forms/ProfileForm";
import {
    BillerForm,
    InvoiceDetailsForm,
    NotesForm,
    LineItemForm,
} from "../Forms";

export const AppTabs = () => {
    const [controller, setController] = useState<IconType>("Merchant");
    let element;

    const handleButtonClick = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        setController((event.target as HTMLButtonElement).id as IconType);
    };

    switch (controller) {
        case "Profile":
            element = <ProfileForm />;
            break;
        case "Merchant":
            element = <BillerForm />;
            break;
        case "Invoice Details":
            element = <InvoiceDetailsForm />;
            break;
        case "Payment & Notes":
            element = <NotesForm />;
            break;
        case "Line Items":
            element = <LineItemForm />;
            break;
        default:
            element = <LineItemForm />;
    }

    return (
        <>
            <div>
                <div className="border-b border-gray-200 dark:border-gray-700">
                    <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                        <li className="me-2">
                            {controller === "Profile" ? (
                                <TabActive
                                    buttonLabel={"Profile"}
                                    onClickFn={handleButtonClick}
                                />
                            ) : (
                                <TabRegular
                                    buttonLabel={"Profile"}
                                    onClickFn={handleButtonClick}
                                />
                            )}
                        </li>
                        <li className="me-2">
                            {controller === "Merchant" ? (
                                <TabActive
                                    buttonLabel={"Merchant"}
                                    onClickFn={handleButtonClick}
                                />
                            ) : (
                                <TabRegular
                                    buttonLabel={"Merchant"}
                                    onClickFn={handleButtonClick}
                                />
                            )}
                        </li>
                        <li className="me-2">
                            {controller === "Payment & Notes" ? (
                                <TabActive
                                    buttonLabel={"Payment & Notes"}
                                    onClickFn={handleButtonClick}
                                />
                            ) : (
                                <TabRegular
                                    buttonLabel={"Payment & Notes"}
                                    onClickFn={handleButtonClick}
                                />
                            )}
                        </li>
                        <li className="me-2">
                            {controller === "Invoice Details" ? (
                                <TabActive
                                    buttonLabel={"Invoice Details"}
                                    onClickFn={handleButtonClick}
                                />
                            ) : (
                                <TabRegular
                                    buttonLabel={"Invoice Details"}
                                    onClickFn={handleButtonClick}
                                />
                            )}
                        </li>
                        <li className="me-2">
                            {controller === "Line Items" ? (
                                <TabActive
                                    buttonLabel={"Line Items"}
                                    onClickFn={handleButtonClick}
                                />
                            ) : (
                                <TabRegular
                                    buttonLabel={"Line Items"}
                                    onClickFn={handleButtonClick}
                                />
                            )}
                        </li>
                    </ul>
                </div>
            </div>
            <div className="w-[840px] my-4 flex justify-center items-center">
                {element}
            </div>
        </>
    );
};

type TabButton = {
    buttonLabel: IconType;
    onClickFn: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const TabRegular: FC<TabButton> = ({ buttonLabel, onClickFn }) => {
    return (
        <button
            id={buttonLabel}
            className="inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group"
            onClick={onClickFn}
        >
            <Icon label={buttonLabel} />
            {buttonLabel}
        </button>
    );
};

const TabActive: FC<TabButton> = ({ buttonLabel, onClickFn }) => {
    return (
        <button
            id={buttonLabel}
            className="inline-flex items-center justify-center p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group"
            aria-current="page"
            onClick={onClickFn}
        >
            <Icon label={buttonLabel} />
            {buttonLabel}
        </button>
    );
};
