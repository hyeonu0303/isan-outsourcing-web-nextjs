//stats-section.jsx
import Link from "next/link"
const sectionUrlWithImg = [
  {
    id:1,
    img:"/image/section1.png",
    categroy:"인사말",
    link:"/info-company"
  },
  {
    id:2,
    img:"/image/section2.png",
    categroy:"개원 일정",
    link:"/opening-schedule"
  },
  {
    id:3,
    img:"/image/section3.png",
    categroy:"개원 컬럼",
    link:"/opening-column"
  },
  {
    id:4,
    img:"/image/section4.png",
    categroy:"포트폴리오",
    link:"/portfolio"
  },
  {
    id:5,
    img:"/image/section5.png",
    categroy:"협력업체",
    link:"/partners"
  }
]

export function StatsSection() {
  return (
    <div className="w-full h-full flex items-center justify-center my-6">
      <section className="w-full h-full grid grid-cols-2 gap-5 p-6 sm:grid-cols-5 lg:grid-cols-5 place-items-center">
          {sectionUrlWithImg.map((section) => (
          <Link href={section.link} key={section.id} className="text-center flex flex-col items-center">
            <img
              src={section.img}
              alt={section.alt || `section-${section.id}`}
              className="
                w-28 h-28 rounded-full
                xl:w-32 xl:h-32
              "
            />
            <h3 className="text-md font-bold mt-2 md:text-lg">{section.categroy}</h3>
          </Link>
        ))}
      </section>
    </div>
  )
}


