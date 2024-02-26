import { ColorOptions } from "@/app/types";
import React, { FC } from "react";

type BadgeProps = {
    label: string;
    color?: ColorOptions;
    bgcolor?: ColorOptions;
};

export const SubheadlineBadge: FC<BadgeProps> = ({ label, color, bgcolor }) => {
    let setbgcolor;
    switch (bgcolor) {
        case "orange":
            setbgcolor = "brandorange-half";
            break;
        case "green":
            setbgcolor = "brandgreen-half";
            break;
        case "pink":
            setbgcolor = "brandpink-half";
            break;
        default:
            setbgcolor = "brandorange-half";
    }

    let setcolor;
    switch (color) {
        case "orange":
            setcolor = "brandorange";
            break;
        case "green":
            setcolor = "brandgreen";
            break;
        case "pink":
            setcolor = "brandpink";
            break;
        case "white":
            setcolor = "white";
            break;
        default:
            setcolor = "black";
    }

    return (
        <div className={`px-2 py-1 bg-${setbgcolor} w-fit rounded-sm mb-8`}>
            <p className={`text-xs text-${setcolor}`}>{label}</p>
        </div>
    );
};
