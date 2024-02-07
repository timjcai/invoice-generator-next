import React, { ReactElement, useState } from "react";
import { Icon } from "../UI";
import ProfileForm from "../Forms/ProfileForm";
import {
    BillerForm,
    InvoiceDetailsForm,
    LineItemForm,
    NotesForm,
} from "../Forms";
import { IconType } from "@/app/types";

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
        <div>
            <Icon label="Profile" />
            Profile
        </div>,
        <div>
            <Icon label="Merchant" />
            Merchant
        </div>,
        <div>
            <Icon label="Invoice Details" />
            Invoice Details
        </div>,
        <div>
            <Icon label="Payment & Notes" />
            Payment & Notes
        </div>,
        <div>
            <Icon label="Line Items" />
            Line Items
        </div>,
    ]);
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
        <div className="flex flex-col bg-blue-500 w-full py-1 px-2">
            <div className="flex flex-row justify-between">
                {!isFirstStep ? (
                    <button onClick={back}>
                        <Icon label="back" />
                    </button>
                ) : (
                    <button className="w-8"></button>
                )}
                <div>{step}</div>
                {!isLastStep ? (
                    <button onClick={next}>
                        <Icon label="next" />
                    </button>
                ) : (
                    <button className="w-8"></button>
                )}
            </div>
            <div className={`grid grid-cols-5 gap-4 h-[12px]`}>
                {steps.map((item, index) => (
                    <div>
                        {currentStepIndex > index ? (
                            <div
                                className="bg-black h-2 col-span-1 rounded-lg"
                                key={index}
                            ></div>
                        ) : (
                            <div
                                className="bg-white h-2 col-span-1 rounded-lg"
                                key={index}
                            ></div>
                        )}
                    </div>
                ))}
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
