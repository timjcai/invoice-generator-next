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
import { ProfileContextValue, ProviderProps, useProfileContext } from ".";
import { useRouter } from "next/navigation";

export interface AuthContextValue {
    currentUser: User | null;
    signUp: ({ email, password }: LoginPayload) => Promise<void | User>;
    signOut: () => Promise<void>;
    signIn: ({ email, password }: LoginPayload) => Promise<void | User>;
    googleSignIn: () => void;
    login: (payload: LoginPayload) => Promise<UserCredential>;
    getUser: () => User | null | undefined;
    isAdmin: () => Promise<boolean>;
}

export const AuthContext = createContext<Partial<AuthContextValue>>({});

export function useAuth() {
    return useContext(AuthContext);
}

export const AuthProvider: FC<ProviderProps> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const { createProfile } = useProfileContext() as ProfileContextValue;

    const router = useRouter();

    async function signUp({ email, password }: LoginPayload) {
        return await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredentials) => {
                const user = userCredentials.user;
                setCurrentUser(user);
                createProfile();
                return user;
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    }

    function signOut() {
        return auth.signOut();
    }

    async function signIn({ email, password }: LoginPayload) {
        return signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    }

    async function googleSignIn() {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider);
        router.push("/dashboard");
    }

    function login({ email, password }: LoginPayload) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    function getUser() {
        return auth.currentUser;
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

    // Validations

    function isValidPassword(password: string) {
        return password.length > 6;
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
        signIn,
        login,
        getUser,
        isAdmin,
        googleSignIn,
    };
    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};
