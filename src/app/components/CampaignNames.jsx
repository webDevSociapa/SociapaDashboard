import React, { useState, useEffect } from 'react';
import axios from 'axios';

const processCampaignData = (data) => {
  const campaignData = {};
  data.forEach(item => {
    const campaignName = item['Untitled report Dec-1-2024 to Dec-11-2024'];
    const date = item[''];
    const impressions = parseInt(item.__EMPTY_5 || 0);
    if (campaignName && campaignName !== 'Campaign name' && date) {
      if (!campaignData[campaignName]) {
        campaignData[campaignName] = { name: campaignName, date, value: 0 };
      }
      campaignData[campaignName].value += impressions;
    }
  });
  return Object.values(campaignData);
};

export function CampaignNames() {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    const fetchStatsData = async () => {
      try {
        const sheetName = localStorage.getItem('sheetName');
        if (!sheetName) {
          console.error('Sheet name not found in localStorage');
          return;
        }
        const response = await axios.get(`/api/excelData?sheetName=${sheetName}`);
        const processedData = processCampaignData(response.data);
        setCampaigns(processedData);
        console.log('Processed campaign data:', processedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchStatsData();
  }, []);

  return (
    <div className="rounded-lg border bg-white p-4">
      <h3 className="mb-4 text-lg font-medium">Campaign Names</h3>
      <div className="space-y-2">
        {campaigns?.length > 0 ? (
          campaigns?.map((campaign, index) => (
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

