import "./globals.css";

export const metadata = {
  title: "Availabilities",
  description: "Activity availabilities",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
