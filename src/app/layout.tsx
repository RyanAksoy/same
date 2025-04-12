import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/context/auth-context";
import "./globals.css";

export const metadata: Metadata = {
  title: "hitbox.io - Official Site: Play Hitbox here!",
  description: "Hitbox.io is a multiplayer physics game where players use force push, rockets, and more to compete in various game modes.",
  icons: {
    icon: "/graphics/ui/hitbox.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
