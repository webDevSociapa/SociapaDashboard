import Image from "next/image";
import KaifImage from '../../../public/img/kaif.png';
import TwitterLogo from '../../../public/img/twitterlogo.png';
import fblogo from '../../../public/img/fblogo.png';
import instalogo from '../../../public/img/instalogo.png';

export function TopPerformingCreatives() {
  const creatives = [
    { name: 'americana biscuit', platform: 'facebook', engagements: '0234567',src:fblogo,time:"Tue Nov 26th, 2024 12:49am IST" },
    { name: 'americana_biscuit', platform: 'instagram', engagements: '0234567',src:instalogo,time:"Tue Nov 26th, 2024 12:49am IST" },
    { name: 'americana biscuit', platform: 'twitter', engagements: '0234567',src:TwitterLogo,time:"Tue Nov 26th, 2024 12:49am IST" },
  ]

  return (
    <div className="p-4 rounded-lg border flex flex-row justify-around gap-10">
     {creatives.map((item)=>(
          <div className="p-4 rounded-lg border flex flex-row justify-around gap-10">

      <div class="max-w-sm rounded overflow-hidden shadow-lg">
      <Image class="w-full" src={KaifImage} alt="Sunset in the mountains"/>
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2 flex space-x-2"><Image src={item.src}/><span>{item.name}</span></div>
        <p className="ml-10 -mt-6">{item.time}</p>
        <p class="text-gray-700 text-base">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
        </p>
      </div>
      <div class="px-6 pt-4 pb-2">
      <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Engagements</span>
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
      </div>
    </div>
    </div>
     ))}
    </div>

  )
}

