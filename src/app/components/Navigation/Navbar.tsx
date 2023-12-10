import React from "react";
import { NavbarLinkButton, NavbarWrapper } from ".";

export const Navbar = () => {
    return (
        // <div className="flex flex-row justify-between mx-[200px] py-[16px]">
        <NavbarWrapper>
            <NavbarLinkButton>Logo</NavbarLinkButton>
            <div className="flex flex-row justify-between">
                <NavbarLinkButton>
                    <a>Pricing</a>
                </NavbarLinkButton>
                <NavbarLinkButton>
                    <a>Donate</a>
                </NavbarLinkButton>
                <NavbarLinkButton>
                    <a>Support</a>
                </NavbarLinkButton>
            </div>
            <div className="flex flex-row justify-between">
                <NavbarLinkButton>Sign In</NavbarLinkButton>
                <NavbarLinkButton>Sign Up</NavbarLinkButton>
            </div>
        </NavbarWrapper>
    );
};
