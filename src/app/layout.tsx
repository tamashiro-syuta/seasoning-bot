import type { Metadata } from "next";
import "./globals.css";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import AppBar from "@/components/custom/app-bar";
import Breadcrumb from "@/components/custom/breadcrumb";
import LineProvider from "./components/LineProvider";
import { headers } from "next/headers";
import type { Session } from "next-auth";

export const metadata: Metadata = {
  title: "LIFF App for App Router",
  description: "Generated by create next app",
};

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export async function fetchSession(cookie: string): Promise<Session | null> {
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/session`, {
    headers: { cookie },
  });

  const session = (await response.json()) as Session;
  return Object.keys(session).length > 0 ? session : null;
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await fetchSession(headers().get("cookie") ?? "");

  return (
    <html lang="ja" className="scroll-smooth scroll-pt-24">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased bg-primary-foreground",
          fontSans.variable
        )}
      >
        <LineProvider session={session}>
          <AppBar />
          <div className="px-5 pt-2">
            <Breadcrumb />
          </div>

          {children}
        </LineProvider>
      </body>
    </html>
  );
}
