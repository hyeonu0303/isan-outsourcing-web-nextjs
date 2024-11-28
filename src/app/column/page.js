'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import supabase from '@/lib/supabase';
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from '@/hooks/use-toast';

export default function ContentList() {
  const [col, setCol] = useState([]);
  const [error, setError] = useState('');
  const router = useRouter();
  const {toast} = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      const isAuthenticated = true;
      if (!isAuthenticated) {
        router.push('/access');
      }
    };
    checkAuth();
    fetchData();
  }, [router]);

  const fetchData = async () => {
    const { data, error } = await supabase.from('column').select('*');
    if (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message,
      })
      return;
    } else {
      setCol(data);
    }
  };

  const handleEdit = (id) => {
    router.push(`/column/edit/${id}`);
  };

  const handleDelete = async (id) => {
    const { error } = await supabase.from('column').delete().eq('id', id);
    if (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message,
      })
      return;
    }
    if (editId) {
      // 수정 로직
      const updates = { title, text };
      if (image) {
        // 새 이미지를 업로드한 경우 처리
        const extension = image.name.split('.').pop(); // 확장자 추출
        const fileName = `${Date.now()}.${extension}`; // 타임스탬프 기반 파일명 생성
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
      fetchData();
    }
  };

  const sortedCol = col.sort((a, b) => new Date(a.order) - new Date(b.order));

  return (
    
      <div className="w-full h-full p-20">
        <h1 className="text-2xl font-bold mb-4">컬럼 리스트</h1>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-md">순서</TableHead>
              <TableHead className="text-md">제목</TableHead>
              <TableHead className="text-md">본문</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedCol.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="min-w-16">{item.order}</TableCell>
                <TableCell className="min-w-72">{item.title}</TableCell>
                <TableCell className="line-clamp-1">{item.text}</TableCell>
                <TableCell className="min-w-40">
                  <Button variant="outline" className="mr-2" onClick={() => handleEdit(item.id)}>수정</Button>
                  <Button variant="destructive" onClick={() => handleDelete(item.id)}>삭제</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button className="mt-4 bg-main hover:bg-main/80 justify-end" onClick={() => router.push('/column/new')}>새 칼럼 추가하기</Button>
      </div>
  );
}