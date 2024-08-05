import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "../components/navbar";
import { QueryProvider } from "@/providers/QueryProvider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="scroll-smooth">
            <body className={inter.className}>
                <header className="w-screen fixed z-50">
                    <NavBar />
                </header>
                <QueryProvider>{children}</QueryProvider>
            </body>
        </html>
    );
}
