import Image from "next/image";
import React, { FC } from "react";

type AvatarType = {
    number: string;
    label: string;
};

export const AvatarCard: FC<AvatarType> = ({ number, label }) => {
    const convertedSRC = "";

    return (
        <div className="flex flex-row py-2 px-3 border-[1px] rounded-xl hover:bg-white hover:border-black gap-4 items-center">
            <Image
                src={`/avatar/${number}.png`}
                alt={label}
                width={36}
                height={36}
                style={{ borderRadius: "100px" }}
            />
            <p className="font-semibold text-md">{label}</p>
        </div>
    );
};
