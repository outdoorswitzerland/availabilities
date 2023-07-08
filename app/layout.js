import "./globals.css";
import localFont from "next/font/local";

const futuraRound = localFont({
  src: [
    {
      path: "./fonts/futura-round-light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/futura-round-light-oblique.woff2",
      weight: "300",
      style: "italic",
    },
    {
      path: "./fonts/futura-round.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/futura-round-oblique.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "./fonts/futura-round-medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/futura-round-medium-oblique.woff2",
      weight: "500",
      style: "italic",
    },
    {
      path: "./fonts/futura-round-demi.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/futura-round-demi-oblique.woff2",
      weight: "600",
      style: "italic",
    },
    {
      path: "./fonts/futura-round-bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/futura-round-bold-oblique.woff2",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--futuraRound",
  display: "swap",
});

export const metadata = {
  title: "Availabilities",
  description: "Activity availabilities",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${futuraRound.variable} text-black`}>
      <body>{children}</body>
    </html>
  );
}
