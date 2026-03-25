// frontend/src/app/layout.tsx
import type { Metadata } from "next";
import { Outfit, Italianno } from "next/font/google";
import "./globals.css";
import GlobalDock from "@/src/components/GlobalDock";
import { createClient } from "@/src/lib/supabase/server"; // Import the Supabase client

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit", weight: ["400", "500", "600", "700", "800"] });
const italianno = Italianno({ subsets: ["latin"], variable: "--font-italianno", weight: "400" });

export const metadata: Metadata = {
  title: "AI Learning Platform",
  description: "Personalized, AI-driven education and skill development.",
};

// Make the layout an async function to fetch the user session
export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {

  // Check for an active session securely on the server
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Convert the user object presence into a simple boolean
  const isLoggedIn = !!user;

  return (
    <html lang="en">
      <body className={`${outfit.variable} ${italianno.variable} font-sans min-h-screen flex flex-col relative selection:bg-white selection:text-black bg-black`}>
        <main className="flex-1 flex flex-col relative">
          {children}
        </main>

        {/* Pass the dynamic auth state to the Dock */}
        <GlobalDock isLoggedIn={isLoggedIn} />
      </body>
    </html>
  );
}