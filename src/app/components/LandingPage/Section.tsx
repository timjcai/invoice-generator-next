import React from "react";
import { Icon } from "../UI";

export const SectionWide1 = () => {
    return (
        <section className="flex flex-row relative rounded-[24px] bg-[var(--lush-green)] text-white">
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
                    <p className="text-[#b3b6bc]">Create once, reuse forever</p>
                </div>
            </div>
            <div className="absolute">Image</div>
        </section>
    );
};

export const SectionWide2 = () => {
    return (
        <section className="flex flex-row relative rounded-[24px] bg-[var(--yellow-nectarine)] text-black">
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
                    <p className="text-[#b3b6bc]">Create once, reuse forever</p>
                </div>
            </div>
            <div className="absolute">Image</div>
        </section>
    );
};

export const SectionLong1 = () => {
    return (
        <section className="relative rounded-[24px] bg-[var(--sky-blue)] flex flex-col justify-between p-[56px] basis-1/2 text-black min-h-[640px] w-[504px]">
            <span className="mb-[212px]">
                <Icon
                    label="template"
                    style={{ height: "32px", width: "32px" }}
                />
            </span>
            <div className="flex flex-col">
                <h3 className="tracking-tight text-[48px] font-semibold">
                    Create templates
                </h3>
                <p className="text-[#b3b6bc]">Speed up your workflow</p>
            </div>
        </section>
    );
};

export const SectionLong2 = () => {
    return (
        <section className="relative rounded-[24px] bg-[--blush-pink] flex flex-col justify-between p-[56px] basis-1/2 text-black min-h-[640px] w-[504px]">
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
                <p className="text-[white]">
                    Automatically calculate your subtotals and tax rates
                </p>
            </div>
        </section>
    );
};
