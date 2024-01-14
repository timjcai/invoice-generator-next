"use client";
import React, { FC, useEffect, useState } from "react";
import { Icon } from "../UI";
import Link from "next/link";
import Image from "next/image";

export const Navbar = () => {
    // const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

    // const isSmallScreen = windowWidth <= 640;
    // const isMediumScreen = windowWidth > 640; //&& windowWidth <= 1024;
    // // const isLargeScreen = windowWidth > 1024;
    return (
        // <div className="flex flex-row justify-between mx-[200px] py-[16px]">
        <>
            {/* {isSmallScreen && <SmallNavbar />}
            {isMediumScreen && ( */}
            <div className="absolute flex flex-row justify-between items-center py-[8px] w-[calc(100%-32px)] md:w-[calc(100%-200px)] lg:w-[1024px] z-10">
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
                    <div></div>
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
                <div className="flex flex-row justify-between">
                    <SecondaryButton label={<Link href="/login">Login</Link>} />
                    <PrimaryButton
                        label={<Link href="/signup">Sign Up</Link>}
                    />
                </div>
            </div>
            {/* )} */}
        </>
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
