import React, { FC } from "react";
import { BubbleWrapper } from ".";
import { BuyerType, SellerType } from "@/app/types";

export type InvoiceType = {
    invoiceNumber: number;
    sellerDetails: SellerType;
    buyerDetails: BuyerType;
};

export const InvoicePreview: FC<InvoiceType> = ({
    invoiceNumber,
    sellerDetails,
    buyerDetails,
}) => {
    return (
        <BubbleWrapper>
            <section>
                <h1>Invoice #{invoiceNumber}</h1>
            </section>
            <section>
                <h1>Title</h1>
            </section>
            <section>
                <h1>Title</h1>
            </section>
        </BubbleWrapper>
    );
};
