import Image from "next/image";
import React from "react";

export const HeroAnimation = () => {
    return <div className=""></div>;
};

export const SaveDetailsAnimation = () => {
    return (
        <div className="absolute right-0 bottom-0">
            <Image
                src="/mockup/SaveDetailsSection.png"
                width={600}
                height={600}
                alt="save-details"
                className="rounded-r-xl"
            />
        </div>
    );
};

export const BulkCreateAnimation = () => {
    return <div></div>;
};

export const CreateTemplateAnimation = () => {
    return <div></div>;
};

export const CalculatedAnimation = () => {
    return <div></div>;
};
