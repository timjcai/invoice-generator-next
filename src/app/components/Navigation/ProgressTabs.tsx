import React, { ReactElement, useState } from "react";
import { Icon } from "../UI";

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
    } = useMultistepForm([<p>1</p>, <p>2</p>, <p>3</p>, <p>4</p>, <p>5</p>]);

    return (
        <div className="flex flex-row">
            {!isFirstStep && (
                <button onClick={back}>
                    <Icon label="back" />
                </button>
            )}
            <div>
                <p>step {currentStepIndex}</p>
                <p>{step}</p>
            </div>
            {!isLastStep && (
                <button onClick={next}>
                    <Icon label="next" />
                </button>
            )}
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
