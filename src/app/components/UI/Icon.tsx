import { IconType } from "@/app/types";
import {
    IconDefinition,
    faApple,
    faFacebook,
    faGoogle,
} from "@fortawesome/free-brands-svg-icons";
import {
    faCircleLeft,
    faCircleRight,
    faCircleUser,
    faClipboard,
    faClipboardUser,
    faCode,
    faCog,
    faCreditCard,
    faCube,
    faFilterCircleDollar,
    faHammer,
    faListUl,
    faNoteSticky,
    faPalette,
    faPenNib,
    faPlus,
    faShop,
    faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FC } from "react";

type IconProps = {
    label: IconType;
};

const iconMapping: { [key in IconType]: IconDefinition } = {
    Dashboard: faCube,
    Settings: faCog,
    Profile: faCircleUser,
    "Invoice Details": faClipboardUser,
    Menu: faClipboard,
    add: faPlus,
    delete: faXmark,
    Facebook: faFacebook,
    Google: faGoogle,
    Apple: faApple,
    Merchant: faShop,
    "Payment & Notes": faCreditCard,
    "Line Items": faListUl,
    designers: faPenNib,
    marketers: faFilterCircleDollar,
    trades: faHammer,
    techcontractors: faCode,
    back: faCircleLeft,
    next: faCircleRight,
};

export const Icon: FC<IconProps> = ({ label }) => {
    const icon = iconMapping[label];
    return <FontAwesomeIcon className="flex self-center mx-2" icon={icon} />;
};
