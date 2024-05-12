"use client";

import React from "react";
import { AlertContainer } from "../components/common";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const page = () => {
    function handleAlertCreation(e) {
        e.preventDefault();
        console.log("hello");
    }

    const notify = () => toast("hello");
    const warn = () => toast.warn("something went wrong");

    return (
        <div>
            <p>hello</p>
            <button onClick={notify}>create alert</button>
            <button onClick={warn}>warn</button>
        </div>
    );
};

export default page;
