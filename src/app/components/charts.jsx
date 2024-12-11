'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { processChartData } from '../../utils/processData'

export function Charts() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchStatsData = async () => {
      try {
        const sheetName = localStorage.getItem('sheetName');
        if (!sheetName) {
          console.error('Sheet name not found in localStorage');
          return;
        }

        const response = await axios.get(`/api/excelData?sheetName=${sheetName}`);
        const processedData = processChartData(response.data);
        setChartData(processedData);
        console.log('Processed chart data:', processedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchStatsData();
  }, []);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">Impressions</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="date" 
                stroke="#6b7280"
                tick={{fill: '#6b7280'}}
                tickLine={{stroke: '#6b7280'}}
              />
              <YAxis 
                stroke="#6b7280"
                tick={{fill: '#6b7280'}}
                tickLine={{stroke: '#6b7280'}}
              />
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
                activeDot={{r: 8}}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">Clicks</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="date" 
                stroke="#6b7280"
                tick={{fill: '#6b7280'}}
                tickLine={{stroke: '#6b7280'}}
              />
              <YAxis 
                stroke="#6b7280"
                tick={{fill: '#6b7280'}}
                tickLine={{stroke: '#6b7280'}}
              />
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
                activeDot={{r: 8}}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

