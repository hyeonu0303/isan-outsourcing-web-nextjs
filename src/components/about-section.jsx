import Image from "next/image"
import { Button } from "./ui/button"

export function AboutSection() {
  return (

    <section id="about" className="border-t">
      <Button
        size="lg"
      >

      </Button>
      <div className="container py-12 md:py-24">
        <div className="grid gap-12 md:grid-cols-2 md:gap-8 lg:gap-16">
          <div className="flex flex-col justify-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">신뢰할 수 있는 파트너</h2>
            <p className="text-gray-500 md:text-lg">
              20년 이상의 의료 산업 경험을 바탕으로, 저희는 병원 경영의 모든 측면에서 전문적인 솔루션을 제공합니다. 고객의
              성공이 곧 우리의 성공입니다.
            </p>
            <div className="flex items-center space-x-4">
              <div>
                <div className="font-bold text-[2rem]">김대표</div>
                <div className="text-md text-gray-500">대표이사</div>
              </div>
            </div>
          </div>
          <div className="relative aspect-square overflow-hidden rounded-xl md:aspect-auto min-h-[50vh]">
            <Image
              src="/image/happy-ceo-at-desk.webp"
              alt="대표이사 프로필"
              className="object-cover"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw, (min-width: 768px) 60vw, (min-width: 640px) 70vw, 80vw,(min-hegiht: 480px) 90vw, 100vw"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

