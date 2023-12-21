import { IconType } from "@/app/types";
import { IconDefinition } from "@fortawesome/free-brands-svg-icons";
import {
    faCircleUser,
    faClipboard,
    faClipboardUser,
    faCog,
    faCube,
    faPlus,
    faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FC } from "react";

type IconProps = {
    label: IconType;
};

const iconMapping: { [key in IconType]: IconDefinition } = {
    dashboard: faCube,
    settings: faCog,
    profile: faCircleUser,
    contacts: faClipboardUser,
    menu: faClipboard,
    add: faPlus,
    delete: faXmark,
};

export const Icon: FC<IconProps> = ({ label }) => {
    const icon = iconMapping[label];
    return (
        <FontAwesomeIcon className="h-4 flex self-center mx-2" icon={icon} />
    );
};
