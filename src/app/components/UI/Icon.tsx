import { IconType } from "@/app/types";
import {
    IconDefinition,
    faApple,
    faFacebook,
    faGoogle,
    faHive,
} from "@fortawesome/free-brands-svg-icons";
import {
    faBookmark,
    faCalculator,
    faCheckCircle,
    faCircleLeft,
    faCircleRight,
    faCircleUser,
    faClipboard,
    faClipboardUser,
    faCloudArrowDown,
    faCode,
    faCog,
    faCreditCard,
    faCube,
    faFile,
    faFilterCircleDollar,
    faHammer,
    faListUl,
    faMinusCircle,
    faPenNib,
    faPlay,
    faPlus,
    faShop,
    faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { faCloud } from "@fortawesome/free-solid-svg-icons/faCloud";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FC } from "react";

type IconProps = {
    label: IconType;
    style?: {};
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
    included: faCheckCircle,
    notincluded: faMinusCircle,
    download: faCloudArrowDown,
    learnmore: faPlay,
    save: faBookmark,
    template: faFile,
    calculate: faCalculator,
    bulk: faHive,
};

export const Icon: FC<IconProps> = ({ label, style }) => {
    const icon = iconMapping[label];
    return (
        <FontAwesomeIcon
            className="flex self-center mx-2"
            icon={icon}
            style={style}
        />
    );
};
