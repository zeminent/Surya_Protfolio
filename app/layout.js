import "./globals.css";

export const metadata = {
  title: "SuryaTeja Pathuri — Senior Full-Stack Engineer",
  description:
    "Senior Full-Stack Engineer · AI & GenAI · 11+ years building premium web experiences.",
};

export const viewport = {
  themeColor: "#07060a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
