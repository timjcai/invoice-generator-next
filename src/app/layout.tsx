import type { Metadata } from "next";
import { Inter, Poppins, Roboto_Flex } from "next/font/google";
import "./globals.css";
import { Navbar } from "./components/Navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { SessionProvider } from "./context/SessionProvider";
import LoginPage from "./login/page";

const inter = Inter({ subsets: ["latin"] });

const roboto = Roboto_Flex({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Free Bulk Invoice Generator",
    description:
        "Revolutionize your invoicing with our Free Bulk Invoice Generator! Streamline workflow, customize templates, and effortlessly manage invoices. Fast, user-friendly, and no hidden costs. Create an account today!",
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession(authOptions);
    return (
        <html lang="en">
            <body className={roboto.className}>
                <SessionProvider session={session}>
                    {!session ? (
                        <LoginPage />
                    ) : (
                        <>
                            <Navbar />
                            {children}
                        </>
                    )}
                </SessionProvider>
            </body>
        </html>
    );
}
