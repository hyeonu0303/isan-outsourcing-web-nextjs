import Image from 'next/image'

export function PartnerCard({ partner }) {
  return (
    <div className="group relative overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:shadow-xl">
      <div className="aspect-video w-full overflow-hidden">
        {partner.imgUrl ? (
          <Image
            src={partner.imgUrl}
            alt={partner.companyName}
            width={300}
            height={200}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-200 text-4xl font-bold text-gray-400">
            {partner.companyName[0]}
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold">{partner.companyName}</h3>
        {partner.description && (
          <p className="mt-2 text-sm text-gray-600">{partner.description}</p>
        )}
      </div>
    </div>
  )
}

