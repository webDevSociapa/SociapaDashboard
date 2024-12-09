"use client"

import axios from 'axios';
import React, { useEffect, useState } from 'react';

export function StatsCards() {
  // State to store API data
  const [statsData, setStatsData] = useState(null);

  // Fetch data from the API when the component mounts
  useEffect(() => {
    const fetchStatsData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/excelData');
        setStatsData(response.data);
        console.log("Fetched data:", response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchStatsData();
  }, []);

  // If the data hasn't been fetched yet, show a loading state
  if (!statsData) {
    return <div>Loading...</div>;
  }

  // Calculate CPC, CTR, and Cost per Engagement based on fetched data
  const cpc = (statsData["Amount spent (INR)"] / statsData["Clicks (all)"]).toFixed(2);  // CPC: Cost Per Click
  const ctr = ((statsData["Clicks (all)"] / statsData["Impressions"]) * 100).toFixed(2);  // CTR: Click-Through Rate
  const costPerEngagement = (statsData["Amount spent (INR)"] / statsData["Page engagement"]).toFixed(2);  // Cost per Engagement

  // Prepare stats data for display
  const stats = [
    {
      title: 'CPC',
      value: `${cpc} INR`, // Dynamically calculated CPC value
      change: '+5% from yesterday',
    },
    {
      title: 'CTR',
      value: `${ctr}%`, // Dynamically calculated CTR value
      change: '+5% from yesterday',
    },
    {
      title: 'Engagement',
      value: statsData["Page engagement"], // Page engagement
      change: '+2% from yesterday',
    },
    {
      title: 'Cost/Engagement',
      value: `${costPerEngagement} INR`, // Dynamically calculated Cost per Engagement
      change: '0.5% from yesterday',
    },
    {
      title: 'Impressions',
      value: statsData["Impressions"], // Impressions
      change: '+2% from yesterday',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {stats.map((stat) => (
        <div key={stat.title} className="rounded-lg border bg-white p-4 shadow-sm">
          <p className="text-sm text-gray-500">{stat.title}</p>
          <p className="mt-2 text-3xl font-bold">{stat.value}</p>
          <p className="mt-1 text-xs text-gray-500">{stat.change}</p>
        </div>
      ))}
    </div>
  );
}
