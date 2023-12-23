import React, {
    FC,
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";
import { auth } from "../server";
import { LoginPayload } from "../types";
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
} from "firebase/auth";

export const AuthContext = createContext(null);

export function useAuth() {
    return useContext(AuthContext);
}

export const AuthProvider = (children: React.JSX.Element) => {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState<boolean>(true);

    function signUp({ email, password }: LoginPayload) {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    function signOut() {
        return auth.signOut();
    }

    function login({ email, password }: LoginPayload) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    function getUser() {
        return auth.currentUser();
    }

    function isAdmin() {
        return auth.currentUser!.getIdTokenResult().then((idTokenResult) => {
            if (idTokenResult.claims.admin) {
                return true;
            } else {
                return false;
            }
        });
    }

    useEffect(() => {
        const unsubscribe = () =>
            onAuthStateChanged(auth, (currentUser) => {
                setCurrentUser(currentUser);
                setLoading(false);
            });

        return unsubscribe();
    }, []);

    const value = { currentUser, signUp, signOut, login, getUser, isAdmin };
    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};
