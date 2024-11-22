"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  const text = "최고의 병원 경영 솔루션";
  const description =
    "20년 이상의 경험을 바탕으로 최적화된 병원 경영 컨설팅과 고품질 의료장비를 제공합니다";

  return (
    <section className="relative">
      <div
        className="relative container min-h-[800px] flex flex-col items-center justify-center py-24 text-center bg-cover bg-center bg-fixed"
        style={{ backgroundImage: "url('/image/main-about-img.jpeg')" }}
      >
        {/* 배경 오버레이 */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

        <div className="relative px-8 py-12">
          <motion.h1
            className="text-4xl font-bold tracking-tighter text-sky-400 sm:text-5xl md:text-6xl lg:text-7xl"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
          >
            {text.split("").map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                {char}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            className="mx-auto mt-6 max-w-[600px] text-gray-100 md:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: text.length * 0.05 }}
          >
            {description}
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: text.length * 0.05 + 0.2 }}
          >
            <Button
              size="lg"
              className="bg-white text-black hover:bg-white/90 transition-all duration-300"
            >
              무료 상담 신청
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-black hover:bg-white/20 transition-all duration-300"
            >
              서비스 소개
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
