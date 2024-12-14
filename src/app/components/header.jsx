'use client'

import { Search, Bell } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export function Header() {
const [brandNameData,setBrandNameData] = useState("")
  useEffect(()=>{
    const BrandName = localStorage.getItem("brandName");
    setBrandNameData(BrandName)
  },[]) 


  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-4">
      <h1 className="text-xl font-semibold">{brandNameData}</h1>
      
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="search"
            placeholder="Search here..."
            className="h-10 rounded-full border bg-gray-50 pl-10 pr-4 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        
        <button className="relative">
          <Bell className="h-5 w-5 text-gray-600" />
          <span className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-red-500 text-[10px] font-medium text-white">
            3
          </span>
        </button>
        
        <div className="flex items-center gap-3">
          <Image
            src="/avatar.jpg"
            alt="User"
            className="h-8 w-8 rounded-full object-cover"
          />
          <div className="text-sm">
            <div className="font-medium">Robin khan</div>
            <div className="text-xs text-gray-500">Admin</div>
          </div>
        </div>
      </div>
    </header>
  )
}

