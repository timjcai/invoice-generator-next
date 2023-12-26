"use client";
import Image from "next/image";
import React, {
    ChangeEvent,
    FormEvent,
    FormEventHandler,
    useState,
} from "react";
import { Icon } from "../UI";
import Link from "next/link";
import { LoginPayload } from "@/app/types";
import { signIn } from "next-auth/react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/app/server";
import { redirect } from "next/dist/server/api-utils";
import { useAuth } from "@/app/context";

export const SignupForm = () => {
    const [userEmail, setUserEmail] = useState<string>("");
    const [userPassword, setUserPassword] = useState<string>("");
    const [userPasswordAgain, setUserPasswordAgain] = useState<string>("");
    const { googleSignIn } = useAuth();

    const signUp = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: userEmail,
                    password: userPassword,
                }),
            });

            if (response.ok) {
                console.log("Post request successful");
                console.log(response);
                // You can handle success scenarios here
            } else {
                console.error("Post request failed");
                // You can handle error scenarios here
            }
        } catch (error) {
            console.error("Error making POST request:", error);
        }
        console.log("creating user...");
    };

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
                <p className="mb-2 text-2xl font-semibold">Hello 👋</p>
                <p className="text-[#404347] mb-8">Create an account using:</p>
                <ul className="flex flex-row justify-between w-full">
                    <li>
                        <button className="border-2 border-[#EDEEEF] px-10 py-2 rounded-md">
                            <Icon label="Apple" />
                        </button>
                    </li>
                    <li>
                        <button
                            className="border-2 border-[#EDEEEF] px-10 py-2 rounded-md"
                            onClick={() => googleSignIn()}
                        >
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
                <form className="flex flex-col" onSubmit={(e) => signUp(e)}>
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
                    <label
                        htmlFor="passwordAgain"
                        className="text-md font-medium mb-2"
                    >
                        Validate Password
                    </label>
                    <input
                        id="passwordAgain"
                        type="password"
                        placeholder="Enter your password again"
                        className="border-2 border-[#EDEEEF] p-3 mb-4 rounded-md"
                        required={true}
                        value={userPasswordAgain}
                        onChange={(e) => setUserPasswordAgain(e.target.value)}
                    ></input>
                    <div className="flex flex-row justify-between">
                        <div className="flex flex-row gap-2 ms-2">
                            <input id="remember" type="checkbox"></input>
                            <label htmlFor="remember">Remember me</label>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full border-2 bg-[#212122] border-[#212122] py-2 text-white font-light rounded-md mt-4 mb-4 disabled:opacity-40"
                        disabled={
                            !userEmail ||
                            !userPassword ||
                            userPassword !== userPasswordAgain
                        }
                    >
                        Create account
                    </button>
                </form>
            </div>
        </div>
    );
};
