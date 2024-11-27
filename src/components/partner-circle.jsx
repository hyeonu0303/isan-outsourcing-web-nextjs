import Image from 'next/image'

export function PartnerCircle({ partner }) {
  return (
    <div className="group relative">
      <div className="aspect-square w-full overflow-hidden rounded-full border-4 border-gray-200 transition-all duration-300 hover:border-primary hover:shadow-lg">
        {partner.imgUrl ? (
          <Image
            src={partner.imgUrl}
            alt={partner.companyName}
            width={200}
            height={200}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-100 text-2xl font-bold text-gray-600">
            {partner.companyName.slice(0, 2)}
          </div>
        )}
      </div>
      <div className="mt-2 text-center text-sm font-medium">{partner.companyName}</div>
    </div>
  )
}

