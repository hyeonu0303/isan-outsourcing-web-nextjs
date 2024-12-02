//hero-section.jsx
"use client";
import { motion } from "framer-motion";

export function HeroSection() {
  const text1 = "Make";
  const text2 = "MEDI";
  const description =
    "TEL:010-4513-1553 EMAIL:isanmedi@naver.com";

  return (
    <section className="relative w-full">
      <div
        className="
          relative min-h-[600px] flex flex-col items-center justify-center py-24 text-center bg-center bg-fixed
          lg:min-h-[700px] xl:min-h-[800px] 2xl:min-h-[900px]
        "
        style={{ backgroundImage: "url('/image/background-main.png')" }}
      >
        {/* <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" /> */}

        <div className="relative px-8 py-12">
          <motion.h1
            className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
          >
            <span className="text-white font-bold">
              {text1.split("").map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  {char}
                </motion.span>
              ))}
            </span>
            {/* 공백 추가 */}
            {/* Medi-Maker */}
            <span className="text-main font-bold"> {/* 또는 원하는 색상 클래스 */}
              {text2.split("").map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: (text1.length + index) * 0.05 }}
                >
                  {char}
                </motion.span>
              ))}
            </span>
          </motion.h1>

          <motion.p
            className="mx-auto mt-6 max-w-[600px] text-gray-100 md:text-xl font-bold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: (text1.length + text2.length) * 0.05 }}
          >
            {description}
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: (text1.length + text2.length) * 0.05 + 0.2 }}
          >
            <div className="w-16 h-2 bg-main">

            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}