import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/lib/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EduDiscover | College Discovery Platform",
  description: "Discover, compare and predict the best colleges for your future.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-background text-foreground antialiased min-h-screen relative`}>
        <div className="fixed inset-0 -z-10 bg-gradient-premium pointer-events-none opacity-50" />
        <AuthProvider>
          <ProtectedRoute>
            <Navbar />
            {children}
          </ProtectedRoute>
        </AuthProvider>
      </body>
    </html>
  );
}
