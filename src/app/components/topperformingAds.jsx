export default function TopPerformingAds() {
    const campaigns = [
        { sr: '01', name: 'Target Sales', Popularity: '12/12', Type: 8923 },
        { sr: '02', name: 'Target Sales', Popularity: '12/12', Type: 8923 },
        { sr: '03', name: 'Target Sales', Popularity: '12/12', Type: 8923 },
        { sr: '04', name: 'Target Sales', Popularity: '12/12', Type: 8923 },
    ];

    return (
        <div className="rounded-lg border bg-white p-4">
            <h2 className="mb-4 text-lg font-bold">Top Performing Ads</h2>
            <table className="w-full border-collapse ">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="py-2 text-left">SN</th>
                        <th className="px-4 py-2 text-left">Name</th>
                        <th className="px-4 py-2 text-left">Popularity</th>
                        <th className="px-4 py-2 text-left">Type</th>
                    </tr>
                </thead>
                <tbody>
                    {campaigns.map((campaign, index) => (
                        <tr key={index} className="hover:bg-gray-50 divide-y">
                            <td className="divide-x px-4 py-2">{campaign.sr}</td>
                            <td className="divide-x px-4 py-2">{campaign.name}</td>
                            <td className="divide-x px-4 py-2">{campaign.Popularity}</td>
                            <td className="divide-x px-4 py-2">{campaign.Type}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
