"use client";

import React, { FC } from "react";
import { Navbar } from "../components/Navigation";
import { SubheadlineBadge } from "../components/common";
import { Icon } from "../components/UI";

const page = () => {
    const features = [
        "Customizable Templates",
        "Automated Invoice Generation",
        "Itemized Billing",
        "Tax Calculation",
        "Multiple Currency Support",
        "Merchant Details Saved",
        "Invoice Tracking",
        "Recurring Invoices",
        "Expensive Tracking",
        "Data Security",
    ];
    const features1 = [
        <Icon label="included" />,
        <Icon label="included" />,
        <Icon label="included" />,
        <Icon label="included" />,
        <Icon label="notincluded" />,
        <Icon label="notincluded" />,
        <Icon label="notincluded" />,
        <Icon label="notincluded" />,
        <Icon label="notincluded" />,
        <Icon label="notincluded" />,
    ];
    const features2 = [
        <Icon label="included" />,
        <Icon label="included" />,
        <Icon label="included" />,
        <Icon label="included" />,
        <Icon label="included" />,
        <Icon label="included" />,
        <Icon label="notincluded" />,
        <Icon label="notincluded" />,
        <Icon label="notincluded" />,
        <Icon label="notincluded" />,
    ];
    const features3 = [
        <Icon label="included" />,
        <Icon label="included" />,
        <Icon label="included" />,
        <Icon label="included" />,
        <Icon label="included" />,
        <Icon label="included" />,
        <Icon label="included" />,
        <Icon label="included" />,
        <Icon label="included" />,
        <Icon label="included" />,
    ];

    return (
        <div className="flex flex-col items-center h-full w-screen bg-[#F3F1EC]">
            <Navbar />
            <div className="flex flex-col justify-center items-center h-[320px]">
                <SubheadlineBadge
                    label="Pricing"
                    color="white"
                    bgcolor="orange"
                />
                <h2 className="text-4xl font-bold">Two plans, two prices.</h2>
                <h2 className="text-4xl font-bold mb-4"> No hidden fees</h2>
                <p>How many invoices are you creating per month?</p>
            </div>
            <div className="flex flex-row w-[90vw] mb-20">
                <div
                    id="col1"
                    className="flex w-[20vw] justify-start min-w-[260px]"
                >
                    <div className="flex flex-col justify-start p-4">
                        <form>
                            <h3 className="text-2xl font-semibold mb-4">
                                Pick your plan
                            </h3>
                            <div className="flex gap-2 justify-start items-center h-[32px]">
                                <input
                                    type="radio"
                                    id="monthly"
                                    name="billing"
                                ></input>
                                <label>Monthly billing</label>
                            </div>
                            <div className="flex gap-2 justify-start items-center relative h-[32px]">
                                <input
                                    type="radio"
                                    id="annual"
                                    name="billing"
                                ></input>
                                <div className="flex justify-center items-center gap-4">
                                    <label>Annual billing</label>
                                    <div className="absolute -right-[58px] top-[3px]">
                                        <SubheadlineBadge
                                            label={"save 20%"}
                                            color="orange"
                                            bgcolor="orange"
                                        />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div
                    id="col2"
                    className="flex flex-col w-[25vw] border-2 rounded-xl p-4 me-2 bg-[#DAE6FD]"
                >
                    <h3 className="text-2xl font-semibold mb-4">Basic</h3>
                    <p className="text-md font-semibold mb-4">
                        For freelancers and small businesses needing simple
                        invoicing.
                    </p>
                    <p className="mb-12">
                        Create and send professional invoices with ease. Track
                        payments and stay organized. Perfect for freelancers and
                        small businesses looking for a simple invoicing
                        solution.
                    </p>
                    <p className="text-3xl font-bold mb-4">Free</p>
                    <div className="flex justify-center">
                        <button className="px-4 py-2 border-2 rounded-lg w-[150px]">
                            Get started
                        </button>
                    </div>
                </div>
                <div
                    id="col3"
                    className="flex flex-col w-[25vw] border-2  rounded-xl p-4 me-2 bg-[#DADFD9]"
                >
                    <h3 className="text-2xl font-semibold mb-4">Premium</h3>
                    <p className="text-md font-semibold mb-4">
                        Advanced customization and priority support for
                        businesses.
                    </p>
                    <p className="mb-12">
                        Unlock advanced customization, priority support, and
                        additional features like recurring invoices and expense
                        tracking. Streamline your invoicing process and elevate
                        your business.
                    </p>
                    <p className="text-3xl font-bold mb-4">$5/mo</p>
                    <div className="flex justify-center">
                        <button className="px-4 py-2 border-2 rounded-lg w-[150px]">
                            Choose Plan
                        </button>
                    </div>
                </div>
                <div
                    id="col3"
                    className="flex flex-col w-[25vw] border-2  rounded-xl p-4 me-2 bg-[#FBE9D1]"
                >
                    <h3 className="text-2xl font-semibold mb-4">Teams</h3>
                    <p className="text-md font-semibold mb-4">
                        Collaborative features for businesses with multiple
                        users.
                    </p>
                    <p className="mb-12">
                        Empower your team with collaborative features, such as
                        team invoicing and shared payment tracking. Ideal for
                        businesses with multiple users managing invoices and
                        finances together.
                    </p>
                    <p className="text-3xl font-bold mb-4">Contact Us</p>
                    <div className="flex justify-center">
                        <button className="px-4 py-2 border-2 rounded-lg w-[150px] text-center">
                            Contact Us
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex flex-row w-[90vw]">
                <div
                    id="col1"
                    className="flex w-[20vw] justify-start min-w-[260px]"
                >
                    <div className="flex flex-col justify-start p-4">
                        <h3 className="text-2xl font-semibold mb-4 h-[48px]">
                            Features
                        </h3>
                        {features.map((item) => (
                            <FeatureRow label={item} />
                        ))}
                    </div>
                </div>
                <div
                    id="col2"
                    className="flex flex-col w-[25vw] border-2 rounded-xl p-4 me-2 bg-[#DAE6FD]"
                >
                    <h3 className="text-2xl font-semibold mb-4 h-[48px]">
                        Features
                    </h3>
                    <div className="flex flex-col justify-center  items-center">
                        {features1.map((item) => (
                            <FeatureRow label={item} />
                        ))}
                    </div>
                </div>
                <div
                    id="col3"
                    className="flex flex-col w-[25vw] border-2  rounded-xl p-4 me-2 bg-[#DADFD9]"
                >
                    {" "}
                    <h3 className="text-2xl font-semibold mb-4 h-[48px]">
                        Features
                    </h3>
                    <div className="flex flex-col justify-center  items-center">
                        {features2.map((item) => (
                            <FeatureRow label={item} />
                        ))}
                    </div>
                </div>
                <div
                    id="col3"
                    className="flex flex-col w-[25vw] border-2  rounded-xl p-4 me-2 bg-[#FBE9D1]"
                >
                    {" "}
                    <h3 className="text-2xl font-semibold mb-4 h-[48px]">
                        Features
                    </h3>
                    <div className="flex flex-col justify-center  items-center">
                        {features3.map((item) => (
                            <FeatureRow label={item} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default page;

type FeatureRowProps = {
    label: string | React.ReactNode;
};

const FeatureRow: FC<FeatureRowProps> = ({ label }) => {
    return (
        <div className="flex justify-start items-center h-[32px]">{label}</div>
    );
};
