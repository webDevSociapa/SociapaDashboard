import { useEffect, useState } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import axios from "axios";

const StoryPerformance = ({ storiesData }) => {
    const [topStories, setTopStories] = useState([]);
    const xAxisData = ["Nov 3", "Nov 6", "Nov 9", "Nov 12", "Nov 15", "Nov 18", "Nov 21", "Nov 24", "Nov 27", "Dec 3", "Jan 2"];
    const followersGained = [50, 120, 180, -200, 300, 450, 600, 900, 400, 700, 500]; // Example values
    const followersLost = [-20, -60, -100, -80, 200, -300, -400, -350, -250, 500, 300]; // Example values

    const accessToken = process.env.NEXT_PUBLIC_API_SECRET; // Replace with your access token
    useEffect(() => {
        const fetchLikesData = async () => {
            try {
                
                const mediaDetails = await Promise.all(
                    storiesData?.stories?.data?.map(async (story) => {
                        const response = await axios.get(
                            `https://graph.facebook.com/v21.0/${story.id}`,
                            {
                                params: {
                                    fields: "thumbnail_url",
                                    access_token: accessToken,
                                },
                            }
                        );
                        return response.data;
                    })
                );

                // Set top stories
                setTopStories(mediaDetails);
            } catch (error) {
                console.error("Error fetching media data:", error);
            }
        };
        fetchLikesData();
    }, [storiesData]);

    return (
        <>
            <div className="border rounded-lg h-auto mt-10 text-left p-4">
                <p className="font-semibold">Stories Performance</p>
                <p>Review how your audience interacted with your stories.</p>
                <LineChart
                    xAxis={[{ scaleType: "point", data: xAxisData }]}
                    series={[
                        { data: followersGained, label: "Story Gained", color: "#f1c40f" },
                        { data: followersLost, label: "Story Lost", color: "#ce3665" },
                    ]}
                    height={400}
                />
            </div>

            {/* Display Top Stories */}
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                {topStories.map((story, index) => (
                    <div key={index} className="border p-2 rounded-lg">
                        <video
                            controls
                            className="h-[250px] w-full object-cover rounded-lg"
                        >
                            <source src={story.thumbnail_url} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                        <iframe>
                            <source src={story.thumbnail_url} type="video/mp4" />
                            Your browser does not support the video tag.
                        </iframe>
                    </div>
                ))}
            </div>
        </>
    );
};

export default StoryPerformance;
