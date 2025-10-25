import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "UX Synthesizer | Expert Research Analysis Platform",
  description: "Transform raw UX research into strategic insights. AI-powered analysis applying Nielsen Norman Group methodology to interview transcripts, survey responses, and usability studies.",
  keywords: ["UX research", "user research", "qualitative analysis", "Nielsen Norman Group", "usability testing", "research synthesis"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
