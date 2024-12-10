'use client'

import axios from 'axios'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const data = [
  { name: 'Jan', lastMonth: 3000, thisMonth: 4000 },
  { name: 'Feb', lastMonth: 4000, thisMonth: 4500 },
  { name: 'Mar', lastMonth: 3500, thisMonth: 4200 },
  { name: 'Apr', lastMonth: 4200, thisMonth: 4800 },
  { name: 'May', lastMonth: 3800, thisMonth: 4300 },
  { name: 'Jun', lastMonth: 4000, thisMonth: 4700 },
]

// const handleGet = async() =>{
//   try {
//     const response = await axios.get("/admib")
//   } catch (error) { 
//   }
// }



export function Charts() {
  return (
    <div className="grid gap-4 md:grid-cols-2 border-">
      <div className="rounded-lg border bg-white p-4">
        <h3 className="mb-4 text-lg font-medium">Impressions</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="lastMonth" stroke="#3b82f6" name="Last Month" />
            <Line type="monotone" dataKey="thisMonth" stroke="#6366f1" name="This Month" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="rounded-lg border bg-white p-4">
        <h3 className="mb-4 text-lg font-medium">Clicks</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="lastMonth" stroke="#3b82f6" name="Last Month" />
            <Line type="monotone" dataKey="thisMonth" stroke="#6366f1" name="This Month" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

