import Image from "next/image";
import KaifImage from '../../../public/img/kaif.png'

export function TopPerformingCreatives() {
  const creatives = [
    { name: 'americana biscuit', platform: 'facebook', engagements: '0234567' },
    { name: 'americana_biscuit', platform: 'instagram', engagements: '0234567' },
    { name: 'americana biscuit', platform: 'twitter', engagements: '0234567' },
  ]

  return (
    <div className="p-4 rounded-lg border">
      <div className="space-y-12">
       {creatives.map((item)=>(
        <div key={item.name} className="flex flex-col items-center space-y-4">{item.name}</div>
       ))}
      </div>
    </div>

  )
}

