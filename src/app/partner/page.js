'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Edit, Trash2, Upload, X, Settings } from 'lucide-react'
import supabase from '@/lib/supabase'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { useToast } from '@/hooks/use-toast'

export default function PartnerManagement() {
  const [partners, setPartners] = useState([])
  const [categories, setCategories] = useState([])
  const [title, setTitle] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [image, setImage] = useState(null)
  const [editId, setEditId] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [newCategoryName, setNewCategoryName] = useState('')
  const [editingCategory, setEditingCategory] = useState(null)
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false)
  const {toast} = useToast();

  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      const isAuthenticated = true // Replace with actual auth check
      if (!isAuthenticated) {
        router.push('/access')
      }
    }
    checkAuth()
    fetchData()
  }, [router])

  useEffect(() => {
    if (image) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(image)
    } else {
      setImagePreview(null)
    }
  }, [image])

  const fetchData = async () => {
    try {
      const { data: categoryData, error: categoryError } = await supabase.from('categories').select('*')
      const { data: partnerData, error: partnerError } = await supabase.from('partner').select('*')

      if (categoryError) {
        toast({ variant: 'destructive', title: 'Error', description: categoryError.message })
        return;
      }
      if (partnerError) {
        toast({ variant: 'destructive', title: 'Error', description: partnerError.message })
        return;
      }
      

      const sortedCategories = categoryData ? [...categoryData].sort((a, b) => a.name.localeCompare(b.name)) : []
      setCategories(sortedCategories || [])
      setPartners(partnerData || [])
    } catch (err) {
      toast({ variant: 'destructive', title: 'Error', description: err.message })
      return;
    }
  }

  const getGroupedPartners = () => {
    const grouped = {}
    
    // 먼저 모든 카테고리에 대해 빈 배열 초기화
    categories.forEach(category => {
      grouped[category.id] = []
    })
    
    // partners를 해당하는 카테고리에 할당
    partners.forEach(partner => {
      if (grouped[partner.category_id]) {
        grouped[partner.category_id].push(partner)
      }
    })
    
    return grouped
  }

  const groupedPartners = getGroupedPartners()

  const handleEdit = (partner) => {
    setEditId(partner.id)
    setTitle(partner.title)
    setCategoryId(partner.category_id)
    setImage(null)
    setImagePreview(partner.image_url)
  }

  const handleCancel = () => {
    setEditId(null)
    setTitle('')
    setCategoryId('')
    setImage(null)
    setImagePreview(null)
  }

  const handleImageDelete = async () => {
    if (editId) {
      try {
        const { error } = await supabase
          .from('partner')
          .update({ image_url: '' })
          .eq('id', editId)
  
        if (error) {
          toast({ variant: 'destructive', title: 'Error', description: error.message })
          return
        }
  
        setImage(null)
        setImagePreview(null)
        
        // 파트너 목록 업데이트
        setPartners(prevPartners =>
          prevPartners.map(partner =>
            partner.id === editId
              ? { ...partner, image_url: '' }
              : partner
          )
        )
  
        toast({ 
          variant: 'success', 
          title: 'Success', 
          description: '이미지가 성공적으로 삭제되었습니다.'
        })
      } catch (err) {
        toast({ variant: 'destructive', title: 'Error', description: err.message })
      }
    } else {
      // 새로운 파트너 등록 시에는 단순히 상태만 초기화
      setImage(null)
      setImagePreview(null)
    }
  }

  const handleDelete = async (id) => {
    try {
      const { error } = await supabase.from('partner').delete().eq('id', id)
      if (error) {
        toast({ variant: 'destructive', title: 'Error', description: error.message })
        return;
      }
      
      toast({ variant: 'success', title: 'Success', description: '파트너 정보가 성공적으로 삭제되었습니다.'})
      fetchData()
    } catch (err) {
      toast({ variant: 'destructive', title: 'Error', description: err.message })
    }
  }

  const handleAddCategory = async () => {
    try {
      if (!newCategoryName.trim()) {
        toast({ variant: 'destructive', title: 'Error', description: '카테고리 이름을 입력해주세요.'})
        return;
      }

      const isDuplicate = categories.some(
        category => category.name.toLowerCase() === newCategoryName.trim().toLowerCase()
      );
  
      if (isDuplicate) {
        toast({ 
          variant: 'destructive', 
          title: 'Error', 
          description: '이미 존재하는 카테고리 이름입니다.'
        })
        return;
      }

      const { data, error } = await supabase
        .from('categories')
        .insert({ name: newCategoryName.trim() })
        .select();

      if (error) {
        toast({ variant: 'destructive', title: 'Error', description: error.message })
        return;
      }

      setCategories([...categories, data[0]])
      toast({ variant: 'success', title: 'Success', description: '새로운 카테고리가 추가되었습니다.'})
      
    } catch (err) {
      toast({ variant: 'destructive', title: 'Error', description: err.message })
    }
  }

  const handleEditCategory = async (category) => {
    try {
      if (!newCategoryName.trim()) {
        throw new Error('카테고리 이름을 입력해주세요.')
      }

      const { error } = await supabase
        .from('categories')
        .update({ name: newCategoryName.trim() })
        .eq('id', category.id)

      if (error) {
        toast({ variant: 'destructive', title: 'Error', description: error.message })
        return;
      }

      setCategories(categories.map(cat => 
        cat.id === category.id ? { ...cat, name: newCategoryName.trim() } : cat
      ))
      setNewCategoryName('')
      setEditingCategory(null)
      toast({
        variant: 'success',
        title: '카테고리 수정 성공',
        description: '카테고리가 성공적으로 수정되었습니다'
      })
    } catch (err) {
      toast({ variant: 'destructive', title: 'Error', description: err.message })
    }
  }

  const handleDeleteCategory = async (categoryId) => {
    try {
      // 해당 카테고리를 사용하는 파트너가 있는지 확인
      const partnersUsingCategory = partners.filter(
        partner => partner.category_id === categoryId
      )

      if (partnersUsingCategory.length > 0) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: '해당 카테고리를 사용하는 파트너가 있습니다.',
        })
        return;
      }

      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', categoryId)

      if (error) throw error

      setCategories(categories.filter(cat => cat.id !== categoryId))
      toast({
        variant: 'success',
        title: '카테고리 삭제 성공',
        description: '카테고리가 성공적으로 삭제되었습니다'
      })
    } catch (err) {
      toast({ variant: 'destructive', title: 'Error', description: err.message })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (!title || !categoryId) {
        toast({ variant: 'destructive', title: 'Error', description: '업체명과 카테고리는 필수입니다.'})
        return;
      }
      
      if (editId) {
        const updates = { title, category_id: parseInt(categoryId, 10) }
        
        
        if (image) {
          const extension = image.name.split('.').pop(); // 파일 확장자 추출
        const fileName = `${Date.now()}.${extension}`;
          const { error: uploadError } = await supabase.storage
            .from('medi-partner')
            .upload(fileName, image)
          
          if (uploadError) {
            toast({ variant: 'destructive', title: 'Error', description: uploadError.message })
            return;
          }
          
          const publicUrlResponse = supabase.storage.from('medi-partner').getPublicUrl(fileName)
          updates.image_url = publicUrlResponse.data.publicUrl
        }

        const { error } = await supabase.from('partner').update(updates).eq('id', editId)
        if (error) {
          toast(({ variant: 'destructive', title: 'Error', description: error.message })) 
          return;
        }

        toast({ variant: 'success', title: 'Success', description: '파트너 정보가 성공적으로 수정되었습니다.'})
        setPartners(prevPartners =>
          prevPartners.map(partner =>
            partner.id === editId
              ? { ...partner, ...updates }
              : partner
          )
        )

        handleCancel()
      } else {
        const formData = new FormData()
        formData.append('title', title)
        formData.append('category_id', categoryId)
        formData.append('file', image)

        const response = await fetch('/api/upload-partner', {
          method: 'POST',
          body: formData,
        })

        const data = await response.json()
        if (!response.ok) {
          toast({ variant: 'destructive', title: 'Error', description: data.message || '파트너 등록에 실패했습니다.' })
          return;
        }

        toast({ variant: 'success', title: 'Success', description: '파트너가 성공적으로 등록되었습니다.'})
        handleCancel()
        await fetchData()
      }
      
    } catch (err) {
      toast({ variant: 'destructive', title: 'Error', description: err.message })
    }
  }

  const defaultCategory = categories.length > 0 ? categories[0].id.toString() : ''
  return (
    <div className="container mx-auto p-6 space-y-8">
      <Card className="border-none shadow-none">
        <CardHeader>
          <div>
            <CardTitle className="text-2xl font-bold">협력업체 관리</CardTitle>
            <CardDescription>협력업체 정보를 추가, 수정, 삭제할 수 있습니다.</CardDescription>

          </div>
          <Dialog open={isCategoryModalOpen} onOpenChange={setIsCategoryModalOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                카테고리 관리
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>카테고리 관리</DialogTitle>
                <DialogDescription>
                  카테고리를 추가, 수정, 삭제할 수 있습니다.
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="새 카테고리 이름"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                  />
                  {editingCategory ? (
                    <div className="flex gap-2">
                      <Button onClick={() => handleEditCategory(editingCategory)}>
                        수정
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setEditingCategory(null)
                          setNewCategoryName('')
                        }}
                      >
                        취소
                      </Button>
                    </div>
                  ) : (
                    <Button onClick={handleAddCategory}>
                      추가
                    </Button>
                  )}
                </div>
                
                <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>카테고리명</TableHead>
                        <TableHead className="text-right">관리</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {categories.map((category) => (
                        <TableRow key={category.id}>
                          <TableCell>{category.name}</TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                setEditingCategory(category)
                                setNewCategoryName(category.name)
                              }}
                              className="hover:bg-gray-100"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteCategory(category.id)}
                              className="hover:bg-red-100 hover:text-red-600"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>

              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsCategoryModalOpen(false)}
                >
                  닫기
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">
              {editId ? '파트너 정보 수정' : '새로운 파트너 등록'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title">업체명</Label>
                  <Input
                    id="title"
                    type="text"
                    placeholder="업체명을 입력하세요"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">카테고리</Label>
                  <Select 
                    value={categoryId?.toString()} 
                    onValueChange={(value) => setCategoryId(value)}
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="카테고리를 선택하세요" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id.toString()}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>로고 이미지</Label>
                <p className="text-sm text-red-500 font-semibold">200 x 100사이즈로 업로드를 진행해야 알맞게 들어갑니다</p>
                <div className="flex items-center gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById('file-upload').click()}
                    className="w-full md:w-auto"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    이미지 선택
                  </Button>
                  <Input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) {
                        if (image) {
                          URL.revokeObjectURL(imagePreview)
                        }
                        setImage(file)
                      }
                    }}
                  />
                  {imagePreview && (
                    <div className="relative">
                      <Card 
                        className="bg-white shadow-md group min-w-[200px]"
                      >
                        <CardContent className="p-6 flex items-center justify-center h-28">
                        <img
                          src={imagePreview}
                          alt={`Partner ${imagePreview}`}
                          className="h-10 w-auto object-contain"
                        />
                        <button
                          type="button"
                          onClick={handleImageDelete}
                          className="absolute -top-2 -right-3 bg-red-500 text-white rounded-full p-1"
                        >
                          <X className="w-4 h-4" />
                        </button>
                        </CardContent>
                      </Card>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-2 justify-end">
                {editId && (
                  <Button type="button" variant="outline" onClick={handleCancel}>
                    취소
                  </Button>
                )}
                <Button type="submit" className="bg-main hover:bg-main/80">
                  {editId ? '수정하기' : '등록하기'}
                </Button>
              </div>
            </form>
          </div>

          <Separator className="my-8" />

          <Tabs defaultValue={defaultCategory} className="w-full">
            <TabsList className="mb-4">
              {categories.map(category => (
                <TabsTrigger key={category.id} value={category.id.toString()}>
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
            {categories.map(category => (
              <TabsContent key={category.id} value={category.id.toString()}>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>로고 미리보기</TableHead>
                      <TableHead>업체명</TableHead>
                      <TableHead className="text-right">관리</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {groupedPartners[category.id]?.map(partner => (
                      <TableRow key={partner.id}>
                        <TableCell className="w-1/5">
                          {partner.image_url !== "" ? (
                            <Card 
                            className="bg-white shadow-md group min-w-[200px] max-w-[200px]"
                          >
                            <CardContent className="p-6 flex items-center justify-center h-28">
                            <img
                              src={partner.image_url}
                              alt={`Partner ${imagePreview}`}
                              className="h-10 w-auto object-contain"
                            />
                            </CardContent>
                          </Card>
                          ) : (
                            <Card 
                            className="bg-white shadow-md group min-w-[200px] max-w-[200px]"
                          >
                            <CardContent className="p-6 flex items-center justify-center h-28">
                              <div className="w-full text-center">
                                <p className="text-2xl font-bold text-gray-700">
                                  {partner.title}
                                </p>
                              </div>
                            </CardContent>
                          </Card>
                        
                          )}
                        </TableCell>
                        <TableCell className="font-medium">{partner.title}</TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(partner)}
                            className="hover:bg-gray-100"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(partner.id)}
                            className="hover:bg-red-100 hover:text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}