import React, { ReactElement, useState } from "react";
import { Icon } from "../UI";
import ProfileForm from "../Forms/ProfileForm";
import {
    InvoiceDetailsForm,
    LineItemForm,
    MerchantForm,
    NotesForm,
} from "../Forms";
import { IconType, LineItemsType, LocationType } from "@/app/types";
import { generateInvoice } from "@/app/utils";
import {
    InvoiceContextValue,
    LineItemsContextValue,
    MerchantContextValue,
    PaymentNotesContextValue,
    ProfileContextValue,
    useInvoiceDetailContext,
    useLineItemsContext,
    useMerchantContext,
    usePaymentNotesContext,
    useProfileContext,
} from "@/app/context";

export const ProgressTabs = () => {
    const {
        steps,
        currentStepIndex,
        isFirstStep,
        isLastStep,
        back,
        next,
        step,
        goTo,
    } = useMultistepForm([
        <div className="flex flex-row" key="Profile">
            <Icon label="Profile" />
            Profile
        </div>,
        <div className="flex flex-row" key="Merchant">
            <Icon label="Merchant" />
            Merchant
        </div>,
        <div className="flex flex-row" key="Invoice Details">
            <Icon label="Invoice Details" />
            Invoice Details
        </div>,
        <div className="flex flex-row" key="Payment & Notes">
            <Icon label="Payment & Notes" />
            Payment & Notes
        </div>,
        <div className="flex flex-row" key="Line Items">
            <Icon label="Line Items" />
            Line Items
        </div>,
    ]);

    const {
        profileDetails,
        locationDetails: sellerLocation,
        setProfileDetails,
        getProfileDetails,
        paymentDetails,
        uid,
        loading,
    } = useProfileContext() as ProfileContextValue;
    const { merchantDetails, merchantLocation } =
        useMerchantContext() as MerchantContextValue;
    const { invoiceDetails } = useInvoiceDetailContext() as InvoiceContextValue;
    const { notes, paymentNotes } =
        usePaymentNotesContext() as PaymentNotesContextValue;
    const { total, subtotal, taxrate, allItems } =
        useLineItemsContext() as LineItemsContextValue;

    const [controller, setController] = useState<IconType>(
        step.key as IconType
    );
    let element;

    async function handleNextButtonClick() {
        const nextStep = currentStepIndex + 1;
        next();
        setController(steps[nextStep].key as IconType);
    }

    const handleBackButtonClick = () => {
        const prevStep = currentStepIndex - 1;
        back();
        setController(steps[prevStep].key as IconType);
    };

    switch (controller) {
        case "Profile":
            element = <ProfileForm />;
            break;
        case "Merchant":
            element = <MerchantForm />;
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
        <div className="bg-white rounded-lg">
            <div className="flex flex-col w-full py-3 px-4">
                <div className="flex flex-row justify-between mb-2">
                    {!isFirstStep ? (
                        <button
                            onClick={handleBackButtonClick}
                            className="text-xl"
                        >
                            <Icon label="back" />
                        </button>
                    ) : (
                        <button className="w-8"></button>
                    )}
                    <div className="text-xl font-semibold">{step}</div>
                    {!isLastStep ? (
                        <button
                            onClick={handleNextButtonClick}
                            className="text-xl"
                        >
                            <Icon label="next" />
                        </button>
                    ) : (
                        <button
                            className="text-xl"
                            onClick={(e) =>
                                generateInvoice({
                                    profileDetails: {
                                        ...profileDetails,
                                        businessLocation:
                                            sellerLocation as LocationType,
                                    },
                                    merchantDetails: {
                                        ...merchantDetails,
                                        businessLocation:
                                            merchantLocation as LocationType,
                                    },
                                    invoiceDetails: invoiceDetails,
                                    paymentAndNotes: {
                                        paymentDetails: paymentDetails,
                                        notes: notes,
                                        paymentNotes: paymentNotes,
                                    },
                                    lineItems: allItems as LineItemsType[],
                                    totals: {
                                        subtotal: subtotal,
                                        taxrate: taxrate,
                                        total: total,
                                        amountPaid: 0,
                                    },
                                })
                            }
                        >
                            <Icon label="download" />
                        </button>
                    )}
                </div>
                <div className={`grid grid-cols-5 gap-4 h-[20px]`}>
                    {steps.map((item, index) => (
                        <div>
                            {currentStepIndex > index ? (
                                <div
                                    className="bg-black h-3 col-span-1 rounded-xl"
                                    key={index}
                                ></div>
                            ) : (
                                <div
                                    className="bg-[#C7DBEB] border-[1px] h-3 col-span-1 rounded-xl"
                                    key={index}
                                ></div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <div className="my-4 flex justify-center items-center bg-white p-4 w-full">
                {element}
            </div>
        </div>
    );
};

export function useMultistepForm(steps: ReactElement[]) {
    const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

    function next() {
        setCurrentStepIndex((i) => {
            if (i >= steps.length - 1) return i;
            return i + 1;
        });
    }

    function back() {
        setCurrentStepIndex((i) => {
            if (i <= 0) return i;
            return i - 1;
        });
    }

    function goTo(index: number) {
        setCurrentStepIndex(index);
    }

    return {
        currentStepIndex,
        step: steps[currentStepIndex],
        steps,
        next,
        back,
        goTo,
        isFirstStep: currentStepIndex === 0,
        isLastStep: currentStepIndex === steps.length - 1,
    };
}
