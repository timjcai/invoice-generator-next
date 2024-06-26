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
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/app/server";
import { redirect } from "next/dist/server/api-utils";
import { ProfileContextValue, useAuth, useProfileContext } from "@/app/context";
import AuthButtons from "../common/AuthButtons";
import { useRouter } from "next/navigation";
import { PayzoSecondaryLogo } from "../common";

// libraries:
import { toast } from "react-toastify";

export const SignupForm = () => {
    const [userEmail, setUserEmail] = useState<string>("");
    const [userPassword, setUserPassword] = useState<string>("");
    const [userPasswordAgain, setUserPasswordAgain] = useState<string>("");

    // context
    const { googleSignIn, signUp, currentUser } = useAuth();
    const {} = useProfileContext() as ProfileContextValue;

    const router = useRouter();

    const handleSignUpSubmission = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (userPassword.length < 6) {
            return toast.warn("password need to be at least 6 characters");
        }
        let user = null;
        try {
            if (
                userEmail !== null &&
                userPassword !== null &&
                userPassword.length > 6 &&
                signUp !== undefined
            ) {
                user = await signUp({
                    email: userEmail,
                    password: userPassword,
                });
                console.log("creating user...");
                if (user !== null) {
                    router.push("/dashboard");
                }
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="bg-white h-fit border-2 border-white rounded-lg py-12 px-8 w-[480px] mt-4">
            <div className="flex flex-col items-center">
                <PayzoSecondaryLogo />
                <p className="mb-2 text-2xl font-semibold">Hello 👋</p>
                <p className="text-[#404347] mb-8">Create an account using:</p>
                <AuthButtons />
            </div>
            <div>
                <div className="flex items-center before:content-[''] before:block before:w-full before:h-0.5 before:bg-[#EDEEEF] before:mr-2 after:content-[''] after:block after:w-full after:h-0.5 after:bg-[#EDEEEF] after:ml-2 text-sm mt-6 mb-6">
                    OR
                </div>
            </div>
            <div>
                <form
                    className="flex flex-col"
                    onSubmit={(e) => handleSignUpSubmission(e)}
                >
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
