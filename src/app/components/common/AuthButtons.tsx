import React, { FC } from "react";
import { Icon } from "../UI";
import { useRouter } from "next/navigation";
import { AuthContextValue, useAuth } from "@/app/context";

interface ButtonActions {}

const AuthButtons: FC<ButtonActions> = () => {
    const router = useRouter();
    const { googleSignIn } = useAuth() as AuthContextValue;

    function handleGoogleSignIn(
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) {
        e.preventDefault();
        googleSignIn();
    }

    return (
        <ul className="flex flex-row justify-between w-full">
            {/* <li>
                <button className="border-2 border-[#EDEEEF] px-10 py-2 rounded-md">
                    <Icon label="Apple" />
                </button>
            </li> */}
            <li>
                <button
                    className="flex items-center justify-center border-2 border-[#EDEEEF] px-10 py-2 rounded-md w-[412px]"
                    onClick={(e) => handleGoogleSignIn(e)}
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
