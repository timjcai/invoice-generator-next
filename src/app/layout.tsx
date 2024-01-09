import type { Metadata } from "next";
import { Inter, Poppins, Roboto_Flex } from "next/font/google";
import "./globals.css";
import { Navbar } from "./components/Navigation";
import LoginPage from "./login/page";
import {
    AuthProvider,
    ProfileProvider,
    BillerProvider,
    InvoiceDetailProvider,
    PaymentNotesProvider,
    LineItemsProvider,
} from "./context";

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
    return (
        <html lang="en">
            <body className={roboto.className}>
                <AuthProvider>
                    <ProfileProvider>
                        <BillerProvider>
                            <InvoiceDetailProvider>
                                <PaymentNotesProvider>
                                    <LineItemsProvider>
                                        <>
                                            <Navbar />
                                            {children}
                                        </>
                                    </LineItemsProvider>
                                </PaymentNotesProvider>
                            </InvoiceDetailProvider>
                        </BillerProvider>
                    </ProfileProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
