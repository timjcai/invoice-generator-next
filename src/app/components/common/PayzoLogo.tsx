import Image from "next/image";
import Link from "next/link";
import React from "react";

export const PayzoLogo = () => {
    return (
        <Link href="/">
            <Image
                className="rounded-full"
                src="/brandAssets/payzo-logo.png"
                alt="me"
                width="100"
                height="42"
            />
        </Link>
    );
};

export const PayzoSecondaryLogo = () => {
    return (
        <div className="mb-4 border-2 rounded-[100px] p-2 bg-[var(--avocado)] border-[var(--lush-green)]">
            <Link href="/">
                <Image
                    className="rounded-full"
                    src="/brandAssets/payzo-secondary-logo.png"
                    alt="me"
                    width="42"
                    height="42"
                />
            </Link>
        </div>
    );
};
