import { ColorOptions } from "@/app/types";
import React, { FC } from "react";

type BadgeProps = {
    label: string;
    style?: {};
};

export const SubheadlineBadge: FC<BadgeProps> = ({ label, style }) => {
    return (
        <div className="px-2 py-1 w-fit rounded-md mb-8" style={style}>
            <p className="text-xs">{label}</p>
        </div>
    );
};
