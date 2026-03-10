import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cards Against Humanity | A party game for horrible people.",
  description:
    "Cards Against Humanity is a party game for horrible people. Unlike most of the party games you've played before, Cards Against Humanity is as despicable and awkward as you and your friends.",
  keywords: ["cards against humanity", "party game", "adult game", "card game"],
  openGraph: {
    title: "Cards Against Humanity | A party game for horrible people.",
    description: "Unlike most of the party games you've played before, CAH is as despicable and awkward as you and your friends.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
