"use client";
import Image from "next/image";
import React, { ChangeEvent, FormEventHandler, useState } from "react";
import { Icon } from "../UI";
import Link from "next/link";
import { LoginPayload } from "@/app/types";
import { signIn } from "next-auth/react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/app/server";

export const ForgotPasswordForm = () => {
    const [userEmail, setUserEmail] = useState<string>("");

    function resetEmail(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        sendPasswordResetEmail(auth, userEmail);
    }

    return (
        <div className="bg-white h-fit border-2 border-white rounded-lg py-12 px-8 min-w-[480px] mt-4">
            <div className="flex flex-col items-center">
                <Image
                    className="rounded-full mb-4"
                    src="/linearlogo.jpeg"
                    alt="me"
                    width="64"
                    height="64"
                />
                <p className="mb-2 text-2xl font-semibold">Reset password</p>
                <p className="text-[#404347] mb-8">Recover your account</p>
                <div className="flex items-start w-full">
                    <form className="flex flex-col items-start w-full">
                        <label
                            htmlFor="email"
                            className="text-md font-medium mb-2"
                        >
                            Email Address
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            className="border-2 border-[#EDEEEF] p-3 mb-4 rounded-md w-full"
                            required={true}
                            value={userEmail}
                            onChange={(e) => setUserEmail(e.target.value)}
                        ></input>
                        <button
                            className="w-full border-2 bg-[#212122] border-[#212122] py-2 text-white font-light rounded-md mt-4 mb-4 disabled:opacity-40"
                            onClick={(e) => resetEmail(e)}
                            disabled={!userEmail}
                        >
                            Send recovery email
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};
