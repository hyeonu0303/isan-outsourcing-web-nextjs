'use client';

import { useState, useEffect } from 'react';
import supabase from '@/lib/supabase';

export default function UploadContentUser() {
  const [col, setCol] = useState([]);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // 데이터 불러오기
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from('column').select('*');
      if (error) {
        setError(error.message);
      } else {
        setCol(data);
      }
    };

    fetchData();
  }, []);

  // 에러 표시
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Supabase Data</h1>
      <div>
        {col.map((item) => (
          <div key={item.id}>
            <h1>{item.title}</h1>
            <p>{item.text}</p> {/* 텍스트 렌더링 */}
            {item.image_url && <img src={item.image_url} style={{ width: 400, height:400 }} />}
          </div>
        ))}
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'blue' }}>{successMessage}</p>}
    </div>
  );
}
