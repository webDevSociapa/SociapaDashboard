"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";
import ProfileStatics from "../components/profileStatics";


const FbInstaData = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState(dayjs().subtract(30, 'days').format('YYYY-MM-DD'));
  const [endDate, setEndDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [dataById, setDataById] = useState([]);
  const [selectedMetrics, setSelectedMetrics] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(1)
  const tabsData = [
    { id: 1, label: "Overview" },
    { id: 2, label: "Profile" },
  ]

  const accessToken = process.env.NEXT_PUBLIC_API_SECRET; // Replace with your access token

  useEffect(() => {
    const fetchData = async () => {
      const baseUrl = "https://graph.facebook.com/v21.0/me/adaccounts";
      const params = {
        fields: "name",
        access_token: accessToken
      }
      try {
        const response = await axios.get(
          baseUrl, { params }
        );
        setData(response.data.data || []); // Adjust based on actual API response structure
      } catch (err) {
        setError("Failed to fetch data. Please check your credentials.");
      }
    };

    fetchData();
  }, []);

  const handleMetricChange = (metric) => {
    setSelectedMetrics((prev) => {
      const isSelected = prev.some((item) => item.id === metric.id);
      return isSelected
        ? prev.filter((item) => item.id !== metric.id) // Remove if already selected
        : [...prev, metric]; // Add if not selected
    });
  };

  const handleDateChange = (type, value) => {
    setDateRange((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  return (
    <>
      <div className="profile-performance">
        <div className="bg-gray-100 p-6 mt-10 border border-gray-300 rounded-lg">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-lg font-semibold text-gray-800">Profile Performance</h1>
              <p className="text-sm text-gray-600">Activity from Nov 1, 2024 - Dec 25, 2024</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}  // Correct way to update startDate
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}  // Correct way to update endDate
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              {/* Share Button */}
              <button className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700">
                Share
              </button>
            </div>
          </div>

          <hr className="mb-6 border-gray-300" />
          {/* Dropdown with Checkboxes */}
          <div className="relative w-1/4">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md flex justify-between items-center bg-white text-gray-700 focus:outline-none"
            >
              <span>
                {selectedMetrics.length > 0
                  ? selectedMetrics.map((metric) => metric.name).join(", ")
                  : "Select Profile"}
              </span>
              <svg className="h-8 w-8 text-red-500" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <rect x="4" y="4" width="16" height="16" rx="4" />  <circle cx="12" cy="12" r="3" />  <line x1="16.5" y1="7.5" x2="16.5" y2="7.501" /></svg>
            </button>
            {isDropdownOpen && (
              <div className="absolute mt-2 w-full border border-gray-300 rounded-md bg-white shadow-md z-10" >
                {data?.map((metric, index) => (
                  <label
                    key={metric.id}
                    onClick={() => fetchDataByInstagramId(metric.id)}
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 cursor-pointer"
                  >
                    <svg className="h-8 w-8 text-red-500" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <rect x="4" y="4" width="16" height="16" rx="4" />  <circle cx="12" cy="12" r="3" />  <line x1="16.5" y1="7.5" x2="16.5" y2="7.501" /></svg>
                    <input
                      type="checkbox"
                      checked={selectedMetrics.some((item) => item.id === metric.id)}
                      onChange={() => handleMetricChange(metric)}
                      className="form-checkbox rounded text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-800">{metric.name}</span>
                  </label>
                ))}
              </div>
            )}
            {/* {showToast && (
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-4 bg-red-500 text-white px-4 py-2 rounded-md shadow-md">
                            Please select Profile
                        </div>
                    )} */}

          </div>
          {/* Data Display Section */}
        </div>
        <div className="border-b border-gray-200 dark:border-neutral-700">
          <nav className="flex gap-x-4 justify-around" role="tablist">
            {tabsData.map((tab) => (
              <button
                key={tab.id}
                type="button"
                className={`py-4 px-3 text-sm font-medium border-b-2 transition-colors duration-300 focus:outline-none whitespace-nowrap 
                ${activeTab === tab.id ? "border-blue-600 text-blue-600 font-semibold" : "border-transparent text-gray-500 hover:text-blue-600"}`}
                onClick={() => setActiveTab(tab.id)}
                role="tab"
                aria-selected={activeTab === tab.id}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
        <div className="mt-3">
          {tabsData.map((tab) => (
            <div key={tab.id} className={`${activeTab === tab.id ? "block" : "hidden"}`} role="tabpanel">
              {tab.id === 1 ? <ProfileStatics dataById={dataById} />
                : <div className="border rounded-lg p-4 bg-white shadow-md">
                  <p className="font-semibold text-lg">Profiles</p>
                  <p className="text-gray-600">
                    Review your aggregate profile and page metrics from the selected time period.
                  </p>
                  <div className="overflow-x-auto mt-4">
                    <table className="w-full border-collapse border border-gray-300 text-left">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="border border-gray-300 px-4 py-2">Profile</th>
                          <th className="border border-gray-300 px-4 py-2">Audience</th>
                          <th className="border border-gray-300 px-4 py-2">Net Audience Growth</th>
                          <th className="border border-gray-300 px-4 py-2">Published Posts</th>
                          <th className="border border-gray-300 px-4 py-2">Impressions</th>
                          <th className="border border-gray-300 px-4 py-2">Engagement Rate</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-300 px-4 py-2">Reporting Period <br /><span className="text-gray-500">Jan 16, 2025 – Jan 21, 2025</span></td>
                          <td className="border border-gray-300 px-4 py-2">5,949 <br /><span className="text-green-500">↑ 5.9%</span></td>
                          <td className="border border-gray-300 px-4 py-2">334 <br /><span className="text-red-500">↓ 10.7%</span></td>
                          <td className="border border-gray-300 px-4 py-2">3 <br /><span className="text-red-500">↓ 40%</span></td>
                          <td className="border border-gray-300 px-4 py-2">457,143 <br /><span className="text-red-500">↓ 7.8%</span></td>
                          <td className="border border-gray-300 px-4 py-2">1.1% <br /><span className="text-red-500">↓ 21.1%</span></td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 px-4 py-2">Compare to <br /><span className="text-gray-500">Jan 10, 2025 – Jan 15, 2025</span></td>
                          <td className="border border-gray-300 px-4 py-2">5,615</td>
                          <td className="border border-gray-300 px-4 py-2">374</td>
                          <td className="border border-gray-300 px-4 py-2">5</td>
                          <td className="border border-gray-300 px-4 py-2">495,742</td>
                          <td className="border border-gray-300 px-4 py-2">1.4%</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 px-4 py-2 flex items-center gap-2">
                            <img src="9am_foods_logo.png" alt="9AM Foods" className="w-6 h-6" />
                            9AM Foods
                          </td>
                          <td className="border border-gray-300 px-4 py-2">5,949</td>
                          <td className="border border-gray-300 px-4 py-2">334</td>
                          <td className="border border-gray-300 px-4 py-2">3</td>
                          <td className="border border-gray-300 px-4 py-2">457,143</td>
                          <td className="border border-gray-300 px-4 py-2">1.1%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              }
              {/* <p className="text-gray-500 dark:text-neutral-400">
              This is the <em className="font-semibold text-gray-800 dark:text-neutral-200">{tab.id === 1 ? "first" : tab.id === 2 ? "second":"null" }</em> item's tab body.
            </p> */}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FbInstaData;
