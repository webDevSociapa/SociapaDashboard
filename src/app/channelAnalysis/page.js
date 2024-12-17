"use client";
import axios from "axios";
import { useEffect, useState } from "react";

export default function ChannelAnalysis() {
  const [statsData, setStatsData] = useState([]);
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const fetchStatsData = async () => {
      try {
        const sheetName = localStorage.getItem('sheetName');
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

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Channel Analysis</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 border">SR</th>
              <th className="px-6 py-4 border">Date</th>
              <th className="px-4 py-2 border">Campaign Name</th>
              <th className="px-4 py-2 border">Delivery Status</th>
              <th className="px-4 py-2 border">Delivery Level</th>
              <th className="px-4 py-2 border">Reach</th>
              <th className="px-4 py-2 border">Frequency</th>
              <th className="px-4 py-2 border">Impressions</th>
              <th className="px-4 py-2 border">Amount spent (INR)</th>
              <th className="px-4 py-2 border">CTR (all)</th>
              <th className="px-4 py-2 border">Result Type</th>
              <th className="px-4 py-2 border">Result rate</th>
              <th className="px-4 py-2 border">Results</th>
            </tr>
          </thead>
          <tbody>
            {statsData.map((item, index) => (
              <tr
                key={index}
                className={`${
                  item[""] === currentDate ? "bg-yellow-100" : "bg-white"
                } hover:bg-gray-100`}
              >
                <td className="px-4 py-2 border text-center">{index + 1}</td>
                <td className="px-4 py-2 border text-center">{item[""] || "N/A"}</td>
                <td className="px-4 py-2 border">
                  {item["Untitled report Dec-1-2024 to Dec-11-2024"] || "N/A"}
                </td>
                <td className="px-4 py-2 border">
                  {item["Report Period: Dec 1, 2024 - Dec 11, 2024"] || "N/A"}
                </td>
                <td className="px-4 py-2 border">
                  {item["__EMPTY_2"] || "N/A"}
                </td>
                <td className="px-4 py-2 border">
                  {item["__EMPTY_3"] || "N/A"}
                </td>
                <td className="px-4 py-2 border">
                  {item["__EMPTY_4"] || "N/A"}
                </td>
                <td className="px-4 py-2 border">
                  {item["__EMPTY_5"] || "N/A"}
                </td>
                <td className="px-4 py-2 border">
                  {item["__EMPTY_7"] || "N/A"}
                </td>
                <td className="px-4 py-2 border">
                  {item["__EMPTY_8"] || "N/A"}
                </td>
                <td className="px-4 py-2 border">
                  {item["__EMPTY_9"] || "N/A"}
                </td>
                <td className="px-4 py-2 border">
                  {item["__EMPTY_10"] || "N/A"}
                </td>
                <td className="px-4 py-2 border">
                  {item["__EMPTY_11"] || "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}



