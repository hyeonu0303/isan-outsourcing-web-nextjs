'use client';

import HeaderWrapper from "@/components/header-wrapper";
import MainContainer from "@/components/main-container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarIcon, Clock, CheckCircle2 } from "lucide-react";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const timelineData = [
  {
    month: 1,
    weeks: [
      {
        week: 1,
        tasks: "사업계획 수립",
        details: "시장 조사, 경쟁 분석, 재무 계획 수립",
      },
      {
        week: 2,
        tasks: "부지 선정",
        details: "위치 선정, 임대차 계약 협상, 계약 체결",
      },
      {
        week: 3,
        tasks: "인테리어 업체 선정",
        details: "업체 비교, 견적 요청, 최종 선정",
      },
      {
        week: 4,
        tasks: "인테리어 설계",
        details: "컨셉 결정, 도면 작성, 자재 선택",
      },
    ],
  },
  {
    month: 2,
    weeks: [
      {
        week: 5,
        tasks: "의료장비 계획",
        details: "필요 장비 목록 작성, 공급업체 조사",
      },
      {
        week: 6,
        tasks: "인테리어 공사 시작",
        details: "철거 작업, 전기 및 설비 공사",
      },
      {
        week: 7,
        tasks: "의료장비 구매",
        details: "장비 주문, 납품 일정 조율",
      },
      {
        week: 8,
        tasks: "인력 채용",
        details: "채용 공고, 면접, 최종 선발",
      },
    ],
  },
  {
    month: 3,
    weeks: [
      {
        week: 9,
        tasks: "행정 절차",
        details: "의료기관 개설 신고, 각종 인허가 취득",
      },
      {
        week: 10,
        tasks: "운영 시스템 구축",
        details: "EMR 시스템 설치, 직원 교육",
      },
      {
        week: 11,
        tasks: "시운전",
        details: "장비 테스트, 업무 프로세스 점검",
      },
      {
        week: 12,
        tasks: "최종 점검",
        details: "안전 점검, 개원식 준비",
      },
    ],
  },
];

const TabContentLoader = () => (
  <div className="w-full h-96 flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
  </div>
);

// Timeline Component
const Timeline = ({ monthData }) => (
  <div className="space-y-8">
    {monthData.weeks.map((week, index) => (
      <div key={week.week} className="relative">
        <div className="flex items-start">
          <div className="flex-shrink-0 w-12 h-12 bg-main rounded-full flex items-center justify-center text-white font-bold text-md xl:w-16 xl:h-16 xl:text-lg">
            {week.week}주차
          </div>
          <div className="ml-6 flex-grow">
            <div className="bg-gray-50 p-4 rounded-lg shadow-md">
              <h3 className="text-md font-semibold mb-2 flex items-center">
                <CheckCircle2 className="mr-2 h-4 w-4 text-main" />
                {week.tasks}
              </h3>
              <p className="text-muted-foreground text-sm">{week.details}</p>
              <div className="mt-4 flex items-center text-sm text-muted-foreground">
                <CalendarIcon className="mr-2 h-4 w-4" />
                <span>{week.week}주차</span>
                <Clock className="ml-4 mr-2 h-4 w-4" />
                <span>예상 소요 시간: 1주</span>
              </div>
            </div>
          </div>
        </div>
        {index < monthData.weeks.length - 1 && (
          <div
            className="line absolute left-6 top-12 w-0.5 bg-main xl:left-8"
            style={{ height: "calc(100% + 16px)" }}
          />
        )}
      </div>
    ))}
  </div>
);

// TimelineTabs Component
function TimelineTabs() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeMonth, setActiveMonth] = useState(
    searchParams.get("month") || "1"
  );

  useEffect(() => {
    router.push(`?month=${activeMonth}`, { shallow: true });
  }, [activeMonth]);

  return (
    <Tabs value={activeMonth} onValueChange={setActiveMonth} className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger
          value="1"
          className="text-sm md:text-md font-semibold transition-colors"
        >
          1개월차
        </TabsTrigger>
        <TabsTrigger
          value="2"
          className="text-sm md:text-md font-semibold transition-colors"
        >
          2개월차
        </TabsTrigger>
        <TabsTrigger
          value="3"
          className="text-sm md:text-md font-semibold transition-colors"
        >
          3개월차
        </TabsTrigger>
      </TabsList>
      <div className="content-container flex flex-col xl:flex-row gap-[10px]">
        <div className="hidden xl:w-2/3 xl:block">
          <Suspense fallback={<TabContentLoader />}>
            <img
              src={`/image/calendar${activeMonth}.png`}
              alt={`${activeMonth}개월차 달력`}
              className="w-full h-auto"
            />
          </Suspense>
        </div>
        <Card className="w-full xl:w-1/3 mx-auto justify-between border-none">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-center">
              병원 개원 준비 타임라인
            </CardTitle>
          </CardHeader>
          <CardContent className="px-2">
            {timelineData.map((monthData) => (
              <TabsContent
                key={monthData.month}
                value={monthData.month.toString()}
              >
                <Suspense fallback={<TabContentLoader />}>
                  <Timeline monthData={monthData} />
                </Suspense>
              </TabsContent>
            ))}
          </CardContent>
        </Card>
      </div>
    </Tabs>
  );
}

export default function OpeningSchedule() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <HeaderWrapper
        title="개원 스케쥴러"
        subTitle="최고의 병원 컨설팅으로 보답하겠습니다"
      />
      <MainContainer>
        <div className="w-full h-full flex flex-col p-4">
          <Suspense fallback={<TabContentLoader />}>
            <TimelineTabs />
          </Suspense>
        </div>
      </MainContainer>
    </div>
  );
}