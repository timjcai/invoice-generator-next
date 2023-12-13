"use client";
import React, { useEffect, useState } from "react";
import { Icon } from "../UI";

export const Navbar = () => {
    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        // Attach the event listener
        window.addEventListener("resize", handleResize);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const isSmallScreen = windowWidth <= 640;
    const isMediumScreen = windowWidth > 640; //&& windowWidth <= 1024;
    // const isLargeScreen = windowWidth > 1024;
    return (
        // <div className="flex flex-row justify-between mx-[200px] py-[16px]">
        <>
            {isSmallScreen && <SmallNavbar />}
            {isMediumScreen && (
                <div className="flex flex-row justify-between py-[32px] w-[calc(100%-32px)] md:w-[calc(100%-200px)] lg:w-[1024px]">
                    <NavbarLinkButton label={<a>Logo</a>} />
                    <div className="flex flex-row justify-between">
                        <div></div>
                        <NavbarLinkButton label={<a>Pricing</a>} />
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
                        <SecondaryButton label={<a>Sign In</a>} />
                        <PrimaryButton label={<a>Sign Up</a>} />
                    </div>
                </div>
            )}
        </>
    );
};

export const SmallNavbar = () => {
    return (
        <div className="flex flex-row justify-between py-[32px] w-[calc(100%-32px)] md:w-[calc(100%-200px)] lg:w-[1024px]">
            <SecondaryButton label={<Icon label={"menu"} />} />
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
        <div className="flex bg-[#0C356A] text-white px-6 py-1 rounded-md justify-center items-center mx-4 text-lg font-normal">
            {label}
        </div>
    );
};

export const SecondaryButton: FC<ButtonProps> = ({ label }) => {
    return (
        <div className="flex bg-[#FFFFFF] border-2 border-black text-black px-6 py-1 rounded-md justify-center items-center mx-4 text-lg font-normal">
            {label}
        </div>
    );
};
