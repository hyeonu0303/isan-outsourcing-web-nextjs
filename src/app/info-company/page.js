'use client'
import HeaderWrapper from "@/components/header-wrapper";
import MainContainer from "@/components/main-container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from 'next/navigation';
import { CeoMessage } from "@/components/ceo-message";
import { CompanyHistory } from "@/components/company-history";
import { CompanyOverview } from "@/components/company-overview";
import { SampleCeoMessage } from "@/components/sample-ceo-message";
import { CeoMessageSample2 } from "@/components/ceo-message-sample2";
import { CompanyHistorySample } from "@/components/company-sample";

export default function InfoCompany() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || "info-company");

  useEffect(() => {
    router.push(`?category=${activeCategory}`, { shallow: true });
  }, [activeCategory]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <HeaderWrapper
        title="회사소개"
        subTitle="최고의 병원 컨설팅으로 보답하겠습니다"
      />
      <MainContainer>
      <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full px-4">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger 
              value="info-ceo"
              className="text-md font-semibold transition-colors"
            >
              CEO 인사말
            </TabsTrigger>
            <TabsTrigger 
              value="info-company"
              className="text-md font-semibold transition-colors"
            >
              회사연혁
            </TabsTrigger>
            <TabsTrigger 
              value="company-overview"
              className="text-md font-semibold transition-colors"
            >
              기업개요
            </TabsTrigger>
          </TabsList>

          <div className="bg-white">
            <TabsContent value="info-ceo" className="flex flex-col xl:flex-row">
              {/* <CeoMessage /> */}
              {/* <SampleCeoMessage/> */}
              <CeoMessageSample2/>
            </TabsContent>

            <TabsContent value="info-company">
              {/* <CompanyHistory /> */}
              <CompanyHistorySample/>
            </TabsContent>

            <TabsContent value="company-overview">
              <CompanyOverview />
            </TabsContent>
          </div>
        </Tabs>
      </MainContainer>
    </div>
  );
}