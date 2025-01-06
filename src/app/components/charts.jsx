'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'd3-format';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export function Charts() {
  const [chartData, setChartData] = useState([]);
  const [error, setError] = useState(null);

  const formatYAxisTick = (value) => {
    if (value >= 10000000) {
      return `${(value / 1000000).toFixed(1)}M`; // For numbers in the millions, show 'M'
    } else if (value >= 100000) {
      return `${(value / 100000).toFixed(1)}L`; // For numbers in lakhs, show 'L'
    }
    return value;
  };

  const processChartData = (data) => {
    console.log("data", data);
  
    return data
      .map((item) => {
        // Dynamically find the key containing the date range
        const dateKey = Object.keys(item).find((key) =>
          key.includes("Date Wise report")
        ) || '';
  
        return {
          date: item[dateKey] || '', // Use the dynamically found date key
          impressions: parseInt(item.__EMPTY_4 || 0),
          clicks: parseInt(item.__EMPTY_6 || 0),
          cpc: parseFloat(item.__EMPTY_7 || 0),
          ctr: parseFloat(item.__EMPTY_8 || 0),
        };
      })
      .filter((item) => item.date) // Filter out items with empty dates
      .sort((a, b) => new Date(a.date) - new Date(b.date)); // Sort by date
  };
  
  
  useEffect(() => {
    const fetchStatsData = async () => {
      try {
        const sheetName = localStorage.getItem('sheetName3');
        if (!sheetName) {
          setError('Sheet name not found. Please set the sheet name first.');
          return;
        }

        const response = await axios.get(`/api/excelData?sheetName=${sheetName}`);
        const processedData = processChartData(response.data);
        setChartData(processedData);
        console.log(response,"response");
        
        console.log('Processed chart data:', processedData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data. Please try again later.');
      }
    };
    fetchStatsData();
  }, []);  

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  };

  if (error) {
    return <div className="text-red-500 text-center p-4">{error}</div>;
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Impressions</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="date"
                tickFormatter={formatDate}
                interval={Math.ceil(chartData.length / 10)}
                stroke="#6b7280"
              />
          <YAxis tickFormatter={formatYAxisTick} stroke="#6b7280" />
          <Tooltip
                contentStyle={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.375rem',
                  boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="impressions"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-md ">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Clicks</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="date"
                tickFormatter={formatDate}
                interval={Math.ceil(chartData.length / 10)}
                stroke="#6b7280"
              />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.375rem',
                  boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="clicks"
                stroke="#6366f1"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
