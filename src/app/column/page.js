
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import supabase from '@/lib/supabase';

export default function UploadContent() {
  const [title, setTitle] = useState('');
  const [text, setText] = useState(''); // 텍스트 입력 필드 추가
  const [col, setCol] = useState([]);
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


  // 데이터 불러오기
   const fetchData = async () => {
    const { data, error } = await supabase.from('column').select('*');
    if (error) {
      setError(error.message);
    } else {
      setCol(data);
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
    // 수정 모드로 전환
    setEditId(item.id);
    setTitle(item.title);
    setText(item.text);
    setImage(null); // 이미지 초기화 (필요 시 기존 이미지 유지 로직 추가 가능)
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !text) {
      setError('Title and text are required.');
      return;
    }
    if (editId) {
      // 수정 로직
      const updates = { title, text };
      if (image) {
        // 새 이미지를 업로드한 경우 처리
        const fileName = `${Date.now()}-${image.name}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('medi-photo')
          .upload(fileName, image);

        if (uploadError) {
          setError(`이미지 업로드 실패: ${uploadError.message}`);
          return;
        }

        const publicUrlResponse = supabase.storage.from('medi-photo').getPublicUrl(fileName);
        const publicUrl = publicUrlResponse.data.publicUrl; // 퍼블릭 URL 추출  
        updates.image_url = publicUrl;
      }

      const { error } = await supabase.from('column').update(updates).eq('id', editId);

      if (error) {
        setError(`수정 중 오류 발생: ${error.message}`);
      } else {
        setSuccessMessage('Content updated successfully!');
        setEditId(null); // 수정 모드 종료
        setTitle('');
        setText('');
        setImage(null);
        await fetchData();
      }
    } else {
      // 새 데이터 추가 로직
      const formData = new FormData();
      formData.append('title', title);
      formData.append('text', text);
      formData.append('file', image);

      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();

        if (data.error) {
          setError(data.error);
        } else {
          setSuccessMessage('Content uploaded successfully!');
          setTitle('');
          setText('');
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
      const { error } = await supabase.from('column').delete().eq('id', id);
  
      if (error) {
        setError(`삭제 중 오류 발생: ${error.message}`);
      } else {
        setSuccessMessage('Content deleted successfully!');
        fetchData(); // 삭제 후 데이터 다시 로드
      }
    };


    return (
      <div>
        <h1>(개원입지) Medi-Maker와 함께 알아보는 개원입지 Process
1) 메디메이커 협력 부동산 법인을 통해 개원을 고려하는 지역내에 신규 메디컬빌딩 리스트를 통하여 3군데 정도로 개원 입지를 구체화한다.
2) 상가건물을 중개하는 부동산 미팅을 통하여 계획중이던 병원의 규모나 비용과 관련한 부분 들을 체크한다.
3) 임장을 통하여 건물의 장/단점 및 인근 상권이나, 배후세대, 유동인구, 경쟁분석을 통한 주변 병원의 데이터등을 종합적으로 파악한다. (본 자료는 메디메이커에서 제공합니다)
4) 개원장소를 정하고 최종적으로 부동산 등기부등본 및 권리 관계에 문제가 없는 상가인지 최종으로 검토한다.
5) 부동산 계약을 시작으로 오픈의 첫 걸음이 시작된다.
저희 메디메이커는 창원부동산법인 및 인근지역 부동산법인과의 협력관계를 통하여 지역내에 신규오픈하는 메디컬상가에 관한 정보를 빠르게 접하고 해당 상가주 및 건축주와의 소통을 통 하여 선생님들께 가장 빠르고 정확한 정보를 드리기위해 항상 준비중에 있습니다.</h1>
        <div>
          {col.map((item) => (
            <div key={item.id}>
              <h1>{item.title}</h1>
              <p>{item.text}</p>
              {item.image_url && <img src={item.image_url} style={{ width: 600, height: 400 }} />}
              <button
                style={{ color: 'blue', marginRight: '10px' }}
                onClick={() => handleEdit(item)} // 수정 버튼
              >
                수정
              </button>
              <button
                style={{ color: 'red' }}
                onClick={() => handleDelete(item.id)} // 삭제 버튼
              >
                삭제
              </button>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit}
        style={{border: '2px solid #000', borderRadius: '8px', padding: '16px', margin:'16px 0',width:'300px'}}>
          <input
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Enter text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <button type="submit" style={{ color: 'red' }}>
            {editId ? '수정' : 'Upload'}
          </button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {successMessage && <p style={{ color: 'blue' }}>{successMessage}</p>}
      </div>
    );
  }
