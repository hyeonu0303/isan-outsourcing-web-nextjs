import Link from "next/link"
import { Menu } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 items-center justify-center flex">
      <div className="container flex h-16 ">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="text-xl font-bold">ISAN</span>
        </Link>
        <nav className="hidden md:flex md:flex-1 md:items-center justify-end">
  <div className="flex items-center space-x-6">
    <Link href="#services" className="text-sm font-medium">
      회사소개
    </Link>
    <Link href="#about" className="text-sm font-medium">
      개원 스케쥴러
    </Link>
    <Link href="#equipment" className="text-sm font-medium">
      개원 컬럼
    </Link>
    <Link href="#partners" className="text-sm font-medium">
      포트폴리오
    </Link>
    <Link href="#partners" className="text-sm font-medium">
      협력업체
    </Link>
  </div>
          
        </nav>
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="ml-auto">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <nav className="flex flex-col space-y-4">
              <Link href="#services" className="text-sm font-medium">
                서비스
              </Link>
              <Link href="#about" className="text-sm font-medium">
                회사소개
              </Link>
              <Link href="#equipment" className="text-sm font-medium">
                의료장비
              </Link>
              <Link href="#partners" className="text-sm font-medium">
                파트너사
              </Link>
              
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

