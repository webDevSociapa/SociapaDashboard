'use client'

import axios from "axios";
import { useEffect, useState } from "react";

export default function TopPerformingAds() {
    const [topAds, setTopAds] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStatsData = async () => {
            try {
                const sheetName = localStorage.getItem("sheetName");
                if (!sheetName) {
                    setError("Sheet name not found. Please set the sheet name first.");
                    return;
                }
                const response = await axios.get(`/api/excelData?sheetName=${sheetName}`);
                const processedData = processChartData(response.data);
                setTopAds(processedData);
                console.log("Processed chart data:", processedData);
            } catch (error) {
                console.error("Error fetching data:", error);
                setError("Failed to fetch data. Please try again later.");
            }
        };

        fetchStatsData();
    }, []);

    const processChartData = (data) => {
        // Filter and map the data to ensure valid values
        const agencyData = data.map((item) => ({
            impression: parseInt(item.__EMPTY_5 || 0),
            ctr: parseFloat(item.__EMPTY_8 || 0),
            cpc: parseFloat(item.__EMPTY_9 || 0),
            campaignName: item["Untitled report Dec-1-2024 to Dec-11-2024"] || "Unknown Campaign",
        }));

        // Filter out invalid or NaN values
        const filteredData = agencyData.filter(item => 
            !isNaN(item.impression) && item.impression > 0 &&
            !isNaN(item.ctr) && item.ctr > 0 &&
            !isNaN(item.cpc) && item.cpc > 0
        );


        // Sort data: by impressions (desc), then by ctr (desc), then by cpc (asc)
        const sortedData = filteredData.sort((a, b) => {
            if (b.impression !== a.impression) {
                return b.impression - a.impression; // Sort by impressions (desc)
            }
            if (b.ctr !== a.ctr) {
                return b.ctr - a.ctr; // Sort by CTR (desc)
            }
            return a.cpc - b.cpc; // Sort by CPC (asc)
        });

        console.log("sortedData",sortedData);
        

        // Return the top 5 ads
        return sortedData.slice(0, 5);
    };

    return (
        <div className="rounded-lg border bg-white p-4">
            <h2 className="mb-4 text-lg font-bold">Top Performing Ads</h2>
            {error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <table className="w-full border-collapse">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-2 text-left">SN</th>
                            <th className="px-4 py-2 text-left">Campaign Name</th>
                            <th className="px-4 py-2 text-left">Impressions</th>
                            <th className="px-4 py-2 text-left">Clicks</th>
                            <th className="px-4 py-2 text-left">CTR (%)</th>
                            <th className="px-4 py-2 text-left">CPC</th>
                        </tr>
                    </thead>
                    <tbody>
                        {topAds && topAds.map((ad, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                <td className="px-4 py-2">{index + 1}</td>
                                <td className="px-4 py-2">{ad.campaignName}</td>
                                <td className="px-4 py-2">{ad.impression}</td>
                                <td className="px-4 py-2">{ad.clicks}</td>
                                <td className="px-4 py-2">{ad.ctr.toFixed(2)}</td>
                                <td className="px-4 py-2">${ad.cpc.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
