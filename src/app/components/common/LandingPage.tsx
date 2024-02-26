import React, { FC } from "react";
import { Icon } from "../UI";
import { IconType } from "@/app/types";
import { SubheadlineBadge } from "./Badge";

export const LandingPage = () => {
    return (
        <div>
            <section className="grid grid-cols-2 gap-10 items-center justify-center flex-col mx-4 md:mx-[100px] h-[400px] mb-[5vh]">
                <div className="flex flex-col justify-start">
                    <SubheadlineBadge
                        label={"Try Now for free"}
                        bgcolor="orange"
                    />
                    <h1 className="text-[2.375rem] leading-[2.75rem] color-[#0e101a] font-bold mb-[2vh]">
                        Free Invoice Generator
                    </h1>
                    <p className="mb-[2vh] text-[1.125rem]">
                        Instantly generate invoices. <br />
                        Saving time for the important things
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                        {" "}
                        <button className="border-2 bg-[#212122] border-[#212122] py-1 text-white font-light rounded-md px-6 justify-center items-center flex h-[40px] mb-2">
                            Sign Up
                        </button>
                        <button className="border-2 bg-[#212122] border-[#212122] py-1 text-white font-light rounded-md px-6 justify-center items-center flex h-[40px] mb-2">
                            <Icon label="Google" />
                            Sign Up with Google
                        </button>
                    </div>
                </div>
                <div className="bg-[#F5EEE6] h-full w-full rounded-xl flex justify-center items-center">
                    <h1>demo</h1>
                </div>
            </section>
            <section>
                <div className="flex flex-col justify-center items-center mb-20">
                    <h3 className="text-2xl font-semibold mb-2">
                        Trusted by 100+ Small Businesses
                    </h3>
                    <p className="text-lg mb-2">designed for</p>
                    <div className="grid grid-cols-4 gap-24 justify-between items-center mb-24 px-[8vw]">
                        <Card label="Designers" icon="designers" />
                        <Card label="Marketers" icon="marketers" />
                        <Card label="Trades & Services" icon="trades" />
                        <Card label="Tech Contractors" icon="techcontractors" />
                    </div>
                </div>
            </section>
        </div>
    );
};

type CardType = {
    label: string;
    icon: IconType;
};

const Card: FC<CardType> = ({ label, icon }) => {
    return (
        <div className="flex flex-col justify-center items-center group rounded-lg shadow-globe-product-card bg-white p-6 inline-block shrink-0 snap-center first:ml-[var(--margin)] last:mr-[var(--margin)] md:first:ml-0 md:last:mr-0 md:w-1/4-gutter">
            <div className="bg-[#E6F2FF] mb-7 flex h-14 w-14 place-items-center rounded-full justify-center relative -left-2 text-xl">
                <Icon label={icon} />
            </div>
            <h3 className="text-lg font-semibold mb-2">{label}</h3>
        </div>
    );
};
