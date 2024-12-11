'use client';

import axios from 'axios';
import React, { useEffect, useState } from 'react';

export function StatsCards() {
  const [statsData, setStatsData] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    const fetchStatsData = async () => {
      try {
        const sheetName = localStorage.getItem('sheetName');
        if (!sheetName) {
          console.error('Sheet name not found in localStorage');
          return;
        }

        const response = await axios.get(`/api/excelData?sheetName=${sheetName}`);
        setStatsData(response.data);
        console.log('Fetched data:', response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchStatsData();
  }, []);

  if (!statsData) {
    return <div>Loading...</div>;
  }

  // Filter data based on the selected date
  const filteredData = statsData.find(
    (item) => item[""] === selectedDate // Replace `""` with the actual key representing the date column
  );

  if (!filteredData) {
    return (
      <div>
        <div className="mb-4">
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">
            Select Date:
          </label>
          <input
            type="date"
            id="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="mt-1 block  rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-4"
          />
        </div>
        <p>No data available for the selected date.</p>
      </div>
    );
  }

  // Extract metrics for the selected date
  const impressions = filteredData["__EMPTY_5"];
  const clicks = filteredData["__EMPTY_8"];
  const amountSpent = filteredData["__EMPTY_6"];
  const reach = filteredData["__EMPTY_3"];
  const frequency = filteredData["__EMPTY_4"];
  const cpcData = filteredData["__EMPTY_8"];
  const ctrData = filteredData["__EMPTY_9"];
  const costPerEngagementData = filteredData["__EMPTY_16"];

  // Derived metrics
  const cpc = parseFloat(cpcData).toFixed(2); // Cost Per Click
  const ctr = parseFloat(ctrData).toFixed(2); // Click-Through Rate
  const costPerEngagement = parseFloat(costPerEngagementData).toFixed(2); // Cost per Engagement

  // Prepare stats for display
  const stats = [
    { title: 'CPC', value: `${cpc} INR`, change: '+5% from yesterday' },
    { title: 'CTR', value: `${ctr}%`, change: '+3% from yesterday' },
    { title: 'Engagement', value: reach, change: '+2% from yesterday' },
    { title: 'Cost/Engagement', value: `${costPerEngagement} INR`, change: '0.5% from yesterday' },
    { title: 'Impressions', value: impressions, change: '+2% from yesterday' },
    { title: 'Spend', value: `${amountSpent} INR`, change: '+4% from yesterday' },
    { title: 'Frequency', value: frequency, change: '+1% from yesterday' },
    { title: 'Reach', value: reach, change: '+2% from yesterday' },
    { title: 'Total spent', value: `${amountSpent} INR`, change: '+2% from yesterday' },
  ];

  return (
    <div>
      <div className="mb-4">
        <label htmlFor="date" className="block text-sm font-medium text-gray-700">
          Select Date:
        </label>
        <input
          type="date"
          id="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="mt-2 block  rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-4"
        />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.title} className="rounded-lg border bg-white p-4 shadow-sm">
            <p className="text-sm text-gray-500">{stat.title}</p>
            <p className="mt-2 text-3xl font-bold">{stat.value}</p>
            <p className="mt-1 text-xs text-gray-500">{stat.change}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
