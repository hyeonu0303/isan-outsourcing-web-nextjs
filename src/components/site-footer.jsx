"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export function SiteFooter() {
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  // 관리자 상태 확인 함수
  const checkAdmin = () => {
    const adminAuth = document.cookie
      .split("; ")
      .find((row) => row.startsWith("admin-auth"));
    setIsAdmin(adminAuth?.split("=")[1] === "true");
  };

  // 토큰 삭제 함수 (로그아웃)
  const handleLogout = () => {
    document.cookie = "admin-auth=; Max-Age=0; path=/"; // 쿠키 삭제
    window.dispatchEvent(new Event("admin-logout")); // 로그아웃 이벤트 트리거
    router.push("/"); // 홈 페이지로 이동
  };

  useEffect(() => {
    // 초기 상태 확인
    checkAdmin();

    // 로그인/로그아웃 이벤트 감지
    const handleAdminChange = () => {
      checkAdmin();
    };

    window.addEventListener("admin-login", handleAdminChange);
    window.addEventListener("admin-logout", handleAdminChange);

    return () => {
      window.removeEventListener("admin-login", handleAdminChange);
      window.removeEventListener("admin-logout", handleAdminChange);
    };
  }, []);

  return (
    <footer className="border-t bg-[#00857C] text-white w-full flex flex-col items-center justify-between h-full">
      <div className="container py-4 px-4 md:py-12 flex flex-col items-center">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-2 lg:grid-cols-4 w-full lg:gap-20">
          <h3 className="text-lg font-bold">MakerMEDI</h3>
          <div>
            <h3 className="text-lg font-bold hidden lg:block">주소</h3>
            <p className="text-sm text-white font-semibold mt-2">
              51311 창원시 마산회원구 회성남8길 137, 308호
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold hidden lg:block">연락처</h3>
            <p className="text-sm text-white font-semibold mt-2">
              TEL: 010-4513-1553
              <br />
              Email: makermedi@naver.com
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold hidden lg:block">관리자</h3>
            <p className="mt-2 text-sm text-white font-semibold">
              {isAdmin ? (
                <button onClick={handleLogout} className="underline">
                  관리자 로그아웃
                </button>
              ) : (
                <Link href="/access">관리자 로그인</Link>
              )}
            </p>
          </div>
        </div>
        {/* Centered copyright text */}
        <div className="border-t w-full mt-4 pt-4 flex justify-center items-center text-sm text-white">
          © 2024 MakerMEDI. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
