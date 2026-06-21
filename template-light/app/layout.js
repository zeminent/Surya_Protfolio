import "./globals.css";

export const metadata = {
  title: "SuryaTeja Pathuri — Full-Stack Engineer",
  description:
    "Senior Full-Stack Engineer · AI & GenAI · 11+ years building premium web experiences.",
};

export const viewport = {
  themeColor: "#f4f1e9",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
