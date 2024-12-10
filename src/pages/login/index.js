'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import LoginComponent from '@/app/components/login'

export default function LoginPage() {

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <LoginComponent />
      </div>
    </div>
  )
}

