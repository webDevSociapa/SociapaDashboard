'use client'

import { Sidebar } from '@/app/components/sidebar'
import { Header } from '@/app/components/header'
import { StatsCards } from '@/app/components/stats-cards'
import { Charts } from '@/app/components/charts'
import { CampaignNames } from '@/app/components/CampaignNames'
import { DemographicChart } from '@/app/components/demographic-chart'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import TopPerformingAds from './components/topperformingAds'

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const isLoggedInStatus = localStorage.getItem('isLoggedIn'); // Read from localStorage
    if (isLoggedInStatus === 'true') {
      // User is logged in, stay on this page
    } else {
      // User is not logged in, redirect to login
      router.push('/login');
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="ml-64">
        <Header />
        <main className="p-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-medium">Accurate Data</h2>
            <button className="rounded-lg border bg-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-gray-50">
              Export
            </button>
          </div>

          <div className="space-y-6">
            <StatsCards />
            <Charts />

            <div className="grid gap-6 md:grid-cols-2">
              <CampaignNames />
              <DemographicChart />
            </div>
             {/* <TrafficMapping /> */}
            {/* <TopPerformingCreatives /> */}
            <div className="grid gap-6 md:grid-cols-2 xl: grid-cols-12 sm: grid-cols-12">
            <TopPerformingAds/>
            <TopPerformingAds/>
              </div>
          </div>
        </main>
      </div>
    </div>
  )
}

