"use client"

import { useEffect, useState } from "react"
import dayjs from "dayjs";
import AudienceGrowth from "../components/audienceGrowth"
import ProfileStatics from "../components/profileStatics";
import axios from "axios";
import InstaFollowersGraph from "../components/instaFollowersGraph";
import PostPerformance from "../components/postPerformance";
import StoryPerformance from "../components/storyPerformance";

const InstaAudience = () => {

    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    const [dataById, setDataById] = useState([]);
    const [instaById, setInstaById] = useState();
    const [instaBusiness, setInstaBusiness] = useState()
    const [totalFollowers, setTotalFollowers] = useState()
    const [mediaData, setMediaData] = useState()
    const [dateWiseFollowers,setDateWiseFollowers] = useState()
    const [storiesData, setStoriesData] = useState();
    const [startDate, setStartDate] = useState(dayjs().subtract(30, 'days').format('YYYY-MM-DD'));
    const [endDate, setEndDate] = useState(dayjs().format('YYYY-MM-DD'));
    const [selectedMetrics, setSelectedMetrics] = useState([]);
   
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const accessToken = "EAAZAzDEZADHB8BO7kZBIX7hUWAe4yuHhAktbeAED7d2sVSN8nEZCu9Cb8h1DCdxllFtKjPjpWJAtRCFksJWcZCotsSCepW5IEW70vxwZCYn53dYKM3dnfU3IvAxOq8bL1rFaxgYZBqNaKFaYgyJPmbe69agAUGFkxfZC5HHrYE4MTWdeycxf4NRB622Q"; // Replace with your access token


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
                setData(response.data.data || []);
            } catch (err) {
                setError("Failed to fetch data. Please check your credentials.");
            }
        };

        fetchData();
    }, []);

    console.log("startDate", startDate);
    


    const handleMetricChange = (metric) => {
        setSelectedMetrics((prev) => {
            const isSelected = prev.some((item) => item.id === metric.id);
            return isSelected
                ? prev.filter((item) => item.id !== metric.id) // Remove if already selected
                : [...prev, metric]; // Add if not selected
        });
    };



    // Refactored function to fetch data by Instagram ID
    const fetchDataByInstagramId = async (id) => {
        try {
            const businessId = await getBusinessId(id);
            if (businessId) {
                const instaBusinessId = await getInstagramBusinessId(businessId);
                if (instaBusinessId) {
                    await fetchInstagramFollowers(instaBusinessId);
                }
            }
        } catch (error) {
            console.error("Error fetching data by Instagram ID:", error);
            setError("Failed to fetch data. Please check your credentials.");
        }
    };

    // Helper function to get Business ID
    const getBusinessId = async (id) => {
        const url = `https://graph.facebook.com/v21.0/${id}`;
        const params = {
            fields: "business",
            access_token: accessToken,
        };

        try {
            const response = await axios.get(url, { params });
            const businessId = response?.data?.business?.id || null;
            setInstaById(businessId);
            return businessId;
        } catch (error) {
            console.error("Error fetching Business ID:", error);
            throw error;
        }
    };

    // Helper function to get Instagram Business ID
    const getInstagramBusinessId = async (businessId) => {
        const url = `https://graph.facebook.com/v21.0/${businessId}`;
        const params = {
            fields: "instagram_business_accounts",
            access_token: accessToken,
        };

        try {
            const response = await axios.get(url, { params });
            const instaBusinessId = response?.data?.instagram_business_accounts?.data?.[0]?.id || null;
            setInstaBusiness(instaBusinessId);
            return instaBusinessId;
        } catch (error) {
            console.error("Error fetching Instagram Business ID:", error);
            throw error;
        }
    };

    // Helper function to fetch Instagram followers count
    const fetchInstagramFollowers = async (instaBusinessId) => {
        const url = `https://graph.facebook.com/v21.0/${instaBusinessId}`;
        const params = {
            fields: "followers_count,media_count,media,profile_picture_url,stories",
            access_token: accessToken,
        };
        try {
            const response = await axios.get(url, { params });
            console.log("Instagram Followers Count:", response);
            
            setTotalFollowers(response?.data?.followers_count)
            setStoriesData(response.data)
            console.log("Instagram Followers Count:", response);
            setMediaData(response?.data);
            console.log("media data", response?.data?.media);
        } catch (error) {
            console.error("Error fetching Instagram Followers Count:", error);
        }
    };


    useEffect(() => {
        const fetchData = async () => {
            const accessToken = "EAAZAzDEZADHB8BOZBbngMYYSLUIDYIIBVlOFgFnZBEjtUCAnWoD38FiarHQggXfuZBUV31O39b3HPZALJolEeRYyDmyDrxWpLcZBYHLZAtVkZBIyA4RXojqVZCyLDUtk0iKIgeJJyuILKzfkBxlSjETwHL4MPa2lhqLyZCPQgZBcmZAaCtFvIGQOMMlZAqZADBhk5DQzKwNPY5dRYrfCq6ra3UxticHV8yo77kWeV9PvD6C1ZCGilH2ESvuJCVMq"; // Replace with your access token
            try {
                const url = `https://graph.facebook.com/v21.0/17841464559421526/insights?metric=follower_count&period=day&since=${startDate}&until=${endDate}&access_token=${accessToken}`;
                console.log("url", url);
                
                const response = await axios.get(url);
                setDateWiseFollowers(response.data.data[0].values);
                console.log("Instagram Followers Data:", response);
            } catch (error) {
                console.log("Error fetching Instagram followers data:", error);
            }
        };

        fetchData();
    }, [startDate, endDate]);


    const handleDateChange = (type, value) => {
        setDateRange((prev) => ({
            ...prev,
            [type]: value,
        }));
    };
    

    return (
        <div style={{ marginTop: '100px', textAlign: 'center',margin:"20px 60px" }}>
            <h1>Instagram Business Profile</h1>
            <div className="bg-gray-100 p-6 mt-10 border border-gray-300 rounded-lg">
                {/* Header Section */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-lg font-semibold text-gray-800">Profile Performance</h1>
                        <p className="text-sm text-gray-600">Activity from Nov 1, 2024 - Dec 25, 2024</p>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Date Range Picker */}
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
                        <button className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">
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
                </div>


                {/* Data Display Section */}

            </div>
            <ProfileStatics dataById={dataById} />
            <InstaFollowersGraph totalFollowers={totalFollowers} dateWiseFollowers={dateWiseFollowers} />
            <PostPerformance mediaData={mediaData} />
            <StoryPerformance storiesData={storiesData}/>
        </div>
    )
}

export default InstaAudience