import { LineChart } from "@mui/x-charts/LineChart";
import axios from "axios";
import { useEffect } from "react";

const InstaFollowersGraph = ({ followersData }) => {
    // Sample Data (Replace with real data)
    const xAxisData = ["Nov 3", "Nov 6", "Nov 9", "Nov 12", "Nov 15", "Nov 18", "Nov 21", "Nov 24", "Nov 27", "Dec 3", "Jan 2"];
    const followersGained = [50, 120, 180, -200, 300, 450, 600, 900, 400, 700, 500]; // Example values
    const followersLost = [-20, -60, -100, -80, +200, -300, -400, -350, -250, 500, 300]; // Example values


    useEffect(() => {
        const fetchData = async () => {
            const accessToken = "EAAZAzDEZADHB8BO7kZBIX7hUWAe4yuHhAktbeAED7d2sVSN8nEZCu9Cb8h1DCdxllFtKjPjpWJAtRCFksJWcZCotsSCepW5IEW70vxwZCYn53dYKM3dnfU3IvAxOq8bL1rFaxgYZBqNaKFaYgyJPmbe69agAUGFkxfZC5HHrYE4MTWdeycxf4NRB622Q"; // Replace with your access token
            try {
                const url = `https://graph.instagram.com/v21.0/insights?metric=follower_count&since=2024-01-01&until=2024-01-26&access_token=${accessToken}`;
                const response = await axios.get(url);
                console.log("Instagram Followers Data:", response);
            } catch (error) {
                console.log("Error fetching Instagram followers data:", error);
            }
        }
        fetchData()
    }, [])

    return (
        <>
            <div className="insta-followers-graph">
                <h3>Instagram Audience Growth</h3>
                <LineChart
                    xAxis={[{ scaleType: "point", data: xAxisData }]}
                    series={[
                        { data: followersGained, label: "Followers Gained", color: "#1abc9c" }, // Green color
                        { data: followersLost, label: "Followers Lost", color: "#8e44ad" }, // Purple color
                    ]}
                    width={1200}
                    height={400}
                />
            </div>
            <div className="border rounded-lg p-4 w-full  bg-white shadow-md">
                <h3 className="text-gray-600 font-semibold text-sm border-b pb-2">
                    Audience Metrics
                </h3>

                <div className="py-2">
                    <div className="flex justify-between font-semibold text-gray-800">
                        <span>Followers</span>
                        <span className="text-lg">24,393</span>
                    </div>
                    <div className="text-green-600 text-sm font-medium flex justify-end">
                        ↑ 189.9%
                    </div>
                </div>

                <div className="py-2">
                    <div className="flex justify-between font-semibold text-gray-800">
                        <span>Net Follower Growth</span>
                        <span className="text-lg">16,304</span>
                    </div>
                    <div className="text-green-600 text-sm font-medium flex justify-end">
                        ↑ 4,294.6%
                    </div>
                </div>

                <div className="py-2 border-t">
                    <div className="flex justify-between text-blue-600 font-medium">
                        <span>Followers Gained</span>
                        <span>20,171</span>
                    </div>
                    <div className="text-green-600 text-sm font-medium flex justify-end">
                        ↑ 4,505.3%
                    </div>
                </div>

                <div className="py-2 border-t">
                    <div className="flex justify-between text-blue-600 font-medium">
                        <span>Followers Lost</span>
                        <span>3,867</span>
                    </div>
                    <div className="text-green-600 text-sm font-medium flex justify-end">
                        ↑ 5,671.6%
                    </div>
                </div>
            </div>
        </>
    );
};

export default InstaFollowersGraph;
