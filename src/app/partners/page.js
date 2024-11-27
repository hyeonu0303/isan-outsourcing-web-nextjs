'use client'

import { useState } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import HeaderWrapper from "@/components/header-wrapper"
import MainContainer from "@/components/main-container"
import { PartnersData } from "./__mock"

const categories = [
  { id: 1, name: "전체" },
  { id: 2, name: "부동산" },
  { id: 3, name: "인테리어" },
  { id: 4, name: "마케팅" },
  { id: 5, name: "의료기기" },
  { id: 6, name: "미용기기" },
  { id: 7, name: "냉난방" },
  { id: 8, name: "철거/소방" },
  { id: 9, name: "쇼파제작" },
  { id: 10, name: "각종 렌탈 관련" },
  { id: 11, name: "법정의무교육" },
]

const LogoScroll = ({ logos }) => {
  if (!logos || logos.length === 0) return null
  
  return (
    <div className="w-full py-2">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {[...logos].map((logo, index) => (
          <Card 
            key={`${logo.id}-${index}`} 
            className="bg-white shadow-md hover:shadow-lg transition-all duration-300 group"
          >
            <CardContent className="p-6 flex items-center justify-center h-28">
              {
                logo.imgUrl === "" || logo.imgUrl === null ? (
                  <div className="w-full text-center">
                    <p className="text-3xl font-bold text-gray-700 group-hover:text-blue-600 transition-colors duration-300">
                      {logo.name}
                    </p>
                  </div>
                ) : (
                  <img
                    src={logo.imgUrl}
                    alt={`Partner ${logo.id}`}
                    className="h-10 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                )
              }
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default function Partners() {
  return (
    <div className="flex h-full w-full flex-col">
      <HeaderWrapper
        title="협력업체"
        subTitle="최고의 병원 컨설팅으로 보답하겠습니다"
      />
      <MainContainer>
        <Tabs defaultValue="전체" className="w-full px-4">
          <div className="sticky top-0 bg-white z-10 pb-4">
            <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 lg:grid-cols-11 gap-2">
              {categories.map((cat) => (
                <TabsTrigger
                  value={cat.name}
                  key={cat.id}
                  className="text-sm md:text-md font-semibold transition-colors"
                >
                  {cat.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {categories.map((category) => (
            <TabsContent key={category.id} value={category.name}>
              <Card className="border-none shadow-none bg-transparent">
                <CardContent className="p-0 mt-4">
                  <LogoScroll
                    logos={
                      category.name === "전체"
                        ? PartnersData
                        : PartnersData.filter((logo) => logo.category === category.name)
                    }
                  />
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </MainContainer>
    </div>
  )
}