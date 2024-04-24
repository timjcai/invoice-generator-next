import React, { FC } from "react";
import { Icon } from "../UI";
import { AlertIcons } from "@/app/types";

type AlertType = {
    name: AlertLabel;
};

type AlertIconData = {
    label: AlertIcons;
    color: string;
};

type AlertLabel = "info" | "faq" | "warning" | "correct";

export const Alert: FC<AlertType> = ({ name }) => {
    const iconData: { [key in AlertLabel]: AlertIconData } = {
        info: { label: "icon-info", color: "#C8E9F0" },
        faq: { label: "icon-faq", color: "#F8D072" },
        warning: { label: "icon-warning", color: "#F38292" },
        correct: { label: "icon-correct", color: "#C6DC6E" },
    };

    return (
        <div className="flex flex-row justify-between border-[1px] rounded-xl py-2 px-4 w-[300px] mb-2">
            <div className="flex flex-row gap-2 items-center">
                {" "}
                <Icon
                    label={`${iconData[name]!.label}`}
                    style={{
                        borderRadius: "100px",
                        padding: "3px",
                        border: "1px solid #E4E4E4",
                        backgroundColor: "#FCFCF9",
                        color: `${iconData[name]!.color}`,
                        height: "32px",
                        width: "32px",
                    }}
                />
                <p className="text-lg font-semibold">{name}</p>
            </div>
            <div className="flex flex-row gap-2 items-center">X</div>
        </div>
    );
};
