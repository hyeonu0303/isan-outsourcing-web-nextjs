
'use client';

import { useState, useEffect } from 'react';
import supabase from '@/lib/supabase';

export default function PartnerUser() {
  const [categories, setCategories] = useState([]); // 카테고리 데이터
  const [partners, setPartners] = useState([]); // 협력업체 데이터
  const [error, setError] = useState('');

  // 데이터 불러오기
  const fetchData = async () => {
    try {
      // 카테고리 데이터 가져오기
      const { data: categoryData, error: categoryError } = await supabase.from('categories').select('*');
      if (categoryError) throw new Error(categoryError.message);

      // 협력업체 데이터 가져오기
      const { data: partnerData, error: partnerError } = await supabase.from('partner').select('*');
      if (partnerError) throw new Error(partnerError.message);

      setCategories(categoryData);
      setPartners(partnerData);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 에러 표시
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>협력업체 정보</h1>
      {categories.map((category) => (
        <div key={category.id} style={{ marginBottom: '30px' }}>
          <h2 className="text-2xl font-bold">{category.name}</h2>
          
          <div>
            {partners
              .filter((partner) => partner.category_id === category.id)
              .map((partner) => (
                <div key={partner.id} style={{ marginBottom: '10px' }}>
                  <h3>{partner.title}</h3>
                  {partner.image_url && (
                    <img src={partner.image_url} alt={partner.title} style={{ width: 100, height: 100 }} />
                  )}
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
