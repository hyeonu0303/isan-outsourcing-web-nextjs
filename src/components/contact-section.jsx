import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function ContactSection() {
  return (
    <section id="contact" className="border-t">
      <div className="container py-12 md:py-24">
        <div className="mx-auto max-w-[800px] text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">상담 문의</h2>
          <p className="mt-4 text-gray-500 md:text-lg">
            전문 컨설턴트가 귀하의 병원에 맞는 최적의 솔루션을 제안해드립니다
          </p>
        </div>
        <Card className="mx-auto mt-12 max-w-[600px]">
          <CardHeader>
            <CardTitle>상담 신청</CardTitle>
            <CardDescription>아래 양식을 작성해주시면 빠른 시일 내에 연락드리겠습니다</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="name">이름</Label>
                <Input id="name" placeholder="홍길동" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="hospital">병원명</Label>
                <Input id="hospital" placeholder="메디컨설트 병원" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">이메일</Label>
                <Input id="email" placeholder="example@mediconsult.kr" type="email" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">연락처</Label>
                <Input id="phone" placeholder="010-0000-0000" type="tel" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="message">문의사항</Label>
                <Textarea id="message" placeholder="문의하실 내용을 입력해주세요" />
              </div>
              <Button className="w-full" size="lg">
                상담 신청하기
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

