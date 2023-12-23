"use client";
import React from "react";
import { SessionProvider as Provider } from "next-auth/react";
import { Session } from "next-auth";

type SessionProps = {
    children: React.ReactNode;
    session: Session | null;
};

export function SessionProvider({ children, session }: SessionProps) {
    return <Provider>{children}</Provider>;
}
