import React, { FC } from "react";
import { Icon } from "../UI";

interface ButtonActions {
    googleSignIn: () => void;
}

const AuthButtons: FC<ButtonActions> = ({ googleSignIn }) => {
    return (
        <ul className="flex flex-row justify-between w-full">
            {/* <li>
                <button className="border-2 border-[#EDEEEF] px-10 py-2 rounded-md">
                    <Icon label="Apple" />
                </button>
            </li> */}
            <li>
                <button
                    className="border-2 border-[#EDEEEF] px-10 py-2 rounded-md w-[412px]"
                    onClick={() => googleSignIn()}
                >
                    <Icon label="Google" />
                    Sign in with Google
                </button>
            </li>
            {/* <li>
                <button className="border-2 border-[#EDEEEF] px-10 py-2 rounded-md">
                    <Icon label="Facebook" />
                </button>
            </li> */}
        </ul>
    );
};

export default AuthButtons;
