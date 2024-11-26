"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

export const CompanyHistory = () => {
  const history = [
    { year: '2024', events: ['신규 의료 AI 솔루션 출시', '서울 지사 설립'] },
    { year: '2023', events: ['의료 컨설팅 부문 대상 수상', '부산 지사 설립'] },
    { year: '2022', events: ['회사 설립', '병원 컨설팅 서비스 시작'] },
  ]

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6 text-center">회사연혁</h2>
      <div className="max-w-3xl mx-auto relative">
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-main"></div>
        {history.map(({ year, events }, index) => (
          <motion.div
            key={year}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className={`mb-8 flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
          >
            <Card className={`w-1/2 ${index % 2 === 0 ? 'mr-8' : 'ml-8'} shadow-lg hover:shadow-xl transition-shadow duration-300`}>
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-main mb-4">{year}</h3>
                <ul className="space-y-2">
                  {events.map((event, eventIndex) => (
                    <motion.li
                      key={eventIndex}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: (index * 0.2) + (eventIndex * 0.1) }}
                      className="text-gray-700 dark:text-gray-300"
                    >
                      {event}
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

