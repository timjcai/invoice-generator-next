import React from "react";

const Footer = () => {
    return (
        <footer className="flex justify-center py-[64px] mt-[64px] bg-zinc-900 text-white border-t-neutral-300 absolute w-screen left-0">
            <div className="max-w-[1032px] flex justify-between w-[1032px]">
                <div className="flex flex-col py-2">
                    <p className="font-semibold text-base py-2">Solutions</p>
                    <ul className="flex flex-col gap-1">
                        <li>
                            <a>Invoice Generator</a>
                        </li>
                        <li>
                            <a>Bulk Invoice Generator</a>
                        </li>
                    </ul>
                </div>
                <div className="flex flex-col py-2">
                    <p className="font-semibold text-base py-2">Resources</p>
                    <ul className="flex flex-col gap-1">
                        <li>
                            <a>Invoicing Guide for Sole Traders</a>
                        </li>
                        <li>
                            <a>Developer log</a>
                        </li>
                        <li>
                            <a>Create an Account</a>
                        </li>
                    </ul>
                </div>
                <div className="flex flex-col py-2">
                    <p className="font-semibold text-base py-2">About Us</p>
                    <ul className="flex flex-col gap-1">
                        <li>
                            <a>Support</a>
                        </li>
                        <li>
                            <a>Terms of Service</a>
                        </li>
                        <li>
                            <a>Privacy Policy</a>
                        </li>
                        <li>
                            <a>Pricing</a>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
