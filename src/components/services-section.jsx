import { Building2, Stethoscope, Users } from 'lucide-react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function ServicesSection() {
  return (
    <section id="services" className="border-t">
      <div className="container py-12 md:py-24">
        <div className="mx-auto max-w-[800px] text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">전문적인 서비스</h2>
          <p className="mt-4 text-gray-500 md:text-lg">
            병원 경영 컨설팅부터 의료장비 공급까지, 병원 운영에 필요한 모든 서비스를 제공합니다
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          <Card>
            <CardHeader>
              <Building2 className="h-10 w-10" />
              <CardTitle className="mt-4">병원 경영 컨설팅</CardTitle>
              <CardDescription>효율적인 병원 운영을 위한 맞춤형 컨설팅 서비스</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-inside list-disc space-y-2 text-sm text-gray-500">
                <li>운영 효율화</li>
                <li>수익성 개선</li>
                <li>마케팅 전략</li>
                <li>환자 서비스 향상</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Stethoscope className="h-10 w-10" />
              <CardTitle className="mt-4">의료장비 도매</CardTitle>
              <CardDescription>고품질 의료장비 공급 및 유지보수</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-inside list-disc space-y-2 text-sm text-gray-500">
                <li>최신 의료장비</li>
                <li>경쟁력 있는 가격</li>
                <li>신속한 납품</li>
                <li>전문 유지보수</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Users className="h-10 w-10" />
              <CardTitle className="mt-4">인력 관리</CardTitle>
              <CardDescription>전문 의료 인력 채용 및 교육 지원</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-inside list-disc space-y-2 text-sm text-gray-500">
                <li>인력 채용</li>
                <li>직원 교육</li>
                <li>조직 문화 개선</li>
                <li>업무 효율화</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

