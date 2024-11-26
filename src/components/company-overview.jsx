export const CompanyOverview = () => {
  const details = [
    { label: '회사명', value: '메디컨설트' },
    { label: '설립일', value: '2022년 3월' },
    { label: '대표이사', value: '홍길동' },
    { label: '본사위치', value: '서울특별시 강남구' },
    { label: '주요사업', value: '병원 컨설팅, 의료 AI 솔루션, 경영 자문' },
    { label: '연락처', value: '02-1234-5678' },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">기업개요</h2>
      <div className="w-20 h-1 bg-main mb-6"></div>
      <div className="grid gap-4">
        {details.map(({ label, value }) => (
          <div key={label} className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="font-semibold text-gray-700">{label}</div>
            <div className="col-span-2 text-gray-600">{value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};