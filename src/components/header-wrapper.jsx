import { Dot, House } from "lucide-react";

const HeaderWrapper = ({
  title = "개원컬럼",
  subTitle="최고의 병원 컨설팅으로 보답하겠습니다.",
}) => {
  return(
    <header className="
      w-full h-[300px] bg-main flex flex-col items-center justify-center relative
      md:h-[400px] lg:h-[500px]
    ">
      <h1 className="text-4xl md:text-5xl lg:text-6xl  text-white font-bold">{title}</h1>
      <p className="text-md md:text-lg text-white mt-4">{subTitle}</p>
      {/*  */}
      <div className="min-w-[50%] md:h-[70px] h-[60px] bg-white absolute bottom-0 left-0 rounded-tr-md flex items-center px-6">
        <House className="h-6 w-6 md:h-7 md:w-7 text-gray-800 inline-block"/>
        <Dot className="h-7 w-7 md:h-8 md:w-8 text-gray-800 inline-block"/>
        <p className="text-gray-800 font-bold text-lg xl:text-xl">{title}</p>
      </div>
    </header>
  )
}

export default HeaderWrapper;