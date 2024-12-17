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
      console.log("datata",data[1]["Untitled report Dec-1-2024 to Dec-11-2024"]);
      let agencyData = [];
      const AgencyDataResult = data?.map((item)=>({
        impression:parseInt(item.__EMPTY_5 || 0),
        ctr:parseInt(item.__EMPTY_8 || 0),
        coc:parseInt(item.__EMPTY_9 || 0)
      }
      ));
      agencyData.push(...AgencyDataResult)
      console.log("agencyDataagencyData",agencyData);
        // Transform and filter the data based on impressions, CTR, and CPC
    //     return lastTwoMonths
    //         .map((item) => ({
    //             date: item[""] || "", // Assuming the date is in the "" column
    //             impressions: parseInt(item.__EMPTY_5 || 0),
    //             clicks: parseInt(item.__EMPTY_7 || 0),
    //             cpc: parseFloat(item.__EMPTY_8 || 0),
    //             ctr: parseFloat(item.__EMPTY_9 || 0),
    //             campaignName: item["Untitled report Dec-1-2024 to Dec-11-2024"] || "Unknown Campaign",
    //         }))
    //         .filter((item) => item.impressions > 1000 && item.ctr > 2 && item.cpc < 5) // Adjust thresholds as needed
    //         .sort((a, b) => b.impressions - a.impressions); // Sort by impressions in descending order
    // };
    }
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
                                <td className="px-4 py-2">{ad.impressions}</td>
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
