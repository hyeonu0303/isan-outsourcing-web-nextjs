import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import HeaderWrapper from "@/components/header-wrapper"
import MainContainer from "@/components/main-container"
import supabase from "@/lib/supabase"

const LogoCard = ({ logos }) => {
  if (!logos || logos.length === 0) return null
  
  return (
    <div className="w-full py-2">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {[...logos].map((logo, index) => (
          <Card 
            key={`${logo.id}-${index}`} 
            className="bg-white shadow-md hover:shadow-lg transition-all duration-300 group"
          >
            <CardContent className="p-6 flex items-center justify-center h-28">
              {
                logo.image_url === "" || logo.image_url === null ? (
                  <div className="w-full text-center">
                    <p className="text-2xl font-bold text-gray-700">
                      {logo.title}
                    </p>
                  </div>
                ) : (
                  <img
                    src={logo.image_url}
                    alt={`Partner ${logo.id}`}
                    className="h-10 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                )
              }
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default async function Partners() {

  const resPartnerData = await supabase.from('partner').select('*');
  const resCategoryData = await supabase.from('categories').select('*');
  const { data: partnerData, error: partnerError } = resPartnerData;
  const {data: categoryData, error: categoryError} = resCategoryData;
  if(partnerError || categoryError) {
    return <div>에러가 발생했습니다. 새로고침 부탁드립니다.</div>
  }
  const sortedCategories = [
    { id: 'all', name: '전체' }, 
    ...(categoryData ? [...categoryData].sort((a, b) => a.name.localeCompare(b.name)) : [])
  ];
  return (
    <div className="flex h-full w-full flex-col">
      <HeaderWrapper
        title="협력업체"
        subTitle="최고의 병원 컨설팅으로 보답하겠습니다"
      />
      <MainContainer>
        <Tabs defaultValue="전체" className="w-full px-4">
          <div className="sticky top-0 bg-white z-10 pb-4">
            <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 lg:grid-cols-12 gap-2">
              {sortedCategories.map((category) => (
                <TabsTrigger
                  value={category.name}
                  key={category.id}
                  className="text-sm md:text-md font-semibold transition-colors"
                >
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {sortedCategories.map((category) => (
            <TabsContent key={category.id} value={category.name}>
              <Card className="border-none shadow-none bg-transparent">
                <CardContent className="p-0 mt-4">
                  <LogoCard
                    logos={
                      category.name === "전체"
                        ? partnerData
                        : partnerData.filter((logo) => logo.category_id === category.id)
                    }
                  />
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </MainContainer>
    </div>
  )
}