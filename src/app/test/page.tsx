import React from "react";
import { Alert } from "../components/common";

const page = () => {
    return (
        <div>
            <Alert name="correct" />
            <Alert name="warning" />
            <Alert name="faq" />
            <Alert name="info" />
        </div>
    );
};

export default page;
