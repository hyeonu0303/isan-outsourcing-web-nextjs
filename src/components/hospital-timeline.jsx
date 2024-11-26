"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronRight, CalendarIcon, Clock, CheckCircle2 } from 'lucide-react'

const timelineData = [
  { 
    month: 1,
    weeks: [
      { week: 1, tasks: "사업계획 수립", details: "시장 조사, 경쟁 분석, 재무 계획 수립" },
      { week: 2, tasks: "부지 선정", details: "위치 선정, 임대차 계약 협상, 계약 체결" },
      { week: 3, tasks: "인테리어 업체 선정", details: "업체 비교, 견적 요청, 최종 선정" },
      { week: 4, tasks: "인테리어 설계", details: "컨셉 결정, 도면 작성, 자재 선택" },
    ]
  },
  {
    month: 2,
    weeks: [
      { week: 5, tasks: "의료장비 계획", details: "필요 장비 목록 작성, 공급업체 조사" },
      { week: 6, tasks: "인테리어 공사 시작", details: "철거 작업, 전기 및 설비 공사" },
      { week: 7, tasks: "의료장비 구매", details: "장비 주문, 납품 일정 조율" },
      { week: 8, tasks: "인력 채용", details: "채용 공고, 면접, 최종 선발" },
    ]
  },
  {
    month: 3,
    weeks: [
      { week: 9, tasks: "행정 절차", details: "의료기관 개설 신고, 각종 인허가 취득" },
      { week: 10, tasks: "운영 시스템 구축", details: "EMR 시스템 설치, 직원 교육" },
      { week: 11, tasks: "시운전", details: "장비 테스트, 업무 프로세스 점검" },
      { week: 12, tasks: "최종 점검", details: "안전 점검, 개원식 준비" },
    ]
  }
]

export default function HospitalTimeline() {
  const [activeMonth, setActiveMonth] = useState("1")

  return (
    <Tabs value={activeMonth} onValueChange={setActiveMonth} className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="1">1개월차</TabsTrigger>
        <TabsTrigger value="2">2개월차</TabsTrigger>
        <TabsTrigger value="3">3개월차</TabsTrigger>
      </TabsList>
    <Card className="w-full max-w-4xl mx-auto min-h-screen">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-center">병원 개원 준비 타임라인</CardTitle>
      </CardHeader>
      <CardContent>
          {timelineData.map((monthData) => (
            <TabsContent key={monthData.month} value={monthData.month.toString()}>
              <ScrollArea className="h-[700px] pr-4">
                <div className="space-y-8">
                  {monthData.weeks.map((week, index) => (
                    <div key={week.week} className="relative">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-xl">
                          {week.week}주차
                        </div>
                        <div className="ml-6 flex-grow">
                          <div className="bg-muted p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold mb-2 flex items-center">
                              <CheckCircle2 className="mr-2 h-5 w-5 text-green-500" />
                              {week.tasks}
                            </h3>
                            <p className="text-muted-foreground">{week.details}</p>
                            <div className="mt-4 flex items-center text-sm text-muted-foreground">
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              <span>{monthData.month}월 {week.week}주</span>
                              <Clock className="ml-4 mr-2 h-4 w-4" />
                              <span>예상 소요 시간: 1주</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      {index < monthData.weeks.length - 1 && (
                        <div className="absolute left-8 top-16 w-0.5 h-8 bg-primary" />
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          ))}
      </CardContent>
    </Card>
    </Tabs>
  )
}
