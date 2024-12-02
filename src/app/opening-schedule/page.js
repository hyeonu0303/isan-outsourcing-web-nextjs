'use client';

import HeaderWrapper from "@/components/header-wrapper";
import MainContainer from "@/components/main-container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarIcon, Clock, CheckCircle2 } from "lucide-react";
import { Suspense } from "react";

const stepData = [
  {
    step: 1,
    title:"개원 계획 수립",
    subDescription: "개원 컨셉에 따른 준비",
    details: "개원예산,대출계획,개원시기등 큰틀의 기본계획을 함께 검토하고 일정수립을 하는단계입니다.",
  },
  {
    step: 2,
    title:"입지 선정",
    subDescription: "개원지 방향 및 선정",
    details: "상권/입지분석 및 경쟁분석을 통한 타당성 평가를 토대로 개원입지를 선정하고 선정된 상가의 임대료 조정을 마지막으로 계약까지 메이커메디가 함께합니다.",
  },
  {
    step: 3,
    title:"개원 준비 미팅",
    subDescription: "각종 업체미팅 및 선정",
    details: "인테리어,냉/난방,소방,철거등 각종업체 미팅일정을 조율해서 동종업종 2-3곳 미팅을 토대로 시공업체를 선정하는 단계입니다.",
  },
  {//
    step: 4,
    title:"개원 준비 실무공정",
    subDescription: "업체계약 및 교육",
    details: "인테리어, 냉난방기, 가구집기, 간판&CI, 전산 프로그램 설치 등",
  },
  {//
    step: 5,
    title:"인테리어 시작\n의료기기 구입",
    subDescription: "기기 업체별 비교 견적",
    details: "의료장비 리스트 작성 후, 업체별 계약(신품,중고) 및 입고 시운전",
  },
  {
    step: 6,
    title:"개원 준비 마무리\n직원채용",
    subDescription: "직원 구인 및 교육",
    details: "구인을 통해 면접 일정을 잡아서 함께 면접을 진행하고 직원을 준비하는 단계입니다.",
  },
  {
    step: 7,
    title:"온/오프라인 홍보 및 마케팅",
    subDescription: "지역 홍보 및 광고 시작",
    details: "개원30일전 현수막 광고를 시작으로 개원일정에 수렴하여 채널별 마케팅 송출을 시작하는 단계입니다.",
  },
  {
    step: 8,
    title:"허가 업무 및 진료시작",
    subDescription: "최종 점검 및 병원오픈",
    details: "의료기관개설신고, 유관기관온라인가입, 소방점검, 사업자등록등 각종 인허가 관련한 업무를 지원해 드립니다.",
  },
]

const timelineData = [
  {
    month: 1,
    weeks: [
      {
        week: 1,
        tasks: "초회미팅",
        details: "개원예정입지, 개원규모 및 예산 파악, 상호결정",
      },
      {
        week: 2,
        tasks: "입지선정, 사업자등록 발급, 자금준비",
        details: "상권분석/경쟁분석을 통한 입지 압축 후 임장을 통하여 최종입지선정, 임대차 계약(계약금납부), 사업자등록증 발급",
      },
      {
        week: 3,
        tasks: "입지선정, 사업자등록 발급, 자금준비, 관련업체 미팅",
        details: "대출신청, 인테리어/의료기기/냉난방/철거/소방/집기/EMR/보안 등 업체 미팅 시작",
      },
      {
        week: 4,
        tasks: "관련업체 미팅, 인테리어 공정시작",
        details: "업체비교, 견적요청, 최종선정, 납품 및 시공일정 조율, 도면작성 및 수정 시작",
      },
    ],
  },
  {
    month: 2,
    weeks: [
      {
        week: 5,
        tasks: "인테리어공정, 관련업체 미팅, 세무/노무/행정",
        details: "세무/노무사 선정, 인테리어 공정 진행, 컨셉결정(색상), 자재선택",
      },
      {
        week: 6,
        tasks: "인테리어공정, 온/오프라인 마케팅",
        details: "로고제작 및 현수막, 간판, 내부싸인물 선정, 인테리어 공사 진행",
      },
      {
        week: 7,
        tasks: "인테리어공정, 인력채용",
        details: "필요인력구성, 모집공고, 면접 후 인력채용, 인테리어 공사 진행",
      },
      {
        week: 8,
        tasks: "인테리어 공정, 원내 집기 및 비품결정",
        details: "유니폼, 베드, 정수기 등 원내 집기 렌탈/구매 결정 및 납품일정조율",
      },
    ],
  },
  {
    month: 3,
    weeks: [
      {
        week: 9,
        tasks: "인테리어 공정, 행정절차 및 홍보시작",
        details: "의료기관 개설신고, 각종인허가, 소방점검 등, 개원현수막게시",
      },
      {
        week: 10,
        tasks: "인테리어 공정, EMR 및 전산 구축",
        details: "EMR설치 및 내부전산망작업, 보안시스템, 차트준비 및 인쇄물결정",
      },
      {
        week: 11,
        tasks: "장비입고, 시운전, 가구배치, 약품세팅, 장비세팅 및 직원교육",
        details: "장비입고 및 시운전, 직원교육, 쇼파입고, 약제코딩",
      },
      {
        week: 12,
        tasks: "최종점검",
        details: "안전점검 및 개원준비",
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
  return (
    <Tabs className="w-full" defaultValue="1">
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
          <TabsContent value="1">
            <Suspense fallback={<TabContentLoader />}>
              <div className="py-10 px-16">
                <img
                  src="/image/1month.png"
                  alt="1개월차 달력"
                  className="w-full h-auto"
                />
              </div>
            </Suspense>
          </TabsContent>
          <TabsContent value="2">
            <Suspense fallback={<TabContentLoader />}>
              <div className="py-10 px-16">
                <img
                  src="/image/2month.png"
                  alt="2개월차 달력"
                  className="w-full h-auto"
                />
              </div>
            </Suspense>
          </TabsContent>
          <TabsContent value="3">
            <Suspense fallback={<TabContentLoader />}>
              <div className="py-10 px-16">
                <img
                  src="/image/3month.png"
                  alt="3개월차 달력"
                  className="w-full h-auto"
                />
              </div>
            </Suspense>
          </TabsContent>
        </div>
        <Card className="w-full xl:w-1/2 mx-auto justify-between border-none">
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
const StepScheduleCard = ({
  step,
  title,
  subDescription,
  details,
}) => {
  return (
    <Card className="border-[3px] border-main flex flex-col relative rounded-lg h-80">
      <div className="header-step mx-auto">
        <div className="step-number bg-main p-2 text-white font-bold rounded-b-md">
          STEP {step}
        </div>
      </div>
      <CardContent className="p-4 flex flex-col items-center h-full">
        {/* 제목 영역 - 고정 높이 */}
        <div className="h-16 flex items-center justify-center pt-5">
          <h3 className="text-xl font-semibold text-center whitespace-pre-line lg:text-2xl">
            {title}
          </h3>
        </div>
        
        {/* 서브 설명 영역 - 고정 높이 */}
        <div className="h-12 flex items-center justify-center mt-2">
          <p className="text-black text-lg font-medium text-center">
            {subDescription}
          </p>
        </div>
        
        {/* 상세 설명 영역 - 남은 공간 차지 */}
        <div className="flex-1 flex items-center justify-center mt-4">
          <p className="text-gray-700 text-md font-medium text-center">
            {details}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default function OpeningSchedule() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <HeaderWrapper
        title="개원 일정"
        subTitle="최고의 병원 컨설팅으로 보답하겠습니다"
      />
      <MainContainer>
        <div className="w-full h-full flex flex-col p-4 gap-28">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full gap-4">
            {
              stepData.map((step, index) => (
                <StepScheduleCard
                  key={index}
                  step={step.step}
                  title={step.title}
                  subDescription={step.subDescription}
                  details={step.details}
                />
              ))
            }
          </div>
          <Suspense fallback={<TabContentLoader />}>
            <TimelineTabs />
          </Suspense>
        </div>
      </MainContainer>
    </div>
  );
}