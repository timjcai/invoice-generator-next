import React, { FC } from "react";
import { Icon } from "../UI";
import { IconType } from "@/app/types";
import { SubheadlineBadge } from "../common/Badge";
import { AuthContextValue, useAuth } from "@/app/context";
import Image from "next/image";
import Link from "next/link";
import {
    FAQSection,
    SectionLong1,
    SectionLong2,
    SectionWide1,
    SectionWide2,
} from "./Section";

export const LandingPage = () => {
    const { googleSignIn } = useAuth() as AuthContextValue;

    function handleGoogleSignIn(
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) {
        e.preventDefault();
        googleSignIn();
    }

    return (
        <div>
            <section className="flex flex-col gap-10 items-center justify-center flex-col mx-4 md:mx-[100px] mb-[5vh] max-w-[1032px]">
                {/* <div className="rounded-xl flex justify-center items-center border-[12px] h-fit top-0 w-fit">
                    <Image
                        className="rounded-xl"
                        src="/lp-mainimage3.png"
                        alt="main image"
                        width={700}
                        height={500}
                    />
                </div> */}
                <div className="flex flex-col justify-start items-center">
                    <SubheadlineBadge
                        label={"Try Now for free"}
                        style={{
                            backgroundColor: "var(--avocado)",
                            color: `var(--lush-green)`,
                            opacity: 0.8,
                        }}
                    />
                    <h1 className="text-[2.375rem] leading-[2.75rem] color-[#0e101a] font-bold mb-[2vh] tracking-tight">
                        Free Invoice Generator
                    </h1>
                    <p className="mb-[2vh] text-[1.125rem] text-center tracking-tight">
                        Instantly generate invoices. <br />
                        Saving time for the important things
                    </p>
                    <div className="w-full">
                        <Link href="/dashboard">
                            <button className="border-2 bg-[#212122] border-[#212122] py-1 text-white font-light rounded-md px-6 justify-center items-center flex h-[40px] mb-2 w-full gap-1">
                                <span>Get Started</span>
                                <Icon label="learnmore" />
                            </button>
                        </Link>
                    </div>
                    {/* <div className="grid grid-cols-2 gap-2">
                        {" "}
                        <button className="border-2 bg-[#212122] border-[#212122] py-1 text-white font-light rounded-md px-6 justify-center items-center flex h-[40px] mb-2">
                            <span>Sign Up</span>
                        </button>
                        <button
                            className="flex items-center justify-center border-2 border-[#EDEEEF] px-10 py-2 rounded-md w-[412px]"
                            onClick={(e) => handleGoogleSignIn(e)}
                        >
                            <span>
                                <Icon
                                    label="Google"
                                    style={{ height: "16px", width: "16px" }}
                                />
                            </span>
                            <span>Google</span>
                        </button>
                    </div> */}
                </div>
            </section>
            <section>
                <div className="flex flex-col justify-center items-center mb-20 max-w-[1032px]">
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
            <div className="flex flex-col flex-wrap gap-[24px] mb-[200px]">
                <SectionWide1 />
                <div className="flex flex-row gap-4">
                    <SectionLong1 />
                    <SectionLong2 />
                </div>
                <SectionWide2 />
            </div>
            <FAQSection />
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
