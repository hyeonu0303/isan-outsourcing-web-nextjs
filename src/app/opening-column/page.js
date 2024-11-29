'use client';
import HeaderWrapper from "@/components/header-wrapper";
import MainContainer from "@/components/main-container";
import supabase from '@/lib/supabase';
import { useState, useEffect } from "react";
function ColumnUI({
  title,
  image_url,
  text
}) {
  return (
    <div className="w-full bg-gray-100 relative flex flex-col lg:flex-row mt-24 items-center lg:items-start rounded-lg">
      {/* 왼쪽 이미지 영역 */}
      <div className="w-full lg:w-1/3 relative p-4">
        <div className="relative -top-0 sm:-top-8 shadow-lg">
          <img
            src={image_url}
            alt="MakerMEDI 칼럼 이미지"
            className="w-full min-h-[300px] object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>
      {/* 오른쪽 텍스트 영역 */}
      <div className="flex-1 px-6 pb-6 w-full lg:p-6 mt-12">
        <h1 className="text-xl font-bold mb-2">{title}</h1>
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          {text}
        </p>
      </div>
    </div>
  );
}
export default function OpeningColumn() {

  const [columnData, setColumnData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await supabase.from('column').select('*');
      if (res.data) {
        setColumnData(res.data);
      }
    }
    fetchData();
  }, []);
    

  return (
    <div className="w-full h-full flex flex-col">
      <HeaderWrapper
        title="개원컬럼"
        subTitle="최고의 병원 컨설팅으로 보답하겠습니다"
      />
      <MainContainer>
        {
          columnData.map((column) => (
            <ColumnUI
              key={column.id}
              title={column.title}
              image_url={column.image_url}
              text={column.text}
            />
          )) 
        }
      </MainContainer>
    </div>
  );
}
