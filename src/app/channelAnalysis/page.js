"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Paper } from "@mui/material";

export default function ChannelAnalysis() {
  const [statsData, setStatsData] = useState([]);
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const fetchStatsData = async () => {
      try {
        const sheetName = localStorage.getItem('sheetName3');
        if (!sheetName) {
          console.error('Sheet name not found in localStorage');
          return;
        }

        const response = await axios.get(`/api/excelData?sheetName=${sheetName}`);
        const sortedData = response.data.sort((a, b) => {
          const dateA = new Date(a[""] || "1970-01-01");
          const dateB = new Date(b[""] || "1970-01-01");
          return dateB - dateA; // Sort by date in descending order
        });
        setStatsData(sortedData);
        setCurrentDate(new Date().toISOString().split("T")[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchStatsData();
  }, []);

  const columns = [
    { field: 'id', headerName: 'SR', width: 90 },
    { field: 'date', headerName: 'Date', width: 150 },
    { field: 'campaignName', headerName: 'Campaign Name', width: 180 },
    { field: 'deliveryStatus', headerName: 'Delivery Status', width: 180 },
    { field: 'deliveryLevel', headerName: 'Delivery Level', width: 180 },
    { field: 'reach', headerName: 'Reach', width: 120 },
    { field: 'frequency', headerName: 'Frequency', width: 120 },
    { field: 'impressions', headerName: 'Impressions', width: 180 },
    { field: 'amountSpent', headerName: 'Amount spent (INR)', width: 180 },
    { field: 'ctr', headerName: 'CTR (all)', width: 120 },
    { field: 'resultType', headerName: 'Result Type', width: 180 },
    { field: 'resultRate', headerName: 'Result rate', width: 150 },
    { field: 'results', headerName: 'Results', width: 120 },
  ];

  const rows = statsData.map((item, index) => ({
    id: index + 1,
    date: item[""] || "N/A",
    campaignName: item["Untitled report Dec-1-2024 to Dec-11-2024"] || "N/A",
    deliveryStatus: item["Report Period: Dec 1, 2024 - Dec 11, 2024"] || "N/A",
    deliveryLevel: item["__EMPTY_2"] || "N/A",
    reach: item["__EMPTY_3"] || "N/A",
    frequency: item["__EMPTY_4"] || "N/A",
    impressions: item["__EMPTY_5"] || "N/A",
    amountSpent: item["__EMPTY_7"] || "N/A",
    ctr: item["__EMPTY_8"] || "N/A",
    resultType: item["__EMPTY_9"] || "N/A",
    resultRate: item["__EMPTY_10"] || "N/A",
    results: item["__EMPTY_11"] || "N/A",
  }));

  return (
    <Paper sx={{mt:8}}>
      <div className="container mx-auto pt-14">
      <h1 className="text-2xl font-bold text-center mb-6">Channel Analysis</h1>
      <div style={{ height: 800, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          disableSelectionOnClick
          getRowClassName={(params) =>
            params.row.date === currentDate ? 'bg-yellow-100' : ''
          }
        />
      </div>
    </div>
    </Paper>
  );
}
