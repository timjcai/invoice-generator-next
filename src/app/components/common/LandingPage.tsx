import React from "react";

const LandingPage = () => {
    return (
        <>
            <svg
                className="absolute inset-0 -z-10 h-full w-full stroke-black [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
                aria-hidden="true"
            >
                <defs>
                    <pattern
                        id="0787a7c5-978c-4f66-83c7-11c213f99cb7"
                        width="100"
                        height="100"
                        x="50%"
                        y="-1"
                        patternUnits="userSpaceOnUse"
                    >
                        <path d="M.5 200V.5H200" fill="none"></path>
                    </pattern>
                </defs>
                <rect
                    width="100%"
                    height="100%"
                    stroke-width="0"
                    fill="url(#0787a7c5-978c-4f66-83c7-11c213f99cb7)"
                ></rect>
            </svg>
            {/* <div className="flex flex-col items-center justify-center flex-col mx-4 md:mx-[100px] lg:w-[1024px] h-[400px]">
                <h1>Free Invoice Generator</h1>
                <p>
                    Build minimally designed invoices in bulk! Create invoices
                    within the browser through our in-line excel-like
                    spreadsheet fast, without having to download and reupload
                    your excel spreadsheet or CSV file.
                </p>
                <button className="border-2 bg-[#212122] border-[#212122] py-1 text-white font-light rounded-md px-6 justify-center items-center mx-3 flex h-[40px] mb-2">
                    Sign Up
                </button>
            </div> */}
        </>
    );
};

export default LandingPage;
