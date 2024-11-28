'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import supabase from '@/lib/supabase';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { ImagePlus, Save, Upload, X } from "lucide-react"
import { useToast } from '@/hooks/use-toast';

export default function ContentForm({ params }) {
  const parameters = use(params);
  const [order, setOrder] = useState(0);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const [currentImage, setCurrentImage] = useState('');
  const router = useRouter();
  const isEditing = parameters?.id !== undefined;
  const {toast} = useToast();

  useEffect(() => {
    if (isEditing) {
      fetchContent();
    }
  }, [parameters?.id]);

  const fetchContent = async () => {
    const { data, error } = await supabase
      .from('column')
      .select('*')
      .eq('id', parameters.id)
      .single();

    if (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message,
      })
      return;
    } else if (data) {
      setTitle(data.title);
      setText(data.text);
      setCurrentImage(data.image_url);
      setOrder(data.order);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      // 이미지 미리보기를 위한 URL 생성
      setCurrentImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !text) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: '제목과 본문은 필수입니다.',
      })
      return;
    }

    try {
      let imageUrl = currentImage;
      
      if (image) {
        const fileName = `${Date.now()}-${image.name}`;
        const { error: uploadError } = await supabase.storage
          .from('medi-photo')
          .upload(fileName, image);

        if (uploadError) throw uploadError;

        const publicUrlResponse = supabase.storage.from('medi-photo').getPublicUrl(fileName);
        imageUrl = publicUrlResponse.data.publicUrl;
      }

      if (isEditing) {
        const { error } = await supabase
          .from('column')
          .update({ title, text, image_url: imageUrl, order })
          .eq('id', parameters.id);
        
        if (error) return toast({
          variant: 'destructive',
          title: 'Error',
          description: error.message,
        })
      } else {
        const { error } = await supabase
          .from('column')
          .insert([{ title, text, image_url: imageUrl }]);
        
        if (error) return toast({
          variant: 'destructive',
          title: 'Error',
          description: error.message,
        })
      }

      router.push('/column');
      router.refresh();
    } catch (err) {
      toast({
        variant:"destructive",
        title:"Error",
        description:`오류가 발생했습니다 ${err.message}`,
      })
    }
  };

  return (
    <div className="container max-w-4xl mx-auto p-6">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">
            컬럼 수정
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="order">컬럼 순서</Label>
              <Input
                id="title"
                type="text"
                placeholder="칼럼의 순서를 입력해주세요."
                value={order}
                onChange={(e) => setOrder(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="title">제목</Label>
              <Input
                id="title"
                type="text"
                placeholder="제목 입력"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">본문</Label>
              <Textarea
                id="content"
                placeholder="본문을 입력해주세요."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="min-h-[200px] w-full"
              />
            </div>

            <div className="space-y-4">
              <Label>이미지 업로드</Label>
              <div className="flex items-center space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  className="gap-2"
                  onClick={() => document.getElementById('image-upload').click()}
                >
                  <ImagePlus className="w-4 h-4"/>
                  {image ? '재 업로드' : '이미지 변경하기'}
                </Button>
                <Input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>

              {currentImage && (
                <div className="relative w-full max-w-1/2">
                  <img
                    src={currentImage}
                    alt="Preview"
                    className="rounded-lg shadow-md w-[240px] h-auto object-contain"
                  />
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push('/column')}
                className="gap-2"
              >
                <X className="w-4 h-4" />
                취소
              </Button>
              <Button type="submit" className="gap-2 bg-main hover:bg-main/80">
                <Upload className="w-4 h-4" />
                업데이트
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}