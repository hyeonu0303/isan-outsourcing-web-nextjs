import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="border-t bg-primary text-white w-full flex justify-center">
      <div className="container py-8 md:py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-lg font-bold">ISAN</h3>
            <p className="mt-2 text-sm text-gray-500">최고의 병원 경영 파트너</p>
          </div>
          <div>
            <h3 className="text-lg font-bold">주소</h3>
            <p className="mt-2 text-sm text-gray-500">
            51311 창원시 마산회원구 회성남8길
              <br />
              137, 308호
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold">연락처</h3>
            <p className="mt-2 text-sm text-gray-500">
            Mobile: 010-4513-1553
              <br />
              Email: isanmedi@naver.com
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold">SNS</h3>
            <div className="mt-2 flex space-x-4">
              <Link href="#" className="text-white hover:text-gray-900">
                Blog
              </Link>
              <Link href="#" className="text-white hover:text-gray-900">
                Instagram
              </Link>
              <Link href="#" className="text-white hover:text-gray-900">
                YouTube
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-gray-500">
          © 2024 ISAN. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

