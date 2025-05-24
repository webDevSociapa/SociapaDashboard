"use client";

import { LineChart } from "@mui/x-charts";
import { useState, useEffect } from "react";

const InstaImpressions = ({ totalImpressions }) => {

    const [dates, setDates] = useState([]);
    const [impressionsData, setImpressionsData] = useState([]);
    const [dailyGrowth, setDailyGrowth] = useState([]);

    useEffect(() => {
        if (totalImpressions && totalImpressions.length > 0) {
            const formattedDates = [];
            const impressions = [];
            const growth = [];

            for (let i = 0; i < totalImpressions.length; i++) {
                const current = totalImpressions[i];
                formattedDates.push(new Date(current.end_time).toLocaleDateString());
                impressions.push(current.value);

                // Calculate daily growth percentage
                if (i > 0) {
                    const previous = totalImpressions[i - 1].value;
                    const dailyChange = ((current.value - previous) / previous) * 100;
                    growth.push(dailyChange.toFixed(2));
                } else {
                    growth.push(0); // No growth on the first day
                }
            }

            setDates(formattedDates);
            setImpressionsData(impressions);
            setDailyGrowth(growth);
        }
    }, [totalImpressions]);
    

    return (
        <>
            <div className="border rounded-lg h-auto mt-10 text-left p-4">
                <p className="font-semibold">Impressions Performance</p>
                <p>Review how your audience interacted with your stories.</p>

                <LineChart
                    xAxis={[{ scaleType: "point", data: dates }]}
                    series={[
                        { id: "impressions", data: impressionsData, label: "Impressions", color: "blue" },
                        { id: "growth", data: dailyGrowth, label: "Daily Growth (%)", color: "green" }
                    ]}
                    height={400}
                    margin={{ left: 80 }}
                />
            </div>

            <div className="border rounded-lg p-4 w-full bg-white shadow-md">
                <h3 className="text-gray-600 font-semibold text-sm border-b pb-2">
                    Audience Metrics
                </h3>

                <div className="py-2">
                    <div className="flex justify-between font-semibold text-gray-800">
                        <span>Total Impressions</span>
                        <span className="text-lg">
                            {impressionsData.length > 0 ? impressionsData.reduce((a, b) => a + b, 0) : "N/A"}
                        </span>
                    </div>
                </div>

                <div className="py-2 border-t">
                    <div className="flex justify-between text-blue-600 font-medium">
                        <span>Daily Growth (%)</span>
                        <span>{dailyGrowth.length > 0 ? `${dailyGrowth[dailyGrowth.length - 1]}%` : "N/A"}</span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default InstaImpressions;
