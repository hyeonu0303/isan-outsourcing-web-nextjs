
"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger,SheetClose } from "@/components/ui/sheet";
import { useState, useEffect } from "react";

export function SiteHeader() {
  const [isAdmin, setIsAdmin] = useState(false);

  // 사용자 역할 확인
  const checkAdmin = () => {
    const adminAuth = document.cookie
      .split("; ")
      .find((row) => row.startsWith("admin-auth"));
    setIsAdmin(adminAuth?.split("=")[1] === "true");
  };

  useEffect(() => {
    checkAdmin(); // 초기 로드 시 관리자 상태 확인

    // 로그인/로그아웃 이벤트 처리
    const handleAdminChange = () => {
      checkAdmin(); // 상태 갱신
    };

    window.addEventListener("admin-login", handleAdminChange);
    window.addEventListener("admin-logout", handleAdminChange);

    return () => {
      window.removeEventListener("admin-login", handleAdminChange);
      window.removeEventListener("admin-logout", handleAdminChange);
    };
  }, []);

  return (
      <div className="w-full flex h-20 items-center justify-between px-12">
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Image 
              src="/logo/logo-medimaker-main.png" alt="MediMaker 로고"  
              width={90} height={90}
              className="mt-1"
            />
          </Link>
        </div>

        {/* 데스크탑 네비게이션 */}
        <nav className="hidden md:flex md:items-center">
          <div className="flex items-center space-x-6">
            <Link href="/info-company" className="text-md font-semibold">회사소개</Link>
            <Link href="/opening-schedule" className="text-md font-semibold">개원 스케쥴러</Link>
            <Link href="/opening-column" className="text-md font-semibold">개원 컬럼</Link>
            <Link href="/portfolio" className="text-md font-semibold">포트폴리오</Link>
            <Link href="/partners" className="text-md font-semibold">협력업체</Link>
            {
              isAdmin && (
                <>
                  <Link href="/column" className="text-md font-semibold">
                    칼럼 관리
                  </Link>
                  <Link href="/partner" className="text-md font-semibold">
                    협력업체 관리
                  </Link>
                </>
              )
            }
          </div>
        </nav>

        {/* 모바일 메뉴 */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="!w-8 !h-8"/>
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
              {isAdmin && (
                <>
                  <SheetClose asChild>
                    <Link href="/column" className="text-sm font-medium">
                    협력업체 관리
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link href="/partner" className="text-sm font-medium">
                    협력업체 관리
                    </Link>
                  </SheetClose>
                </>
              )}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
  )
}