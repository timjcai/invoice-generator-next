"use client";

import React from "react";
import { Navbar } from "../components/Navigation";

const page = () => {
    return (
        <div className="flex flex-col items-center h-screen w-screen bg-[#F3F1EC]">
            <Navbar />
            <div className="flex flex-col justify-center items-center h-[320px]">
                <p className="text-sm mb-4">Pricing</p>
                <h2 className="text-4xl font-bold">Two plans, two prices.</h2>
                <h2 className="text-4xl font-bold mb-4"> No hidden fees</h2>
                <p>How many invoices are you creating per month?</p>
            </div>
            <div className="flex flex-row w-[90vw]">
                <div id="col1" className="flex w-[15vw] justify-center">
                    <div className="flex flex-col justify-start p-4">
                        <h3 className="text-2xl font-semibold">
                            Pick your plan
                        </h3>
                        <div className="flex gap-2 justify-start items-center">
                            <input type="radio"></input>
                            <label>Monthly billing</label>
                        </div>
                        <div className="flex gap-2 justify-start items-center">
                            <input type="radio"></input>
                            <label>Annual billing</label>
                        </div>
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
        </div>
    );
};

export default page;
