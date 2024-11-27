
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

  const fileName = `${Date.now()}-${file.name}`;

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
