"use client";

import Image from "next/image";
import React, { ChangeEvent, useState } from "react";
import { Icon } from "../UI";
import Link from "next/link";

type LoginPayload = {
    email: string;
    password: string;
};

export const LoginForm = () => {
    const [loginPayload, setLoginPayload] = useState<LoginPayload>({
        email: "",
        password: "",
    });

    function updateLoginPayload(fields: Partial<LoginPayload>) {
        setLoginPayload((prev) => {
            return { ...prev, ...fields };
        });
    }

    return (
        <div className="bg-white h-fit border-2 border-white rounded-lg py-12 px-8 w-[480px] mt-4">
            <div className="flex flex-col items-center">
                <Image
                    className="rounded-full mb-4"
                    src="/linearlogo.jpeg"
                    alt="me"
                    width="64"
                    height="64"
                />
                <p className="mb-2 text-2xl font-semibold">Welcome back</p>
                <p className="text-[#404347] mb-8">
                    Please enter your details to sign in
                </p>
                <ul className="flex flex-row justify-between w-full">
                    <li>
                        <button className="border-2 border-[#EDEEEF] px-10 py-2 rounded-md">
                            <Icon label="Apple" />
                        </button>
                    </li>
                    <li>
                        <button className="border-2 border-[#EDEEEF] px-10 py-2 rounded-md">
                            <Icon label="Google" />
                        </button>
                    </li>
                    <li>
                        <button className="border-2 border-[#EDEEEF] px-10 py-2 rounded-md">
                            <Icon label="Facebook" />
                        </button>
                    </li>
                </ul>
            </div>
            <div>
                <div className="flex items-center before:content-[''] before:block before:w-full before:h-0.5 before:bg-[#EDEEEF] before:mr-2 after:content-[''] after:block after:w-full after:h-0.5 after:bg-[#EDEEEF] after:ml-2 text-sm mt-6 mb-6">
                    OR
                </div>
            </div>
            <div>
                <form className="flex flex-col">
                    <label htmlFor="email" className="text-md font-medium mb-2">
                        Email Address
                    </label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        className="border-2 border-[#EDEEEF] p-3 mb-4 rounded-md"
                        required={true}
                        value={loginPayload?.email}
                        onChange={(e) =>
                            updateLoginPayload({ email: e.target.value })
                        }
                    ></input>
                    <label
                        htmlFor="password"
                        className="text-md font-medium mb-2"
                    >
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        className="border-2 border-[#EDEEEF] p-3 mb-4 rounded-md"
                        required={true}
                        value={loginPayload?.password}
                        onChange={(e) =>
                            updateLoginPayload({ password: e.target.value })
                        }
                    ></input>
                    <div className="flex flex-row justify-between">
                        <div className="flex flex-row gap-2 ms-2">
                            <input id="remember" type="checkbox"></input>
                            <label htmlFor="remember">Remember me</label>
                        </div>
                        <a className="underline underline-offset-2">
                            Forgot password?
                        </a>
                    </div>
                    <button className="w-full border-2 bg-[#212122] border-[#212122] py-2 text-white font-light rounded-md mt-4 mb-4">
                        Sign in
                    </button>
                </form>
            </div>
            <div className="flex flex-row justify-center items-center">
                <p className="me-2">Don't have an account yet?</p>
                <Link href="/signup">Sign Up</Link>
            </div>
        </div>
    );
};
