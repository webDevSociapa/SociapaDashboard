"use client";

import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import TopPerformingAds from "../components/topperformingAds";
import TopPerformingCards from "../components/topPerforming";

export default function FollowingPage() {
    const [following, setFollowing] = useState(null); // Use null to differentiate between no data and empty data
    const [error, setError] = useState(null); // State to manage errors

    const fetchStatsData = useCallback(async () => {
        try {
            const sheetName = localStorage.getItem("followSheet");
            if (!sheetName) {
                setError("Sheet name not found. Please set the sheet name first.");
                return;
            }
            const response = await axios.get(`/api/excelData?sheetName=${sheetName}`);
            console.log("Response:", response.data);
            setFollowing(response.data[1]); // Assuming response.data[1] contains the desired data
            setError(null); // Clear any previous errors
        } catch (error) {
            console.error("Error fetching data:", error);
            setError("Failed to fetch data. Please try again later.");
        }
    }, []);

    useEffect(() => {
        fetchStatsData();
    }, [fetchStatsData]);

    return (
      <div>
        <TopPerformingCards/>
      </div>
    );
}
