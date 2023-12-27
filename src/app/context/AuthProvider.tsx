"use client";
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
    GoogleAuthProvider,
    signOut,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithRedirect,
    signInWithPopup,
    User,
    UserCredential,
} from "firebase/auth";
import { ProviderProps } from ".";

interface AuthContextValue {
    currentUser: User | null | undefined;
    signUp: (payload: LoginPayload) => Promise<UserCredential>;
    signOut: () => Promise<void>;
    googleSignIn: () => void;
    login: (payload: LoginPayload) => Promise<UserCredential>;
    getUser: () => User | null | undefined;
    isAdmin: () => Promise<boolean>;
}

export const AuthContext = createContext<AuthContextValue | undefined>(
    undefined
);

export function useAuth() {
    return useContext(AuthContext);
}

export const AuthProvider: FC<ProviderProps> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState<boolean>(true);

    function signUp({ email, password }: LoginPayload) {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    function signOut() {
        return auth.signOut();
    }

    function googleSignIn() {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider);
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

    const value: AuthContextValue = {
        currentUser,
        signUp,
        signOut,
        login,
        getUser,
        isAdmin,
        googleSignIn,
    };
    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};
