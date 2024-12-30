import React, { useState, useEffect } from 'react';
import axios from 'axios';



export function CampaignNames() {
  const [campaigns, setCampaigns] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStatsData = async () => {
      try {
        const sheetName = localStorage.getItem('sheetName2');
        if (!sheetName) {
          setError('Sheet name not found in localStorage');
          return;
        }

        // Replace '/api/excelData' with your actual API endpoint
        const response = await axios.get(`/api/excelData?sheetName=${sheetName}`);
        console.log("response.data", response.data);


        if (response && response.data) {
          const processedData = processCampaignData(response.data);
          setCampaigns(processedData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch campaign data. Please try again later.');
      }
    };

    fetchStatsData();
  }, []);

  // Function to process campaign data from the API response
  const processCampaignData = (data) => {
    const campaignData = {};
  
    // Iterate through each item in the dataset
    data.forEach((item) => {
      // Dynamically find the key for the campaign name
      const campaignNameKey = Object.keys(item).find((key) =>
        key.includes("Campaign Name report")
      );
  
      // Dynamically find the key for the date field
      const dateKey = Object.keys(item).find((key) =>
        key.includes("Report Period")
      );
  
      // Retrieve campaign name and date using dynamic keys
      const campaignName = item[campaignNameKey] || "Unknown Campaign";
      const date = item[dateKey] || "";
  
      // Retrieve impressions data
      const impressions = parseInt(item["__EMPTY_4"] || 0);
  
      // Skip invalid or header data (e.g., rows with campaign name as a header or missing date)
      if (!campaignName || campaignName === "Campaign name" || !date) {
        return;
      }
        if (!campaignData[campaignName]) {
        campaignData[campaignName] = { name: campaignName, date, value: 0 };
      }
        campaignData[campaignName].value += impressions;
    });
      return Object.values(campaignData);
  };
  


  return (
    <div className="rounded-lg border bg-white p-4">
      <div className='flex flex-row justify-between'>
        <h3 className="mb-4 text-lg font-medium">Top Campaign Names</h3>
        <h3 className="mb-4 text-lg font-medium">Impression</h3>
      </div>
      <div className="space-y-2">
        {error && <p className="text-red-500">{error}</p>}

        {campaigns?.length > 0 ? (
          campaigns
            .sort((a, b) => b.value - a.value) // Sort by impressions value in descending order
            .slice(0, 5) // Only show top 5 campaigns
            .map((campaign, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{campaign?.name}</p>
                  <p className="text-sm text-gray-500">{campaign?.date}</p>
                </div>
                <p className="font-medium">{campaign.value}</p>
              </div>
            ))
        ) : (
          <p>No campaign data available</p>
        )}
      </div>
    </div>
  );
}
