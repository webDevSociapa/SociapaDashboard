'use client';

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import LoadingSpinner from './loading';

export function StatsCards() {
  const [statsData, setStatsData] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(false)

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
        setLoading(true)
        console.log('Fetched data:', response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchStatsData();
  }, []);

  if (!statsData) {
    return <div><LoadingSpinner /></div>;
  }

  // Filter data based on start and end dates
  const filteredData = statsData.filter((item) => {
    const date = item['']; // Replace `""` with the actual date column key
    return date >= startDate && date <= endDate;
  });

  if (filteredData.length === 0) {
    return (
      <div>
        <div className="mb-4">
          <label htmlFor="start-date" className="block text-sm font-medium text-gray-700">
            Start Date:
          </label>
          <input
            type="date"
            id="start-date"
            value={startDate}
            six
            onChange={(e) => setStartDate(e.target.value)}
            className="w-1/4 mt-1 block  rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-4"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="end-date" className="block text-sm font-medium text-gray-700">
            End Date:
          </label>
          <input
            type="date"
            id="end-date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="mt-1 block w-1/4 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-4"
          />
        </div>
        <p>No data available for the selected date range.</p>
      </div>
    );
  }

  // Aggregate metrics
  const aggregatedMetrics = filteredData.reduce(
    (acc, item) => {
      acc.impressions += parseFloat(item['__EMPTY_5'] || 0);
      acc.clicks += parseFloat(item['__EMPTY_8'] || 0);
      acc.amountSpent += parseFloat(item['__EMPTY_6'] || 0);
      acc.reach += parseFloat(item['__EMPTY_3'] || 0);
      acc.frequency += parseFloat(item['__EMPTY_4'] || 0);
      acc.costPerEngagement += parseFloat(item['__EMPTY_16'] || 0);
      acc.ctr += parseFloat(item['__EMPTY_9'] || 0);
      return acc;
    },
    {
      impressions: 0,
      clicks: 0,
      amountSpent: 0,
      reach: 0,
      frequency: 0,
      costPerEngagement: 0,
      ctr: 0,
    }
  );

  // Calculate derived metrics
  const aggregatedCpc = (aggregatedMetrics.amountSpent / aggregatedMetrics.clicks).toFixed(2) || '0.00'; // Cost Per Click
  const aggregatedCtr = (aggregatedMetrics.ctr / filteredData.length).toFixed(2) || '0.00'; // Average CTR
  const aggregatedCostPerEngagement = (aggregatedMetrics.costPerEngagement / filteredData.length).toFixed(2) || '0.00'; // Average Cost Per Engagement

  const stats = [
    { title: 'CPC', value: `${aggregatedCpc} INR`, change: 'Dynamic Change' },
    { title: 'CTR', value: `${aggregatedCtr}%`, change: 'Dynamic Change' },
    { title: 'Engagement', value: aggregatedMetrics.reach, change: 'Dynamic Change' },
    { title: 'Cost/Engagement', value: `${aggregatedCostPerEngagement} INR`, change: 'Dynamic Change' },
    { title: 'Impressions', value: aggregatedMetrics.impressions, change: 'Dynamic Change' },
    { title: 'Spend', value: `${(aggregatedMetrics.amountSpent).toFixed(2)} INR`, change: 'Dynamic Change' },
    { title: 'Frequency', value: `${(aggregatedMetrics.frequency).toFixed(2)}`, change: 'Dynamic Change' },
    { title: 'Reach', value: aggregatedMetrics.reach, change: 'Dynamic Change' },
  ];

  return (
    <div>
      <div className="mb-4">
        <label htmlFor="start-date" className="block text-sm font-medium text-gray-700">
          Start Date:
        </label>
        <input
          type="date"
          id="start-date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="mt-2 block w-1/4 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-4"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="end-date" className="block text-sm font-medium text-gray-700">
          End Date:
        </label>
        <input
          type="date"
          id="end-date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="mt-2 block w-1/4 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-4"
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
