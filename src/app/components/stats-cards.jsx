'use client';

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import LoadingSpinner from './loading';

export function StatsCards() {
  const [statsData, setStatsData] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchStatsData = async () => {
      try {
        const sheetName = localStorage.getItem("sheetName3");
        const brandName = localStorage.getItem("brandName"); // Retrieve brandName

        if (!sheetName || !brandName) {
          console.error("Sheet name or brand name not found in localStorage");
          return;
        }
        const response = await axios.get(`/api/excelData?sheetName=${sheetName}&brandName=${brandName}`);
        setStatsData(response.data);
        setLoading(false);
        console.log("Fetched data:", response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    setLoading(true);
    fetchStatsData();
  }, []);


  if (loading) {
    return <LoadingSpinner />;
  }

  if (!statsData) {
    return <div>No data available</div>;
  }
  // Filter data by date range
  // Filter data by dynamic date range
  const filteredData = statsData.filter((item) => {
    // Dynamically find the key that contains "Date Wise report"
    const dateKey = Object.keys(item).find((key) =>
      key.includes("Date Wise report")
    );
    if (!dateKey) return false; // Skip if no date key is found

    const date = item[dateKey];
    return date >= startDate && date <= endDate;
  });
  if (filteredData.length === 0) {
    return (
      <div>
        <DateFilters
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />
        <p>Please select correct Date No data available for the selected date range.</p>
      </div>
    );
  }

  // Aggregate metrics
  const aggregatedMetrics = filteredData.reduce(
    (acc, item) => {
      acc.impressions += parseFloat(item['__EMPTY_4'] || 0);
      acc.clicks += parseFloat(item['__EMPTY_6'] || 0);
      acc.amountSpent += parseFloat(item['__EMPTY_5'] || 0);
      acc.reach += parseFloat(item['__EMPTY_2'] || 0);
      acc.frequency += parseFloat(item['__EMPTY_3'] || 0);
      return acc;
    },
    {
      impressions: 0,
      clicks: 0,
      amountSpent: 0,
      reach: 0,
      frequency: 0,
    }
  );

  // Derived metrics
  const aggregatedCpc = (aggregatedMetrics.amountSpent / aggregatedMetrics.clicks).toFixed(2) || '0.00'; // Cost Per Click
  const aggregatedCtr = ((aggregatedMetrics.clicks / aggregatedMetrics.impressions) * 100).toFixed(2) || '0.00'; // CTR
  const aggregatedFrequency = (aggregatedMetrics.impressions / aggregatedMetrics.reach).toFixed(2) || '0.00'; // Frequency

  const stats = [
    { title: 'CPC(cost per click)', value: `${aggregatedCpc} INR` },
    { title: 'CTR(click-through rate)', value: `${aggregatedCtr}%` },
    { title: 'Reach', value: aggregatedMetrics.reach },
    { title: 'Impressions', value: aggregatedMetrics.impressions },
    { title: 'Clicks', value: aggregatedMetrics.clicks },
    { title: 'Amount Spent', value: `${aggregatedMetrics.amountSpent.toFixed(2)} INR` },
    { title: 'Frequency', value: `${aggregatedFrequency}` },
  ];

  return (
    <div>
      <DateFilters
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.title} className="rounded-lg border bg-white p-4 shadow-sm">
            <p className="text-sm text-gray-500">{stat.title}</p>
            <p className="mt-2 text-3xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function DateFilters({ startDate, endDate, setStartDate, setEndDate }) {
  return (
    <div className="mb-4">
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
    </div>
  );
}
