
import supabase from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const formData = await request.formData();
  const file = formData.get('file');
  const title = formData.get('title');
  const categoryId = formData.get('category_id');

  if (!file || !title || !categoryId) {
    return NextResponse.json({ error: 'Title, category, and image are required.' }, { status: 400 });
  }

    // 파일명을 안전하게 변환
  const extension = file.name.split('.').pop(); // 확장자 추출
  const fileName = `${Date.now()}.${extension}`; // 타임스탬프 기반 파일명 생성

  // Supabase Storage에 파일 업로드
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('medi-partner')
    .upload(fileName, file);

  if (uploadError) {
    return NextResponse.json({ error: uploadError.message }, { status: 500 });
  }

  // 업로드된 파일의 퍼블릭 URL 가져오기
  const publicUrlResponse = supabase.storage.from('medi-partner').getPublicUrl(fileName);
  const publicUrl = publicUrlResponse.data.publicUrl;

  // 테이블에 데이터 삽입
  const { data, error } = await supabase.from('partner').insert([
    {
      title: title,
      category_id: categoryId,
      image_url: publicUrl,
    },
  ]);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: 'Partner added successfully!', data });
}
