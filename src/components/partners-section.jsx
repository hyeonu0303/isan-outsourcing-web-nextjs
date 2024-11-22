import Image from "next/image"

const partnersLogo = [
  {
    id:1,
    src:"/logo/toss.png"
  },
  {
    id:2,
    src:"/logo/asiana.png"
  },
  {
    id:3,
    src:"/logo/adidas.png"
  },
  {
    id:4,
    src:"/logo/jikbang.png"
  },
  {
    id:5,
    src:"/logo/koreanair.png"
  },
  {
    id:6,
    src:"/logo/megabox.png"
  },
  {
    id:7,
    src:"/logo/yanolza.png"
  }
]

export function PartnersSection() {
  return (
    <section id="partners" className="border-t bg-gray-50">
      <div className="container py-12 md:py-24">
        <div className="mx-auto max-w-[800px] text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">신뢰할 수 있는 파트너사</h2>
          <p className="mt-4 text-gray-500 md:text-lg">국내외 유수의 의료장비 제조사 및 병원들과 협력하고 있습니다</p>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-4">
          {partnersLogo.map((logo) => (
            <div key={logo.id} className="flex items-center justify-center">
              <Image
                src={logo.src}
                alt={`Partner logo ${logo.id}`}
                width={160}
                height={80}
                className="hover:grayscale-0"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

