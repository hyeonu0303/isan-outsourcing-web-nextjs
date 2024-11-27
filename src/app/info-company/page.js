'use client';

import HeaderWrapper from "@/components/header-wrapper";
import MainContainer from "@/components/main-container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from 'next/navigation';
import { CompanyOverview } from "@/components/company-overview";
import { CeoMessageSample2 } from "@/components/ceo-message-sample2";
import { CompanyHistorySample } from "@/components/company-sample";

const TabContentLoader = () => (
  <div className="w-full h-96 flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
  </div>
);

// Tabs Component
function CompanyTabs() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState(
    searchParams.get('category') || "info-company"
  );

  useEffect(() => {
    router.push(`?category=${activeCategory}`, { shallow: true });
  }, [activeCategory]);

  return (
    <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full px-4">
      <TabsList className="grid w-full grid-cols-3 mb-8">
        <TabsTrigger 
          value="info-ceo"
          className="text-sm md:text-md font-semibold transition-colors"
        >
          CEO 인사말
        </TabsTrigger>
        <TabsTrigger 
          value="info-company"
          className="text-sm md:text-md font-semibold transition-colors"
        >
          회사연혁
        </TabsTrigger>
        <TabsTrigger 
          value="company-overview"
          className="text-sm md:text-md font-semibold transition-colors"
        >
          기업개요
        </TabsTrigger>
      </TabsList>

      <div className="bg-white">
        <TabsContent value="info-ceo" className="flex flex-col xl:flex-row">
          <Suspense fallback={<TabContentLoader />}>
            <CeoMessageSample2 />
          </Suspense>
        </TabsContent>

        <TabsContent value="info-company">
          <Suspense fallback={<TabContentLoader />}>
            <CompanyHistorySample />
          </Suspense>
        </TabsContent>

        <TabsContent value="company-overview">
          <Suspense fallback={<TabContentLoader />}>
            <CompanyOverview />
          </Suspense>
        </TabsContent>
      </div>
    </Tabs>
  );
}

export default function InfoCompany() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <HeaderWrapper
        title="회사소개"
        subTitle="최고의 병원 컨설팅으로 보답하겠습니다"
      />
      <MainContainer>
        <Suspense fallback={<TabContentLoader />}>
          <CompanyTabs />
        </Suspense>
      </MainContainer>
    </div>
  );
}