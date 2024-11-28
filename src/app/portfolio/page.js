'use client'
import Image from "next/image"
import { motion } from "framer-motion"
import HeaderWrapper from "@/components/header-wrapper"
import MainContainer from "@/components/main-container"
import useEmblaCarousel from 'embla-carousel-react'
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { useState, useCallback, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const portfolioData = [
  {
    id: 1,
    imgUrl: [
      { src: "/portfolio/changwon/changwon1.jpeg", alt: "창원 서울가정의학과" },
      { src: "/portfolio/changwon/changwon2.jpeg", alt: "창원 서울가정의학과" },
      { src: "/portfolio/changwon/changwon3.jpeg", alt: "창원 서울가정의학과" },
      { src: "/portfolio/changwon/changwon4.jpeg", alt: "창원 서울가정의학과" },
      { src: "/portfolio/changwon/changwon5.jpeg", alt: "창원 서울가정의학과" },
      { src: "/portfolio/changwon/changwon6.jpeg", alt: "창원 서울가정의학과" },
    ],
    companyName: "창원 서울가정의학과",
    description: "",
  },
  {
    id: 2,
    imgUrl: [
      { src: "/portfolio/jung_endocrine_clinic/jung_endocrine1.jpeg", alt: "창원 정재훈 내과" },
      { src: "/portfolio/jung_endocrine_clinic/jung_endocrine2.jpeg", alt: "창원 정재훈 내과" },
      { src: "/portfolio/jung_endocrine_clinic/jung_endocrine3.jpeg", alt: "창원 정재훈 내과" },
      { src: "/portfolio/jung_endocrine_clinic/jung_endocrine4.jpeg", alt: "창원 정재훈 내과" },
      { src: "/portfolio/jung_endocrine_clinic/jung_endocrine5.jpeg", alt: "창원 정재훈 내과" },
      { src: "/portfolio/jung_endocrine_clinic/jung_endocrine6.jpeg", alt: "창원 정재훈 내과" },
      { src: "/portfolio/jung_endocrine_clinic/jung_endocrine7.jpeg", alt: "창원 정재훈 내과" },
      { src: "/portfolio/jung_endocrine_clinic/jung_endocrine8.jpeg", alt: "창원 정재훈 내과" },
      { src: "/portfolio/jung_endocrine_clinic/jung_endocrine9.jpeg", alt: "창원 정재훈 내과" },
      { src: "/portfolio/jung_endocrine_clinic/jung_endocrine1.jpeg", alt: "창원 정재훈 내과" },
      { src: "/portfolio/jung_endocrine_clinic/jung_endocrine11.jpeg", alt: "창원 정재훈 내과" },
      { src: "/portfolio/jung_endocrine_clinic/jung_endocrine12.jpeg", alt: "창원 정재훈 내과" },
      { src: "/portfolio/jung_endocrine_clinic/jung_endocrine13.jpeg", alt: "창원 정재훈 내과" },
      { src: "/portfolio/jung_endocrine_clinic/jung_endocrine14.jpeg", alt: "창원 정재훈 내과" },
    ],
    companyName: "창원 정재훈 내과",
    description: "",
  },
  {
    id: 3,
    imgUrl: [
      { src: "/portfolio/jinju_tamna/jinju_tamna1.jpeg", alt: "진주 탐나는B&S의원" },
      { src: "/portfolio/jinju_tamna/jinju_tamna2.jpeg", alt: "진주 탐나는B&S의원" },
      { src: "/portfolio/jinju_tamna/jinju_tamna3.jpeg", alt: "진주 탐나는B&S의원" },
      { src: "/portfolio/jinju_tamna/jinju_tamna4.jpeg", alt: "진주 탐나는B&S의원" },
      { src: "/portfolio/jinju_tamna/jinju_tamna5.jpeg", alt: "진주 탐나는B&S의원" },
      { src: "/portfolio/jinju_tamna/jinju_tamna6.jpeg", alt: "진주 탐나는B&S의원" },
      { src: "/portfolio/jinju_tamna/jinju_tamna7.jpeg", alt: "진주 탐나는B&S의원" },
    ],
    companyName: "진주 탐나는B&S의원",
    description: "",
  },
]

const CarouselArrowButton = ({ onClick, className, children, disabled }) => (
  <button
    onClick={onClick}
    className={`
      absolute top-1/2 -translate-y-1/2 z-1
      bg-white/90 hover:bg-white shadow-md
      w-10 h-10 rounded-full
      flex items-center justify-center
      transition-all duration-200
      disabled:opacity-50 disabled:cursor-not-allowed
      ${className}
    `}
    disabled={disabled}
  >
    {children}
  </button>
)

const DotButton = ({ selected, onClick }) => (
  <button
    className={`
      w-2 h-2 mx-1 rounded-full transition-all duration-200
      ${selected ? 'bg-main scale-125' : 'bg-gray-300 hover:bg-gray-400'}
    `}
    type="button"
    onClick={onClick}
  />
)

const PortfolioItem = ({ imgUrl, companyName, description }) => {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [initialSlideIndex, setInitialSlideIndex] = useState(0)
  const [selectedIndex, setSelectedIndex] = useState(0)
  
  // Main carousel
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'center',
    loop: false,
    dragFree: true,
    containScroll: 'trimSnaps',
  })
  
  // Dialog carousel
  const [dialogEmblaRef, dialogEmblaApi] = useEmblaCarousel({
    align: 'center',
    loop: true,
  })
  
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false)
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false)
  const [dialogPrevEnabled, setDialogPrevEnabled] = useState(false)
  const [dialogNextEnabled, setDialogNextEnabled] = useState(false)

  // Main carousel controls
  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])
  
  // Dialog carousel controls
  const dialogScrollPrev = useCallback(() => dialogEmblaApi && dialogEmblaApi.scrollPrev(), [dialogEmblaApi])
  const dialogScrollNext = useCallback(() => dialogEmblaApi && dialogEmblaApi.scrollNext(), [dialogEmblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setPrevBtnEnabled(emblaApi.canScrollPrev())
    setNextBtnEnabled(emblaApi.canScrollNext())
  }, [emblaApi])

  const onDialogSelect = useCallback(() => {
    if (!dialogEmblaApi) return
    setDialogPrevEnabled(dialogEmblaApi.canScrollPrev())
    setDialogNextEnabled(dialogEmblaApi.canScrollNext())
    setSelectedIndex(dialogEmblaApi.selectedScrollSnap())
  }, [dialogEmblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
  }, [emblaApi, onSelect])

  useEffect(() => {
    if (!dialogEmblaApi) return
    onDialogSelect()
    dialogEmblaApi.on('select', onDialogSelect)
  }, [dialogEmblaApi, onDialogSelect])

  useEffect(() => {
    if (dialogEmblaApi && dialogOpen) {
      dialogEmblaApi.scrollTo(initialSlideIndex)
      setSelectedIndex(initialSlideIndex)
    }
  }, [dialogEmblaApi, dialogOpen, initialSlideIndex])

  const openDialog = (index) => {
    setInitialSlideIndex(index)
    setDialogOpen(true)
  }

  const scrollTo = useCallback((index) => {
    dialogEmblaApi && dialogEmblaApi.scrollTo(index)
  }, [dialogEmblaApi])

  return (
    <div className="w-full mb-24 last:mb-0">
      <div className="max-w-6xl mx-auto">
        <div className="space-y-4 mb-8">
          <h2 className="text-xl font-bold text-gray-800 tracking-tight lg:text-2xl">
            {companyName}
          </h2>
          <p className="text-gray-600 text-md font-semibold lg:text-lg">
            {description}
          </p>
        </div>

        <div className="relative w-full bg-gradient-to-r from-gray-50 to-white p-8 rounded-2xl shadow-sm">
          <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
            <div className="flex gap-6">
              {imgUrl.map((img, index) => (
                <div
                  key={index}
                  className="flex-[0_0_300px] min-w-0 md:flex-[0_0_400px]"
                >
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card className="border-none shadow-lg overflow-hidden">
                      <CardContent className="relative p-0 aspect-square">
                        <Image
                          src={img.src}
                          alt={img.alt}
                          fill
                          className="object-cover cursor-pointer hover:opacity-90 transition-opacity"
                          onClick={() => openDialog(index)}
                        />
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          <CarouselArrowButton 
            onClick={scrollPrev} 
            className="left-4"
            disabled={!prevBtnEnabled}
          >
            <ChevronLeft className="w-6 h-6" />
          </CarouselArrowButton>

          <CarouselArrowButton 
            onClick={scrollNext} 
            className="right-4"
            disabled={!nextBtnEnabled}
          >
            <ChevronRight className="w-6 h-6" />
          </CarouselArrowButton>
        </div>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-7xl bg-gray-50 border-none p-0">
          <DialogTitle className="text-center text-xl font-bold text-gray-800 tracking-tight pt-5 lg:text-2xl">
            {companyName}
          </DialogTitle>
          <div className="relative">
            <div className="overflow-hidden" ref={dialogEmblaRef}>
              <div className="flex">
                {imgUrl.map((img, index) => (
                  <div key={index} className="flex-[0_0_100%] min-w-0">
                    <div className="flex justify-center items-center px-6 pb-6">
                      <div className="relative aspect-[4/3] w-full max-w-4xl">
                        <Image
                          src={img.src}
                          alt={img.alt}
                          fill
                          className="object-contain rounded-lg select-none"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <CarouselArrowButton 
              onClick={dialogScrollPrev} 
              className="left-4"
              disabled={!dialogPrevEnabled}
            >
              <ChevronLeft className="w-6 h-6" />
            </CarouselArrowButton>

            <CarouselArrowButton 
              onClick={dialogScrollNext} 
              className="right-4"
              disabled={!dialogNextEnabled}
            >
              <ChevronRight className="w-6 h-6" />
            </CarouselArrowButton>

            <div className="absolute bottom-4 left-0 right-0 flex justify-center items-center">
              <div className="px-3 py-1.5 backdrop-blur-sm">
                {imgUrl.map((_, index) => (
                  <DotButton
                    key={index}
                    selected={index === selectedIndex}
                    onClick={() => scrollTo(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default function Portfolio() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-white to-gray-50">
      <HeaderWrapper
        title="포트폴리오"
        subTitle="최고의 병원 컨설팅으로 보답하겠습니다"
      />
      <MainContainer>
        <div className="px-4 sm:px-6 lg:px-8 py-16">
          {portfolioData.map((item) => (
            <PortfolioItem
              key={item.id}
              imgUrl={item.imgUrl}
              companyName={item.companyName}
              description={item.description}
            />
          ))}
        </div>
      </MainContainer>
    </div>
  )
}