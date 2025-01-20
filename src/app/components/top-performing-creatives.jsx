import Image from "next/image";
import KaifImage from '../../../public/img/kaif.png';
import TwitterLogo from '../../../public/img/twitterlogo.png';
import fblogo from '../../../public/img/fblogo.png';
import instalogo from '../../../public/img/instalogo.png';

export function TopPerformingCreatives() {
  const creatives = [
    { name: 'americana biscuit', platform: 'facebook', engagements: '0234567', src: fblogo, time: "Tue Nov 26th, 2024 12:49am IST" },
    { name: 'americana_biscuit', platform: 'instagram', engagements: '0234567', src: instalogo, time: "Tue Nov 26th, 2024 12:49am IST" },
    { name: 'americana biscuit', platform: 'twitter', engagements: '0234567', src: TwitterLogo, time: "Tue Nov 26th, 2024 12:49am IST" },
  ]

  return (
   <>
    <div className="p-4 rounded-lg border flex flex-row justify-around gap-10">
      working
    </div>
   </>

  )
}

