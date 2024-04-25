"use client";

import Image from "next/image";
import React, { ChangeEvent, FormEventHandler, useState } from "react";
import { Icon } from "../UI";
import Link from "next/link";
import { LoginPayload } from "@/app/types";
import AuthButtons from "../common/AuthButtons";
import { AuthContextValue, useAuth } from "@/app/context";
import { auth } from "@/app/server";
import { signInWithEmailAndPassword } from "firebase/auth";
import { PayzoSecondaryLogo } from "../common";

export const LoginForm = () => {
    const [userEmail, setUserEmail] = useState<string>("");
    const [userPassword, setUserPassword] = useState<string>("");

    function handleSignIn(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        signInWithEmailAndPassword(auth, userEmail, userPassword)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    }

    return (
        <div className="bg-white h-fit border-2 border-white rounded-lg py-12 px-8 w-[480px] mt-4">
            <div className="flex flex-col items-center">
                <PayzoSecondaryLogo />
                <p className="mb-2 text-2xl font-semibold">Welcome back</p>
                <p className="text-[#404347] mb-8">
                    Please enter your details to sign in
                </p>
                <AuthButtons />
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
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
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
                        value={userPassword}
                        onChange={(e) => setUserPassword(e.target.value)}
                    ></input>
                    <div className="flex flex-row justify-between">
                        <div className="flex flex-row gap-2 ms-2">
                            <input id="remember" type="checkbox"></input>
                            <label htmlFor="remember">Remember me</label>
                        </div>
                        <Link
                            href="/forgot-password"
                            className="underline underline-offset-2"
                        >
                            Forgot password?
                        </Link>
                    </div>
                    <button
                        className="w-full border-2 bg-[#212122] border-[#212122] py-2 text-white font-light rounded-md mt-4 mb-4 disabled:opacity-40"
                        onClick={(e) => handleSignIn(e)}
                        disabled={!userEmail || !userPassword}
                    >
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
