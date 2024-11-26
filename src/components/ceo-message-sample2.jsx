"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Quote } from 'lucide-react'
import Image from 'next/image'

export const CeoMessageSample2 = () => {
  return (
    <div className="container mx-auto px-4 py-24">
      <div className="relative flex flex-col lg:flex-row gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full lg:w-2/5 aspect-[4/5] relative overflow-hidden rounded-3xl shadow-2xl"
        >
          <Image 
            src="/image/ceo.png" 
            alt="CEO 홍길동" 
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-700 hover:scale-105"
          />
          {/* <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          {/* <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="absolute bottom-0 left-0 right-0 p-8"
          >
            <h2 className="text-4xl font-bold text-white mb-2">홍길동</h2>
            <Badge variant="secondary" className="text-sm font-medium">대표이사</Badge>
          </motion.div> */} 
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
          className="w-full lg:w-3/5"
        >
          <Card className="bg-white/90 backdrop-blur-sm shadow-xl overflow-y-hidden">
            <CardContent className="p-8 lg:p-12">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="relative mb-8"
              >
                <Quote className="absolute top-0 left-0 text-gray-300 w-12 h-12 -translate-x-1/2 -translate-y-1/2" />
                <blockquote className="text-2xl font-semibold text-gray-900 pl-8 py-2 border-l-4 border-main">
                  &quot;우리의 목표는 단순한 컨설팅을 넘어, <span className="relative inline-block group">
                    <span className="relative z-10 px-2">의료 산업의 혁신</span>
                    <span className="absolute bottom-1 left-0 w-full h-3 bg-green-500/35 rounded-full" />
                  </span>을 이끄는 것입니다.&quot;
                </blockquote>
              </motion.div>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="text-lg text-gray-700 leading-relaxed mb-8"
              >
                안녕하십니까, 저희 회사를 방문해 주셔서 감사합니다. 
                저희는 최고의 병원 컨설팅 서비스를 제공하기 위해 끊임없이 노력하고 있습니다. 
                고객의 성공이 곧 저희의 성공이라는 믿음으로, 항상 최선을 다하고 있습니다. 
                앞으로도 변함없는 신뢰와 혁신으로 의료계의 발전에 기여하겠습니다.
                안녕하십니까, 저희 회사를 방문해 주셔서 감사합니다. 
                저희는 최고의 병원 컨설팅 서비스를 제공하기 위해 끊임없이 노력하고 있습니다. 
                고객의 성공이 곧 저희의 성공이라는 믿음으로, 항상 최선을 다하고 있습니다. 
                앞으로도 변함없는 신뢰와 혁신으로 의료계의 발전에 기여하겠습니다.
                안녕하십니까, 저희 회사를 방문해 주셔서 감사합니다. 
                저희는 최고의 병원 컨설팅 서비스를 제공하기 위해 끊임없이 노력하고 있습니다. 
                고객의 성공이 곧 저희의 성공이라는 믿음으로, 항상 최선을 다하고 있습니다. 
                앞으로도 변함없는 신뢰와 혁신으로 의료계의 발전에 기여하겠습니다.
                안녕하십니까, 저희 회사를 방문해 주셔서 감사합니다. 
                저희는 최고의 병원 컨설팅 서비스를 제공하기 위해 끊임없이 노력하고 있습니다. 
                고객의 성공이 곧 저희의 성공이라는 믿음으로, 항상 최선을 다하고 있습니다. 
                앞으로도 변함없는 신뢰와 혁신으로 의료계의 발전에 기여하겠습니다.
                안녕하십니까, 저희 회사를 방문해 주셔서 감사합니다. 
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="text-end"
              >
                <div className="flex justify-end items-center gap-8">
                  <p 
                    className="text-lg font-semibold"
                  >Medi-Maker 대표이사 홍길동</p>
                  <img
                    src="/image/sign-bg-remove.png"
                    alt="CEO 서명"
                    className="w-20 h-20 mt-2"
                  />

                </div>
              </motion.div>
              {/* <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="flex items-center justify-end"
              >
                <a href="#" className="group inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200">
                  <span className="mr-2 font-medium">자세히 보기</span>
                  <ArrowRight size={20} className="transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </motion.div> */}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

