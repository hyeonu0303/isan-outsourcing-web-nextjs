export function StatsSection() {
  return (
    <section className="border-t bg-gray-50">
      <div className="container py-12 md:py-24">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="text-center">
            <div className="text-4xl font-bold">1,000+</div>
            <div className="mt-2 text-gray-500">병원 파트너십</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold">20년+</div>
            <div className="mt-2 text-gray-500">업계 경력</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold">98%</div>
            <div className="mt-2 text-gray-500">고객 만족도</div>
          </div>
        </div>
      </div>
    </section>
  )
}

