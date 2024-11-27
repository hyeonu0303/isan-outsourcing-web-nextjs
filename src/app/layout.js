import localFont from "next/font/local";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const pretendard = localFont({
  src: [
    {
      path: './fonts/Pretendard-Light.woff',
      weight: '300',
      style: 'normal',
    },
    {
      path: './fonts/Pretendard-Regular.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/Pretendard-Medium.woff',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/Pretendard-Bold.woff',
      weight: '700',
      style: 'normal',
    }
  ],
  variable: '--font-pretendard',
  display: 'swap'
})

export const metadata = {
  title: "Medimaker 병원 컨설팅 및 의료장비 도매",
  description: "Medimaker 병원 컨설팅 및 의료장비 도매 서비스입니다.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="kr" className="h-full">
      <body
        className={`${pretendard.variable} font-sans antialiased h-full`}
        style={{
          fontFamily: `var(--font-pretendard), -apple-system, BlinkMacSystemFont, 
            "Apple SD Gothic Neo", "Segoe UI", sans-serif`
        }}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <header className="flex-shrink-0 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 items-center justify-center flex">
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

