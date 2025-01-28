import axios from "axios";
import React, { useEffect, useState } from "react";

const PostPerformance = ({ mediaData }) => {
    const [topPosts, setTopPosts] = useState([]);
    const accessToken = "EAAZAzDEZADHB8BO7kZBIX7hUWAe4yuHhAktbeAED7d2sVSN8nEZCu9Cb8h1DCdxllFtKjPjpWJAtRCFksJWcZCotsSCepW5IEW70vxwZCYn53dYKM3dnfU3IvAxOq8bL1rFaxgYZBqNaKFaYgyJPmbe69agAUGFkxfZC5HHrYE4MTWdeycxf4NRB622Q"; // Replace with your access token

    useEffect(() => {
        const fetchLikesData = async () => {
            try {
                // Fetch like count for all media IDs
                const mediaDetails = await Promise.all(
                    mediaData.media.data.map(async (media) => {
                        const response = await axios.get(
                            `https://graph.facebook.com/v21.0/${media.id}`,
                            {
                                params: {
                                    fields: "id,like_count,media_url,caption,username,timestamp,thumbnail_url",
                                    access_token: accessToken,
                                },
                            }
                        );
                        console.log("response", response);

                        return response.data;
                    })
                );
                // Sort posts by like_count in descending order
                const sortedMedia = mediaDetails.sort((a, b) => b.like_count - a.like_count);

                // Get top 10 posts
                setTopPosts(sortedMedia.slice(0, 10));
            } catch (error) {
                console.error("Error fetching media data:", error);
            }
        };

        fetchLikesData();
    }, [mediaData]);

    return (
        <div className="border lg-rounded mt-10">
            <h3 className="text-left px-2 font-semibold mx-4">Post Performance</h3>
            <p className="text-left px-2 pb-4 mx-4">Review how your audience interacted with your posts.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2">
                {topPosts.map((post) => (
                    <div key={post.id} className="max-w-sm p-4 border rounded-lg shadow-md bg-white mx-4 mb-4">
                        {/* Header */}
                        <div className="flex items-center px-4 py-3 bg-red-100 rounded-t-lg">
                            <img
                                className="w-10 h-10 rounded-full border border-gray-300"
                                src={mediaData.profile_picture_url}
                                alt="Profile"
                            />
                            <div className="ml-3">
                                <h4 className="text-sm font-semibold">{post.username}</h4>
                                <p className="text-xs text-gray-500">{new Date(post.timestamp).toLocaleString()}</p>
                            </div>
                        </div>

                        {/* Post Content */}
                        <div className="px-4 py-2">
                            <p className="text-sm text-gray-700">
                                {post.caption || "No caption provided"}
                            </p>
                        </div>

                        {/* Image Section */}
                        <div className="px-4">
                            <img
                                className="w-full rounded-lg"
                                src={post.thumbnail_url}
                                alt="Post"
                            />
                        </div>
                        {/* <iframe src={post.media_url} allowFullScreen /> */}

                        {/* Engagement Metrics */}
                        <div className="px-4 py-3 border-t">
                            <p className="font-semibold text-gray-800">Total Engagements {post.like_count}</p>
                            <ul className="text-sm text-gray-600">
                                <li className="flex justify-between py-1">
                                    <span>Likes</span> <span className="font-medium">{post.like_count}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PostPerformance;
