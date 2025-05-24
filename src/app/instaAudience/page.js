"use client"
import { useEffect, useState } from "react"
import dayjs from "dayjs";
import ProfileStatics from "../components/profileStatics";
import axios from "axios";
import InstaFollowersGraph from "../components/instaFollowersGraph";
import PostPerformance from "../components/postPerformance";
import StoryPerformance from "../components/storyPerformance";
import InstaImpressions from "../components/instaImpressions";
import EngagementInsta from "../components/engagementsInsta";
import PptxGenJS from "pptxgenjs";
import { Token } from "@mui/icons-material";

const InstaAudience = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [dataById, setDataById] = useState([]);
    const [instaById, setInstaById] = useState();
    const [instaBusiness, setInstaBusiness] = useState()
    const [totalFollowers, setTotalFollowers] = useState();
    const [totalImpressions, setTotalImpressions] = useState();
    const [mediaData, setMediaData] = useState()
    const [dateWiseFollowers, setDateWiseFollowers] = useState()
    const [storiesData, setStoriesData] = useState();
    const [startDate, setStartDate] = useState(dayjs().subtract(30, 'days').format('YYYY-MM-DD'));
    const [endDate, setEndDate] = useState(dayjs().format('YYYY-MM-DD'));
    const [selectedMetrics, setSelectedMetrics] = useState([]);
    const [showToast, setShowToast] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [totalStats, setTotalStats] = useState();
    const [instaBusinessIdSave, setInstaBusinessSave] = useState();
    const [showingMedia, setShowingMedia] = useState();
    const [followerChange, setFollowerChange] = useState(null);

    



    useEffect(() => {
        if (accessToken) {
            Token.apply
        }
    }, [])

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
                setData(response.data.data || []);
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
        localStorage.setItem("selectedMetrics", JSON.stringify(selectedMetrics));
        console.log("selectedMetrics", selectedMetrics);
    };

    // const handleMetricChange = (metric) => {
    //   setSelectedMetrics.push(metric);
    //   console.log("selectedMetrics", selectedMetrics);


    // }

    // Refactored function to fetch data by Instagram ID
    const fetchDataByInstagramId = async (id) => {
        try {
            const businessId = await getBusinessId(id);
            if (businessId) {
                const instaBusinessId = await getInstagramBusinessId(businessId);
                if (instaBusinessId) {
                    await fetchInstagramFollowers(instaBusinessId);
                }
                setInstaBusinessSave(instaBusinessId);
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

            setTotalFollowers(response?.data?.followers_count)
            setStoriesData(response.data)
            setMediaData(response?.data);
            console.log("media data", response?.data?.media);
        } catch (error) {
            console.error("Error fetching Instagram Followers Count:", error);
        }
    };    

   const handleDownload = async () => {
    const pptx = new PptxGenJS();

    // Slide 1: Logo and Title
    // Slide 1: Custom Header Layout with Logos and Title
const slide1 = pptx.addSlide();

// Top logos row
try {
    const sociapaLogo = await getBase64ImageFromUrl('/img/image.png'); // Replace with actual path
   let proquestLogo;

if (showingMedia?.some(itm => itm.username === "9amfoods")) {
  proquestLogo = await getBase64ImageFromUrl('/img/9am.webp');
} else if (showingMedia?.some(itm => itm.username === "proquest_nutrition")) {
  proquestLogo = await getBase64ImageFromUrl('/img/p1.png');
}

     

    // Sociapa Logo - Left
    slide1.addImage({
        data: sociapaLogo,
        x: 0.3,
        y: 0.9,
        w: 2.0,
        h: 1.0,
    });

    // Center Purple X
    slide1.addText("X", {
        x: 4.2,
        y: 0.5,
        fontSize: 44,
        bold: true,
        color: "800080", // Purple
    });

    // Proquest Logo - Right
    slide1.addImage({
        data: proquestLogo,
        x: 7.0,
        y: 0.9,
        w: 2.0,
        h: 1.0,
    });

} catch (err) {
    console.warn("Logo fetch failed:", err);
}

// Bottom Purple Banner with Title
slide1.addShape(pptx.ShapeType.rect, {
    x: 0,
    y: 2.2,
    w: '100%',
    h: 1.5,
    fill: { color: '800080' }, // Purple background
});

slide1.addText([
    { text: "PROQUEST PERFORMANCE\n", options: { bold: true, fontSize: 24 } },
    { text: "MARKETING REPORT MARCH", options: { bold: true, fontSize: 24 } },
], {
    x: 0,
    y: 2.8,
    w: '100%',
    align: 'center',
    color: 'FFFFFF',
});


    // Slide 2: Budget Monthly Report Title
    const slide2 = pptx.addSlide();
    slide2.addText("Budget Monthly Report", {
        x: 1.0,
        y: 1.0,
        fontSize: 26,
        bold: true,
        color: "336699",
    });

    // Add example budget summary text (replace or enhance as needed)
    slide2.addText("This report summarizes your monthly performance and media expenses.", {
        x: 1.0,
        y: 2.0,
        fontSize: 16,
        color: "333333",
    });

    // Slide 3: Analytics Table
    const slide3 = pptx.addSlide();
    slide3.addText("Analytics Overview", {
        x: 1.0,
        y: 0.5,
        fontSize: 22,
        bold: true,
        color: "003366",
    });

    // Example table data (replace with actual dynamic data)
    const tableData = [
        [
            { text: "Metric", options: { bold: true } },
            { text: "Followers", options: { bold: true } },
            { text: "Lost", options: { bold: true } },
            { text: "Recovery", options: { bold: true } },
        ],
        ["Followers", "1,200", "300", "900"],
        ["Reach", "15,000", totalStats[0].total_value.value],
        ["Profile Views", totalStats[1].total_value.value],
        ["Website Clicks", totalStats[2].total_value.value],
    ];

    slide3.addTable(tableData, {
        x: 0.5,
        y: 1.5,
        w: 8.5,
        colW: [2.5, 2.0, 2.0, 2.0],
        border: { type: "solid", color: "666666" },
        fontSize: 14,
    });

    // Slide 4+: Instagram posts
    const posts = showingMedia.slice(0, 1);
    for (let post of posts) {
        const slide = pptx.addSlide();
        slide.addText("Social Media Following at Glance", {
            x: 0.5,
            y: 0.1,
            fontSize: 16,
        });
        
        const mediaUrl = post.media_url;
        const imageUrl = mediaUrl?.endsWith(".mp4") ? post.thumbnail_url : mediaUrl;

        if (imageUrl) {
            try {
                const base64 = await getBase64ImageFromUrl(imageUrl);
                slide.addImage({
                    x: 0.5,
                    y: 4.2,
                    w: 3.5,
                    h: 3.5,
                    data: base64,
                });
            } catch (err) {
                console.warn("Image fetch failed for:", imageUrl);
            }
        }
    }

    // Save the PPTX file
    pptx.writeFile("Instagram_Report.pptx");
};


    // Helper: Convert image URL to base64
    async function getBase64ImageFromUrl(url) {
        const response = await fetch(url);
        const blob = await response.blob();


        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = () => reject("Base64 conversion failed");
            reader.readAsDataURL(blob);
        });
    }

    useEffect(() => {
    if (!instaBusinessIdSave) return;

    const fetchData = async () => {
        const accessToken = process.env.NEXT_PUBLIC_API_SECRET;
        try {
            const url = `https://graph.facebook.com/v21.0/${instaBusinessIdSave}/insights?metric=follower_count&period=day&since=${startDate}&until=${endDate}&access_token=${accessToken}`;
            const url2 = `https://graph.facebook.com/v21.0/${instaBusinessIdSave}/insights?metric=reach,profile_views,website_clicks&period=day&metric_type=total_value&since=${startDate}&until=${endDate}&access_token=${accessToken}`;

            const response = await axios.get(url);
            const response2 = await axios.get(url2);

            const followerData = response.data.data.find(metric => metric.name === "follower_count");
            const followersValues = followerData?.values || [];

            if (followersValues.length >= 2) {
                const startCount = followersValues[0].value;
                const endCount = followersValues[followersValues.length - 1].value;
                const difference = endCount - startCount;
                const trend = difference >= 0 ? "increase" : "decrease";

                // Optional: You can store this in a state for UI
                setFollowerChange({
                    start: startCount,
                    end: endCount,
                    difference,
                    trend,
                });
            }

            // Save detailed data
            setTotalStats(response2.data.data);
            setDateWiseFollowers(followersValues);
            setTotalImpressions(response.data.data[0].values);
        } catch (error) {
            console.log("Error fetching Instagram followers data:", error);
        }
    };

    fetchData();
}, [startDate, endDate, instaBusinessIdSave]);



    useEffect(() => {
        const savedMetrics = JSON.parse(localStorage.getItem("selectedMetrics")) || [];
        selectedMetrics.length === 0 && setSelectedMetrics(savedMetrics);
    }, [])

    useEffect(() => {
        if (selectedMetrics.length === 0) {
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000); // Toast disappears after 3 seconds
        }
    }, [selectedMetrics]);

    return (
        <div style={{ marginTop: '100px', textAlign: 'center', margin: "20px 60px" }}>
            <h1>Instagram   Profile</h1>
            <div className="bg-gray-100 p-6 mt-10 border border-gray-300 rounded-lg">
                {/* Header Section */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-lg font-semibold text-gray-800">Instagram Business Performance</h1>
                        <h3 className="text-sm text-gray-600 ">{startDate} to {endDate}</h3>
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
                        <button className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700" onClick={handleDownload}>
                            Download
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
                    {showToast && (
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-4 bg-red-500 text-white px-4 py-2 rounded-md shadow-md">
                            Please select Profile
                        </div>
                    )}

                </div>
                {/* Data Display Section */}
            </div>
             <ProfileStatics dataById={dataById} totalStats={totalStats} />
             <InstaFollowersGraph totalFollowers={totalFollowers} dateWiseFollowers={dateWiseFollowers} />
             <PostPerformance mediaData={mediaData} onDataReady={setShowingMedia} />
             <InstaImpressions dateWiseFollowers={dateWiseFollowers} totalImpressions={totalImpressions} />
             <EngagementInsta />
             <StoryPerformance storiesData={storiesData} />
        </div>
    )
}

export default InstaAudience