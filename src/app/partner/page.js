
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import supabase from '@/lib/supabase';

export default function Partner() {
  const [title, setTitle] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const [partners, setPartners] = useState([]);
  const [image, setImage] = useState(null);
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const isAuthenticated = true; // 여기에 인증 검증 로직 삽입

      if (!isAuthenticated) {
        router.push('/access'); // 인증 실패 시 리다이렉트
      }
    };

    checkAuth();
  }, [router]);

  // 카테고리와 협력업체 데이터 불러오기
  const fetchData = async () => {
    const { data: categoryData, error: categoryError } = await supabase.from('categories').select('*');
    const { data: partnerData, error: partnerError } = await supabase.from('partner').select('*');

    if (categoryError || partnerError) {
      setError(categoryError?.message || partnerError?.message);
    } else {
      setCategories(categoryData);
      setPartners(partnerData);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 에러 표시
  if (error) {
    return <div>Error: {error}</div>;
  }

  // 데이터 수정 함수
  const handleEdit = (item) => {
    setEditId(item.id);
    setTitle(item.title);
    setCategoryId(item.category_id);
    setImage(null); // 이미지 초기화
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !categoryId) {
      setError('Title and category are required.');
      return;
    }

    if (editId) {
      // 수정 로직
      const updates = { title: title, category_id: categoryId };
      if (image) {
        const fileName = `${Date.now()}-${image.name}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('medi-partner')
          .upload(fileName, image);

        if (uploadError) {
          setError(`이미지 업로드 실패: ${uploadError.message}`);
          return;
        }
          // 업로드된 파일의 퍼블릭 URL 가져오기
        const publicUrlResponse = supabase.storage.from('medi-partner').getPublicUrl(fileName);
        const publicUrl = publicUrlResponse.data.publicUrl;
       
        console.log('Public URL:', publicUrl);
      
        updates.image_url = publicUrl; // 업데이트에 URL 추가
      }

      const { error } = await supabase.from('partner').update(updates).eq('id', editId);

      if (error) {
        setError(`수정 중 오류 발생: ${error.message}`);
      } else {
        setSuccessMessage('Partner updated successfully!');
        // 상태 직접 업데이트 (효율적 방식)
      setPartners((prevPartners) =>
      prevPartners.map((partner) =>
        partner.id === editId
          ? { ...partner, title, category_id: categoryId, image_url: updates.image_url || partner.image_url }
          : partner
      )
    );

    // 초기화
    setEditId(null);
    setTitle('');
    setCategoryId('');
    setImage(null);
  }
    } else {
      // 새 데이터 추가 로직
      const formData = new FormData();
      formData.append('title', title);
      formData.append('category_id', categoryId);
      formData.append('file', image);

      try {
        const response = await fetch('/api/upload-partner', {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();

        if (data.error) {
          setError(data.error);
        } else {
          setSuccessMessage('Partner added successfully!');
          setTitle('');
          setCategoryId('');
          setImage(null);
          await fetchData();
        }
      } catch (err) {
        console.error(err);
        setError('An error occurred during upload.');
      }
    }
  };

  // 데이터 삭제 함수
  const handleDelete = async (id) => {
    const { error } = await supabase.from('partner').delete().eq('id', id);

    if (error) {
      setError(`삭제 중 오류 발생: ${error.message}`);
    } else {
      setSuccessMessage('Partner deleted successfully!');
      fetchData(); // 삭제 후 데이터 다시 로드
    }
  };

  return (
    <div>
      <h1>협력업체 관리</h1>
      <div>
        {partners.map((item) => {
          const category = categories.find((cat) => cat.id === item.category_id); // 카테고리 찾기
          return (
            <div key={item.id} style={{ borderBottom: '1px solid #ccc', marginBottom: '10px', paddingBottom: '10px' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{item.title}</h2>
              <p>카테고리: {category ? category.name : '카테고리 없음'}</p>
              <p>타이틀: {item.title || '타이틀 없음'}</p>
              {item.image_url && (
                <img src={item.image_url} alt={item.title} style={{ width: 600, height: 400, marginBottom: '10px' }} />
              )}
              <button style={{ color: 'blue', marginRight: '10px' }} onClick={() => handleEdit(item)}>
                수정
              </button>
              <button style={{ color: 'red' }} onClick={() => handleDelete(item.id)}>
                삭제
              </button>
            </div>
          );
        })}
      </div>
      <form
        onSubmit={handleSubmit}
        style={{ border: '2px solid #000', borderRadius: '8px', padding: '16px', margin: '16px 0', width: '300px' }}
      >
        <input
          type="text"
          placeholder="Enter partner name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ marginBottom: '10px', width: '100%' }}
        />
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          style={{ marginBottom: '10px', width: '100%' }}
        >
          <option value="">카테고리 선택</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          style={{ marginBottom: '10px' }}
        />
        <button type="submit" style={{ color: 'red', width: '100%' }}>
          {editId ? '수정' : 'Upload'}
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'blue' }}>{successMessage}</p>}
    </div>
  );
}