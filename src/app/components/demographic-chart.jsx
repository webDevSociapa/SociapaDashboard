import axios from 'axios';
import { useEffect, useState } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';

export function DemographicChart() {
  const [platform, setPlatform] = useState('Instagram');
  const [fbData, setFbData] = useState(null);
  const [instaData, setInstaData] = useState(null);

  useEffect(() => {
    const fetchStatsDataInsta = async () => {
      try {
        const sheetName = localStorage.getItem('sheetName5');
        if (!sheetName) {
          console.error('Sheet name not found in localStorage');
          return;
        }
        const response = await axios.get(`/api/excelData?sheetName=${sheetName}`);
        setInstaData(response.data);
        console.log('Fetched Instagram data:', response.data);
      } catch (error) {
        console.error('Error fetching Instagram data:', error);
      }
    };

    const fetchStatsDataFb = async () => {
      try {
        const sheetName = localStorage.getItem('sheetName4');
        if (!sheetName) {
          console.error('Sheet name not found in localStorage');
          return;
        }
        const response = await axios.get(`/api/excelData?sheetName=${sheetName}`);
        setFbData(response.data);
        console.log('Fetched Facebook data:', response.data);
      } catch (error) {
        console.error('Error fetching Facebook data:', error);
      }
    };

    fetchStatsDataInsta();
    fetchStatsDataFb();
  }, []);

  // Helper function to process the gender data from both Instagram and Facebook data
  const processGenderData = (data) => {
    return data?.map((entry) => ({
      name: entry["Instagram followers"] || entry["Facebook followers"],
      women: parseFloat(entry["__EMPTY"]) || 0,
      men: parseFloat(entry["__EMPTY_1"]) || 0
    }));
  };

  const currentData = platform === 'Instagram' && instaData ? instaData : fbData;
  
  // Process the gender and age data from the API response
  const genderData = currentData
    ? processGenderData(currentData)
    : [];

  // Calculate the total followers for the selected platform
  const totalFollowers = platform === 'Instagram' && instaData 
    ? instaData[1]["Instagram followers"]
    : platform === 'Facebook' && fbData 
    ? fbData[1]["Facebook followers"]
    : 0;

  // Calculate the total percentage for women and men
  const totalWomen = genderData.reduce((acc, { women }) => acc + women, 0);
  const totalMen = genderData.reduce((acc, { men }) => acc + men, 0);

  // Convert these values into percentages
  const total = totalWomen + totalMen;
  const womenPercentage = (totalWomen / total) * 100;
  const menPercentage = (totalMen / total) * 100;

  // Pie chart data
  const genderPieData = [
    { name: 'Women', value: womenPercentage },
    { name: 'Men', value: menPercentage },
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
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length.toFixed(2)]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
