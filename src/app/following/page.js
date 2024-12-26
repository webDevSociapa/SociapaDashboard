"use client";

import axios from "axios";
import { useEffect, useState, useCallback } from "react";

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
        <div className="text-center" style={{marginTop:"100px",display:"block",background:"yellow"}}>
            {error ? (
                <p style={{ color: "red" }}>{error}</p>
            ) : following ? (
                <h1>Instagram followers:{following["Instagram followers"] || "No Instagram followers data available."}</h1>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}
