'use client'

import axios from "axios";
import { useEffect, useState } from "react";
import { DataGrid } from '@mui/x-data-grid';

export default function TopPerformingAds() {
    const [topAds, setTopAds] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStatsData = async () => {
            try {
                const sheetName = localStorage.getItem("sheetName1");
                if (!sheetName) {
                    setError("Sheet name not found. Please set the sheet name first.");
                    return;
                }
                const response = await axios.get(`/api/excelData?sheetName=${sheetName}`);
                const processedData = processChartData(response.data);
                setTopAds(processedData);
                console.log("topAds", topAds);
                console.log("Processed chart data:", processedData);
            } catch (error) {
                console.error("Error fetching data:", error);
                setError("Failed to fetch data. Please try again later.");
            }
        };
        fetchStatsData();
    }, []);

    const processChartData = (data) => {
        // Log the full data to inspect its structure
        console.log("Raw data:", data);
    
        const agencyData = data.map((item) => {
            // Check if the expected key exists, otherwise, fall back to another key
            const campaignName = item["Ad Name report Dec-1-2024 to Dec-27-2024"] || item["Ad Name"] || "Unknown Campaign";
            
            return {
                campaignName: campaignName,
                impression: parseInt(item["__EMPTY_4"] || 0),
                ctr: parseFloat(item["__EMPTY_8"] || 0),
                cpc: parseFloat(item["__EMPTY_7"] || 0),
                clicks: parseInt(item["__EMPTY_6"] || 0),
            };
        });
    
        // Filter out invalid or NaN values
        const filteredData = agencyData?.filter(item =>
            !isNaN(item?.impression) && item?.impression > 0 &&
            !isNaN(item?.ctr) && item?.ctr > 0 &&
            !isNaN(item?.cpc) && item?.cpc > 0
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
    
        // Return the top 5 ads
        return sortedData.slice(0, 5);
    };

    const columns = [
        { field: 'id', headerName: 'SN', width: 90 },
        { field: 'campaignName', headerName: 'Campaign Name', width: 250 },
        { field: 'impression', headerName: 'Impressions', type: 'number', width: 150 },
        { field: 'clicks', headerName: 'Clicks', type: 'number', width: 150 },
        { field: 'ctr', headerName: 'CTR (%)', type: 'number', width: 150 },
        { field: 'cpc', headerName: 'CPC', type: 'number', width: 150 },
    ];

    const rows = topAds.map((ad, index) => ({
        id: index + 1,  // Ensure each row has a unique id
        campaignName: ad.campaignName,
        impression: ad.impression,
        clicks: ad.clicks,
        ctr: ad.ctr.toFixed(2),
        cpc: ad.cpc.toFixed(2),
    }));

    return (
        <div className="rounded-lg border bg-white p-4">
            <h2 className="mb-4 text-lg font-bold">Top Performing Ads</h2>
            {error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        disableSelectionOnClick
                    />
                </div>
            )}
        </div>
    );
}
