import type { Metadata } from "next";
import { Inter, Poppins, Roboto_Flex } from "next/font/google";
import "./globals.css";
import { Navbar, SmallNavbar } from "./components/Navigation";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

const roboto = Roboto_Flex({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Free Bulk Invoice Generator",
    description:
        "Revolutionize your invoicing with our Free Bulk Invoice Generator! Streamline workflow, customize templates, and effortlessly manage invoices. Fast, user-friendly, and no hidden costs. Create an account today!",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={roboto.className}>
                <Navbar />
                {children}
            </body>
        </html>
    );
}
