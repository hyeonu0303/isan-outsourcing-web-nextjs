"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight } from 'lucide-react'

export const SampleCeoMessage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-950">
        <CardContent className="p-0">
          <div className="grid md:grid-cols-12 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="md:col-span-5 p-8 md:p-12 flex flex-col justify-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                CEO <span className="text-main dark:text-main">인사말</span>
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                안녕하십니까, 저희 회사를 방문해 주셔서 감사합니다. 
                저희는 최고의 병원 컨설팅 서비스를 제공하기 위해 끊임없이 노력하고 있습니다. 
                고객의 성공이 곧 저희의 성공이라는 믿음으로, 항상 최선을 다하고 있습니다.
              </p>
              <Button variant="outline" className="self-start group">
                자세히 보기
                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="md:col-span-7 relative p-8"
            >
              <div className="relative w-full h-full min-h-[400px] rounded-tl-[100px] shadow-2xl overflow-hidden">
                <img
                  src="/image/ceo.png"
                  alt="CEO 홍길동"
                  className="absolute inset-0 w-full h-full object-cover object-center"
                />
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 p-6 rounded-tr-3xl shadow-xl"
              >
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">홍길동</h3>
                <p className="text-main">대표이사</p>
              </motion.div>
            </motion.div>
          </div>
        </CardContent>
      </Card>
      {/* <motion.blockquote
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="text-2xl md:text-3xl font-light text-gray-600 dark:text-gray-400 text-center mt-12 px-4"
      >
        "우리의 목표는 단순한 컨설팅을 넘어, <br className="hidden md:inline" />
        <span className="font-semibold text-main">의료 산업의 혁신</span>을 이끄는 것입니다."
      </motion.blockquote> */}
    </div>
  )
}

export default SampleCeoMessage;