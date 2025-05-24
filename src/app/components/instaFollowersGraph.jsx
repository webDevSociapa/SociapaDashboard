"use client";

import { LineChart } from "@mui/x-charts/LineChart";
import { useEffect, useState } from "react";

   const InstaFollowersGraph = ({ totalFollowers, dateWiseFollowers }) => {
    console.log("dateWiseFollowers",dateWiseFollowers);
    
    const [followersGained, setFollowersGained] = useState([]);
    const [followersLost, setFollowersLost] = useState([]);
    const [xAxisData, setXAxisData] = useState([]);
    const [growthPercentage, setGrowthPercentage] = useState(0);

    useEffect(() => {
        if (dateWiseFollowers && dateWiseFollowers.length > 0) {
            const gained = [];
            const lost = [];
            const dates = [];

            // Loop through the data to calculate gained and lost followers
            for (let i = 0; i < dateWiseFollowers.length; i++) {
                const currentData = dateWiseFollowers[i];
                const previousData = i > 0 ? dateWiseFollowers[i - 1] : null;
                // Format the date for x-axis (use the `end_time` as the date)
                const date = new Date(currentData.end_time).toLocaleDateString();
                dates.push(date);
                if (previousData) {
                    const gainedValue = currentData.value - previousData.value;
                    gained.push(gainedValue > 0 ? gainedValue : 0); // followers gained
                    lost.push(gainedValue < 0 ? Math.abs(gainedValue) : 0); // followers lost
                } else {
                    gained.push(0); // No change for the first data point
                    lost.push(0);
                }
        }
            setXAxisData(dates);
            setFollowersGained(gained);
            setFollowersLost(lost);
            // Calculate the growth percentage based on the first and last data points
            const startFollowers = dateWiseFollowers[0].value;
            const endFollowers = dateWiseFollowers[dateWiseFollowers.length - 1].value;
            const growth = ((endFollowers - startFollowers) / startFollowers) * 100;
            setGrowthPercentage(growth.toFixed(2));
        }
    }, [dateWiseFollowers]);

    console.log("followersGained",followersGained);
    console.log("followerfollowersLostGained",followersLost);
    console.log("totalFollowers",totalFollowers);
    

    // const DataApi = async() =>{
    //     const response = await axios.get(`/api/excelData?sheetName=${sheetName}`);
    //     const sortedData = response.data.sort((a,b)=>{
    //         console.log("sortedData",sortedData);
    //         return new Date(b[""] || "1970-01-01") - new Date(a[""] || "1970-01-01");
            
    //     })
    // }

    // useEffect(()=>{
    //     DataApi();
    // },[])

    return (
        <>
            <div className="insta-followers-graph mt-10">
                <LineChart
                    xAxis={[{ scaleType: "point", data: xAxisData }]}
                    series={[
                        { data: followersGained, label: "Followers Gained", color: "#1abc9c" },
                        { data: followersLost, label: "Followers Lost", color: "#8e44ad" },
                    ]}
                    height={400}
                />
            </div>
            <div className="border rounded-lg p-4 w-full  bg-white shadow-md ">
                <h3 className="text-gray-600 font-semibold text-sm border-b pb-2">
                    Audience Metrics
                </h3>

                <div className="py-2">
                    <div className="flex justify-between font-semibold text-gray-800">
                        <span>Followers</span>
                        <span className="text-lg">{totalFollowers ? totalFollowers : "N/A"}</span>
                    </div>
                    <div className="text-green-600 text-sm font-medium flex justify-end">
                        {growthPercentage && totalFollowers
                            ? `↑ ${growthPercentage}%`
                            : "N/A"}
                    </div>
                </div>

                <div className="py-2 border-t">
                    <div className="flex justify-between text-blue-600 font-medium">
                        <span>Followers Gained</span>
                        <span>{followersGained.reduce((acc, val) => acc + val, 0)}</span>
                    </div>
                    <div className="text-green-600 text-sm font-medium flex justify-end">
                        ↑ {growthPercentage}% {/* Or you can dynamically update if needed */}
                    </div>
                </div>

                <div className="py-2 border-t">
                    <div className="flex justify-between text-blue-600 font-medium">
                        <span>Followers Lost</span>
                        <span>{followersLost.reduce((acc, val) => acc + val, 0)}</span>
                    </div>
                    <div className="text-green-600 text-sm font-medium flex justify-end">
                        ↑ {growthPercentage}% {/* Or you can dynamically update if needed */}
                    </div>
                </div>
            </div>
        </>
    );
};

export default InstaFollowersGraph;
