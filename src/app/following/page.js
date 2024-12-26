'use client'

import axios from 'axios'
import { useEffect, useState } from 'react'
import { ResponsiveContainer, PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';

const data = [
    { name: 'Male', value: 63 },
    { name: 'Female', value: 25 },
    { name: 'Other', value: 12 },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28']

export default function FollowingData() {
    const [demoGraphic, setDemoGraphic] = useState([])
    const [platform, setPlatform] = useState('Instagram');
    console.log("setDemoGraphic",setDemoGraphic);
    


    const instagramData = {
        followersByGenderAndAge: [
            { age: '18-24', women: 5.1, men: 50.6 },
            { age: '25-34', women: 3.4, men: 30.3 },
            { age: '35-44', women: 0.8, men: 8.3 },
            { age: '45-54', women: 0.1, men: 0.7 },
            { age: '55-64', women: 0.1, men: 0.2 },
            { age: '65+', women: 0.1, men: 0.3 }
        ]
    };

    const facebookData = {
        followersByGenderAndAge: [
            { age: '18-24', women: 10.1, men: 40.6 },
            { age: '25-34', women: 6.4, men: 35.3 },
            { age: '35-44', women: 1.8, men: 12.3 },
            { age: '45-54', women: 0.5, men: 3.2 },
            { age: '55-64', women: 0.2, men: 0.8 },
            { age: '65+', women: 0.1, men: 0.5 }
        ]
    };



    useEffect(() => {
        const fetchStatsData = async () => {
            try {
                const sheetName = localStorage.getItem('sheetName');
                if (!sheetName) {
                    console.error('Sheet name not found in localStorage');
                    return;
                }
                const response = await axios.get(`/api/excelData?sheetName=${sheetName}`);
                console.log("responseresponseresponse",response.data);
                
                setCampaign(response.data);
                console.log('Fetched data:', response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchStatsData();
    }, []);


    const currentData =
        platform === 'Instagram' ? instagramData.followersByGenderAndAge : facebookData.followersByGenderAndAge;
    const genderData = [
        { name: 'Women', value: currentData.reduce((acc, ageGroup) => acc + ageGroup.women, 0) },
        { name: 'Men', value: currentData.reduce((acc, ageGroup) => acc + ageGroup.men, 0) }
    ];

    const COLORS = ['#8884d8', '#82ca9d'];


    return (
        <div className="rounded-lg border bg-white p-4">
            <h3 className="mb-4 text-lg font-medium">Demographic</h3>
            <div className="flex justify-center mb-4">
                <select
                    className="block w-1/2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
                    onChange={(e) => setPlatform(e.target.value)}
                    value={platform}
                >
                    <option value="Instagram">Instagram</option>
                    <option value="Facebook">Facebook</option>
                </select>
                {/* <select className='border border-gray-300 text-gray-700 block w-1/2 px-4 shadow-sm py-2 focus:outline-none focus:ring focus:ring-indigo-200'>
            <option value="instagram">Instagram</option>
            <option value = "fb">Facebook</option>
          </select> */}
            </div>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={genderData}
                        cx="50%"
                        cy="50%"
                        label={({ name, value }) => `${name}: ${value}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {genderData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}

