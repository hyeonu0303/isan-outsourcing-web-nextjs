import localFont from "next/font/local";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "ISAN 병원 컨설팅 및 의료장비 도매",
  description: "ISAN 병원 컨설팅 및 의료장비 도매 서비스입니다.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="kr" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <header className="w-full flex-shrink-0">
            <SiteHeader />
          </header>

          {/* Main Content */}
          <main className="w-full flex-1">
            {children}
          </main>

          {/* Footer */}
          <footer className="w-full flex-shrink-0">
            <SiteFooter />
          </footer>
        </div>
      </body>
    </html>
  );
}

