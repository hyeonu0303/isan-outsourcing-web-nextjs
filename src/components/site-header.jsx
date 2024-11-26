import Link from "next/link"
import Image from "next/image"
import { Menu } from "lucide-react" 
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet" 

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 items-center justify-center flex">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Image 
            src="/logo/isan-logo.png" alt="ISAN 로고"  
            width={40} height={40}
          />
        </Link>

        {/* 데스크탑 네비게이션 */}
        <nav className="hidden md:flex md:items-center">
          <div className="flex items-center space-x-6">
            <Link href="/info-company" className="text-sm font-medium">회사소개</Link>
            <Link href="/opening-schedule" className="text-sm font-medium">개원 스케쥴러</Link>
            <Link href="/opening-column" className="text-sm font-medium">개원 컬럼</Link>
            <Link href="/portfolio" className="text-sm font-medium">포트폴리오</Link>
            <Link href="/partners" className="text-sm font-medium">협력업체</Link>
          </div>
        </nav>

        {/* 모바일 메뉴 */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">메뉴 열기</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px]">
            <nav className="flex flex-col space-y-4 mt-6">
              <SheetClose asChild>
                <Link href="/info-company" className="text-sm font-medium">
                  회사소개
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link href="/opening-schedule" className="text-sm font-medium">
                  개원 스케쥴러
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link href="/opening-column" className="text-sm font-medium">
                  개원 컬럼
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link href="/portfolio" className="text-sm font-medium">
                  포트폴리오
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link href="/partners" className="text-sm font-medium">
                  협력업체
                </Link>
              </SheetClose>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}