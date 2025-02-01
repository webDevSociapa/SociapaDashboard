import { LineChart } from "@mui/x-charts";
import { useState, useEffect } from "react";
import axios from "axios"; // Uncomment when fetching data

const EngagementInsta = () => {
    const [series, setSeries] = useState([]);
    const [dates, setDates] = useState([]);

    useEffect(() => {
        // Simulated API Fetch - Replace with your actual API call
        const fetchImpressionsData = async () => {
            try {
                // const response = await axios.get("/api/impressions"); // Uncomment for API
                const response = {
                    data: [
                        { date: "2024-01-01", impressions: 20000, reach: 18000 },
                        { date: "2024-01-02", impressions: 35000, reach: 27000 },
                        { date: "2024-01-03", impressions: 40000, reach: 30000 },
                        { date: "2024-01-04", impressions: 50000, reach: 38000 },
                        { date: "2024-01-05", impressions: 60000, reach: 45000 },
                        { date: "2024-01-06", impressions: 55000, reach: 42000 },
                        { date: "2024-01-07", impressions: 70000, reach: 50000 },
                    ],
                };

                const formattedDates = response.data.map((item) => item.date);
                const impressionsData = response.data.map((item) => item.impressions);
                const reachData = response.data.map((item) => item.reach);

                setDates(formattedDates);
                setSeries([
                    { id: "Engagements", data: impressionsData, label: "Engagements", color: "blue" },
                    { id: "reach", data: reachData, label: "Avg Daily Reach", color: "green" },
                ]);
            } catch (error) {
                console.error("Error fetching impressions data:", error);
            }
        };

        fetchImpressionsData();
    }, []);

    return (
        <>
            <div className="border rounded-lg h-auto mt-10 text-left p-4">
                <p className="font-semibold">Engagements Performance</p>
                <p>See how people are engaging with your posts, stories, and reels during the reporting period.</p>
                <LineChart
                    xAxis={[{ scaleType: "point", data: dates }]} // X-axis as Date Range
                    yAxis={[{ min: 0, max: 80000, tickInterval: 20000 }]} // Y-axis with 20k intervals
                    series={series}
                    height={400}
                />
            </div>
            <div className="border rounded-lg p-4 w-full  bg-white shadow-md ">
                <h3 className="text-gray-600 font-semibold text-sm border-b pb-2">
                    Audience Metrics
                </h3>

                <div className="py-2">
                    <div className="flex justify-between font-semibold text-gray-800">
                        <span>Engagement Metrics</span>
                        {/* <span className="text-lg">{totalFollowers ? totalFollowers : "N/A"}</span> */}
                    </div>
                    <div className="text-green-600 text-sm font-medium flex justify-end">
                        {/* {growthPercentage && totalFollowers
                 ? `↑ ${growthPercentage}%`
                 : "N/A"} */}
                    </div>
                </div>

                <div className="py-2 border-t">
                    <div className="flex justify-between text-blue-600 font-medium">
                        <span>Organic Engagements</span>
                        {/* <span>{followersGained.reduce((acc, val) => acc + val, 0)}</span> */}
                    </div>
                    <div className="text-green-600 text-sm font-medium flex justify-end">
                        {/* ↑ {growthPercentage}% Or you can dynamically update if needed */}
                    </div>
                </div>

                <div className="py-2 border-t">
                    <div className="flex justify-between text-blue-600 font-medium">
                        <span>Organic Likes		</span>
                        {/* <span>{followersLost.reduce((acc, val) => acc + val, 0)}</span> */}
                    </div>
                    <div className="text-green-600 text-sm font-medium flex justify-end">
                        {/* ↑ {growthPercentage}% Or you can dynamically update if needed */}
                    </div>
                </div>
            </div>
        </>
    );
};

export default EngagementInsta;
