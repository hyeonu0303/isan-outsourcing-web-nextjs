export function SiteFooter() {
  return (
    <footer className="border-t bg-[#00857C] text-white w-full flex flex-col items-center justify-between h-full">
      <div className="container py-4 px-4 md:py-12 flex flex-col items-center">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-2 lg:grid-cols-4 w-full">
          <div>
            <h3 className="text-lg font-bold">ISAN</h3>
          </div>
          <div>
            <h3 className="text-lg font-bold hidden sm:invisible">주소</h3>
            <p className="text-sm text-white font-semibold">
              51311 창원시 마산회원구 회성남8길 137, 308호
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold hidden sm:invisible">연락처</h3>
            <p className="mt-2 text-sm text-white font-semibold">
              TEL: 010-4513-1553
              <br />
              Email: isanmedi@naver.com
            </p>
          </div>
        </div>
        {/* Centered copyright text */}
        <div className="border-t w-full mt-4 pt-4 flex justify-center items-center text-sm text-white">
          © 2024 ISAN. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

