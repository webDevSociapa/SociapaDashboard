import axios from 'axios';
import { useEffect, useState } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';

export function DemographicChart() {
  const [platform, setPlatform] = useState('Instagram');
  const [data, setData] = useState({ Instagram: null, Facebook: null });

  useEffect(() => {
    const fetchData = async (sheetNameKey, platformKey) => {
      try {
        const sheetName = localStorage.getItem(sheetNameKey);
        if (!sheetName) {
          console.error(`${platformKey} sheet name not found in localStorage`);
          return;
        }
        const response = await axios.get(`/api/excelData?sheetName=${sheetName}`);
        setData((prev) => ({ ...prev, [platformKey]: response.data }));
        console.log(`Fetched ${platformKey} data:`, response.data);
      } catch (error) {
        console.error(`Error fetching ${platformKey} data:`, error);
      }
    };

    fetchData('sheetName5', 'Instagram');
    fetchData('sheetName4', 'Facebook');
  }, []);

  const processGenderData = (data) => {
    return data?.map((entry) => ({
      name: entry['Instagram followers'] || entry['Facebook followers'],
      women: parseFloat(entry['__EMPTY']) || 0,
      men: parseFloat(entry['__EMPTY_1']) || 0,
    }));
  };

  const currentData = data[platform];
  const genderData = currentData ? processGenderData(currentData) : [];

  const totalFollowers = currentData ? currentData[1][`${platform} followers`] : 0;

  const totalWomen = genderData.reduce((acc, { women }) => acc + women, 0);
  const totalMen = genderData.reduce((acc, { men }) => acc + men, 0);
  const total = totalWomen + totalMen;

  const genderPieData = [
    { name: 'Women', value: (totalWomen / total) * 100 },
    { name: 'Men', value: (totalMen / total) * 100 },
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
      </div>
      <div className="text-center mb-4">
        <h4>Total Followers: {totalFollowers}</h4>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={genderPieData}
            cx="50%"
            cy="50%"
            label={({ name, value }) => `${name}: ${value.toFixed(1)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {genderPieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
