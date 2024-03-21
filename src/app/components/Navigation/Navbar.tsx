"use client";
import React, { FC, useEffect, useState } from "react";
import { Icon } from "../UI";
import Link from "next/link";
import Image from "next/image";
import { ProfileContextValue, useProfileContext } from "@/app/context";
import { signOut } from "firebase/auth";
import { auth } from "@/app/server";

export const Navbar = () => {
    const { uid } = useProfileContext() as ProfileContextValue;

    return (
        <div className="flex items-center justify-center w-full bg-white border-b-2 border-[#e5e7eb] mb-[40px] px-4 md:px-[200px] py-[12px]">
            <div className="flex flex-row justify-between items-center max-w-8xl w-[80vw]">
                <div className="flex flex-row">
                    <NavbarLinkButton
                        label={
                            <Link href="/">
                                <Image
                                    className="rounded-full"
                                    src="/bulkinvgen-logo.jpg"
                                    alt="me"
                                    width="42"
                                    height="42"
                                />
                            </Link>
                        }
                    />
                    <div className="flex flex-row justify-between">
                        {uid ? (
                            <NavbarLinkButton
                                label={<Link href="/dashboard">Dashboard</Link>}
                            />
                        ) : (
                            <></>
                        )}
                        <NavbarLinkButton
                            label={<Link href="/pricing">Pricing</Link>}
                        />
                        <NavbarLinkButton
                            label={
                                <a href="https://www.buymeacoffee.com/shelbythesnag">
                                    Donate
                                </a>
                            }
                        />
                        <NavbarLinkButton label={<a>Support</a>} />
                    </div>
                </div>

                <div className="flex flex-row justify-between">
                    {uid ? (
                        <>
                            <PrimaryButton
                                label={
                                    <button onClick={() => signOut(auth)}>
                                        Logout
                                    </button>
                                }
                            />
                        </>
                    ) : (
                        <>
                            {" "}
                            <SecondaryButton
                                label={<Link href="/login">Login</Link>}
                            />
                            <PrimaryButton
                                label={<Link href="/signup">Sign Up</Link>}
                            />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export const SmallNavbar = () => {
    return (
        <div className="flex flex-row justify-between py-[32px] w-[calc(100%-32px)] md:w-[calc(100%-200px)] lg:w-[1024px]">
            <SecondaryButton label={<Icon label={"Menu"} />} />
        </div>
    );
};

type ButtonProps = {
    label: React.ReactNode;
};
export const NavbarLinkButton: FC<ButtonProps> = ({ label }) => {
    return (
        <div className="flex justify-center items-center mx-4 text-lg font-normal">
            {label}
        </div>
    );
};

export const PrimaryButton: FC<ButtonProps> = ({ label }) => {
    return (
        <div className="border-2 bg-[#212122] border-[#212122] py-1 text-white font-light rounded-md px-6 justify-center items-center mx-3 flex h-[40px]">
            {label}
        </div>
    );
};

export const SecondaryButton: FC<ButtonProps> = ({ label }) => {
    return (
        <div className="border-2 bg-[#FFFFFF] border-[#212122] py-1 text-[#212122] font-light rounded-md px-6 justify-center items-center mx-3 flex h-[40px]">
            {label}
        </div>
    );
};
