"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from 'lucide-react'

export const CeoMessage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative flex flex-col md:flex-row gap-8 items-center"
      >
        <div className="w-full md:w-1/2 aspect-[3/4] relative overflow-hidden rounded-2xl shadow-2xl">
          <img 
            src="/image/ceo.png" 
            alt="CEO 홍길동" 
            className="object-cover w-full h-full"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
            <h2 className="text-3xl font-bold text-white mb-2">홍길동</h2>
            <Badge variant="secondary" className="text-sm">대표이사</Badge>
          </div>
        </div>
        <Card className="w-full md:w-2/3 md:absolute right-0 top-1/2 md:-translate-y-1/2 bg-white/80 backdrop-blur-md shadow-xl">
          <CardContent className="p-8">
            <Badge variant="outline" className="mb-4">CEO 인사말</Badge>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-lg text-gray-700 leading-relaxed mb-6"
            >
              안녕하십니까, 저희 회사를 방문해 주셔서 감사합니다. 
              저희는 최고의 병원 컨설팅 서비스를 제공하기 위해 끊임없이 노력하고 있습니다. 
              고객의 성공이 곧 저희의 성공이라는 믿음으로, 항상 최선을 다하고 있습니다. 
              앞으로도 변함없는 신뢰와 혁신으로 의료계의 발전에 기여하겠습니다.
            </motion.p>
            <motion.blockquote 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-xl font-semibold text-gray-900 border-l-4 border-main pl-4 my-6"
            >
              "우리의 목표는 단순한 컨설팅을 넘어, 의료 산업의 혁신을 이끄는 것입니다."
            </motion.blockquote>
            {/* <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex items-center justify-end text-blue-600 hover:text-blue-800 transition-colors duration-200"
            >
              <span className="mr-2">자세히 보기</span>
              <ArrowRight size={20} />
            </motion.div> */}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

