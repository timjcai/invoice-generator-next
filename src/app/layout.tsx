import type { Metadata } from "next";
import { Inter, Poppins, Roboto_Flex } from "next/font/google";
import "./globals.css";
import { Navbar } from "./components/Navigation";
import LoginPage from "./login/page";
import {
    AuthProvider,
    ProfileProvider,
    InvoiceDetailProvider,
    PaymentNotesProvider,
    LineItemsProvider,
    MerchantProvider,
} from "./context";
import InvoiceGeneratorProvider from "./context/InvoiceGeneratorProvider";
import Footer from "./components/LandingPage/Footer";

// Toast Library
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
                <ProfileProvider>
                    <AuthProvider>
                        <MerchantProvider>
                            <InvoiceDetailProvider>
                                <PaymentNotesProvider>
                                    <LineItemsProvider>
                                        <InvoiceGeneratorProvider>
                                            <>{children}</>
                                        </InvoiceGeneratorProvider>
                                    </LineItemsProvider>
                                </PaymentNotesProvider>
                            </InvoiceDetailProvider>
                        </MerchantProvider>
                    </AuthProvider>
                </ProfileProvider>
                <ToastContainer
                    position="bottom-left"
                    newestOnTop={false}
                    pauseOnHover
                    closeOnClick
                    autoClose={5000}
                    hideProgressBar={false}
                />
            </body>
        </html>
    );
}
