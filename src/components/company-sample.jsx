import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronDown } from 'lucide-react'

export const CompanyHistorySample = () => {
  const history = [
    { year: '2024', events: ['신규 의료 AI 솔루션 출시', '서울 지사 설립'] },
    { year: '2023', events: ['의료 컨설팅 부문 대상 수상', '부산 지사 설립'] },
    { year: '2022', events: ['회사 설립', '병원 컨설팅 서비스 시작'] },
    { year: '2021', events: ['병원 컨설팅 서비스 시작'] },
    { year: '2020', events: ['병원 컨설팅 서비스 시작'] },
    { year: '2019', events: ['병원 컨설팅 서비스 시작'] },
  ]


  return (
    <div className="p-6 h-full">
      <div className="max-w-2xl mx-auto relative">
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-main"></div>
        {history.map(({ year, events }, index) => (
          <motion.div
            key={year}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="mb-8 relative"
          >
            <div 
              className="
              absolute left-[6px] w-6 h-6 bg-main rounded-full flex items-center justify-center cursor-pointer z-10
              md:left-0 md:w-8 md:h-8
            "
            >
              <ChevronDown className="w-5 h-5 text-white" />
            </div>
            <Card className="ml-12 shadow-lg hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-main mb-4">{year}</h3>
                <AnimatePresence>
                    <motion.ul
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-2"
                      id={`year-${year}-content`}
                    >
                      {events.map((event, eventIndex) => (
                        <motion.li
                          key={eventIndex}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: eventIndex * 0.1 }}
                          className="flex items-center text-gray-700 dark:text-gray-300"
                        >
                          <div className="w-2 h-2 bg-main rounded-full mr-3"></div>
                          <span className="text-gray-700 text-sm font-semibold dark:text-white">{event}</span>
                        </motion.li>
                      ))}
                    </motion.ul>
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

