import React from "react";
import { Icon } from "../UI";
import { SaveDetailsAnimation } from "./Animations";

export const SectionWide1 = () => {
    return (
        <section
            className="flex flex-row relative rounded-[24px] bg-[var(--lush-green)] text-white h-[600px]"
            style={{ boxShadow: "4px 4px 30px rgba(0, 0, 0, 0.3)" }}
        >
            <div className="flex flex-col justify-between p-[56px] basis-1/2">
                <span className="mb-[212px]">
                    <Icon
                        label="save"
                        style={{ height: "32px", width: "32px" }}
                    />
                </span>
                <div className="flex flex-col">
                    <h3 className="tracking-tight text-[48px] font-semibold">
                        Save client business details
                    </h3>
                    <p className="text-slate-600">Create once, reuse forever</p>
                </div>
            </div>
            <SaveDetailsAnimation />
            {/* <div className="absolute">Image</div> */}
        </section>
    );
};

export const SectionWide2 = () => {
    return (
        <section
            className="flex flex-row relative rounded-[24px] bg-[var(--yellow-nectarine)] text-black"
            style={{ boxShadow: "4px 4px 30px rgba(0, 0, 0, 0.3)" }}
        >
            <div className="flex flex-col justify-between p-[56px] basis-1/2">
                <span className="mb-[212px]">
                    <Icon
                        label="bulk"
                        style={{ height: "32px", width: "32px" }}
                    />
                </span>
                <div className="flex flex-col">
                    <h3 className="tracking-tight text-[48px] font-semibold">
                        Bulk create invoices
                    </h3>
                    <p className="text-slate-600">Create once, reuse forever</p>
                </div>
            </div>
            <div className="absolute bg-black opacity-50 w-full h-full rounded-2xl flex justify-center items-center">
                <div className="text-white font-bold text-md">Coming Soon</div>
            </div>
        </section>
    );
};

export const SectionLong1 = () => {
    return (
        <section
            className="relative rounded-[24px] bg-[var(--sky-blue)] flex flex-col justify-between p-[56px] basis-1/2 text-black min-h-[640px] w-[504px]"
            style={{ boxShadow: "4px 4px 30px rgba(0, 0, 0, 0.3)" }}
        >
            <span className="mb-[212px]">
                <Icon
                    label="template"
                    style={{ height: "32px", width: "32px" }}
                />
            </span>
            <div className="flex flex-col">
                <h3 className="tracking-tight text-[48px] font-semibold">
                    Auto Generated
                </h3>
                <p className="text-slate-600">
                    Easy to track, invoicing history
                </p>
            </div>
        </section>
    );
};

export const SectionLong2 = () => {
    return (
        <section
            className="relative rounded-[24px] bg-[--blush-pink] flex flex-col justify-between p-[56px] basis-1/2 text-black min-h-[640px] w-[504px]"
            style={{ boxShadow: "4px 4px 30px rgba(0, 0, 0, 0.3)" }}
        >
            <span className="mb-[212px]">
                <Icon
                    label="calculate"
                    style={{ height: "32px", width: "32px" }}
                />
            </span>
            <div className="flex flex-col">
                <h3 className="tracking-tight text-[48px] font-semibold">
                    Calculated for you
                </h3>
                <p className="text-slate-600">
                    Automatically calculate your subtotals and tax rates
                </p>
            </div>
        </section>
    );
};

export const FAQSection = () => {
    return (
        <section
            className="rounded-[24px] bg-[#F4F4F5] text-black p-[56px]"
            style={{ boxShadow: "4px 4px 30px rgba(0, 0, 0, 0.3)" }}
        >
            <h3 className="tracking-tight text-[32px] font-semibold">FAQs</h3>
            <p className="tracking-tight text-[24px] text-[#999CA6]">
                Still have questions?
            </p>
            <button>Contact Us</button>
        </section>
    );
};
