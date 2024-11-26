import HeaderWrapper from "@/components/header-wrapper";
import MainContainer from "@/components/main-container";

function ColumnUI() {
  return (
    <div className="w-full bg-gray-100 relative flex flex-col lg:flex-row mt-24 items-center lg:items-start rounded-lg">
      {/* 왼쪽 이미지 영역 */}
      <div className="w-full lg:w-1/3 relative p-4">
        <div className="relative -top-0 sm:-top-8 shadow-lg">
          <img
            src="https://media.istockphoto.com/id/178447404/photo/modern-business-buildings.jpg?s=612x612&w=0&k=20&c=MOG9lvRz7WjsVyW3IiQ0srEzpaBPDcc7qxYsBCvAUJs="
            alt="회사 이미지"
            className="w-full min-h-[300px] object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>
      {/* 오른쪽 텍스트 영역 */}
      <div className="flex-1 px-6 pb-6 w-full lg:p-6 mt-12">
        <h1 className="text-xl font-bold mb-2">회사소개</h1>
        <p className="text-gray-500 leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
          pharetra malesuada magna, id sagittis urna aliquam at.
        </p>
      </div>
    </div>
  );
}
export default async function OpeningColumn() {
  return (
    <div className="w-full h-full flex flex-col">
      <HeaderWrapper
        title="개원컬럼"
        subTitle="최고의 병원 컨설팅으로 보답하겠습니다"
      />
      <MainContainer>
        <ColumnUI />
        <ColumnUI />
        <ColumnUI />
        <ColumnUI />
      </MainContainer>
    </div>
  );
}
