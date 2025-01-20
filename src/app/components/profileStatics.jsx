const ProfileStatics = ({dataById}) => {
    console.log("dataById", dataById[0]);

    // Destructure impressions from the first object in the dataById array
  
  
    
    return (
        <div className="border h-auto mt-10 mx-4 lg:mx-10 p-4">
            {/* Header Section */}
            <div className="border-b pb-4">
                <h3 className="font-bold text-lg">Performance Summary</h3>
                <p className="text-sm text-gray-600">
                    View your key profile performance metrics accrued during the selected time period.
                </p>
            </div>
            {/* Metrics Section */}
            <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="border p-4 text-left">
                    <p className="font-semibold inline-block border-dotted border-b-2 mb-2">Impressions</p>
                    <br />
                    <p className="inline-block">{ dataById.length > 0 ? dataById[0].impressions : "N/A"}</p>
                    <svg className="w-6 h-6 text-green-800 dark:text-white inline-block ml-2" data-tooltip-target="tooltip-top" data-tooltip-placement="bottom" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                        <path d="M17 0h-5.768a1 1 0 1 0 0 2h3.354L8.4 8.182A1.003 1.003 0 1 0 9.818 9.6L16 3.414v3.354a1 1 0 0 0 2 0V1a1 1 0 0 0-1-1Z" />
                        <path d="m14.258 7.985-3.025 3.025A3 3 0 1 1 6.99 6.768l3.026-3.026A3.01 3.01 0 0 1 8.411 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V9.589a3.011 3.011 0 0 1-1.742-1.604Z" />
                    </svg><span className="text-green-800 dark:text-white ml-2" data-tooltip="tooltip-top" data-tooltip-placement="bottom">
                        4323%
                    </span>
                </div>
                <div className="border p-4 text-left">
                    <p className="font-semibold inline-block border-dotted border-b-2 mb-2">Engagements</p>
                    <br />
                    <p className="inline-block">74,900,354</p>
                    <svg className="w-6 h-6 text-green-800 dark:text-white inline-block ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                        <path d="M17 0h-5.768a1 1 0 1 0 0 2h3.354L8.4 8.182A1.003 1.003 0 1 0 9.818 9.6L16 3.414v3.354a1 1 0 0 0 2 0V1a1 1 0 0 0-1-1Z" />
                        <path d="m14.258 7.985-3.025 3.025A3 3 0 1 1 6.99 6.768l3.026-3.026A3.01 3.01 0 0 1 8.411 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V9.589a3.011 3.011 0 0 1-1.742-1.604Z" />
                    </svg> <span className="text-green-800 dark:text-white ml-2" data-tooltip="tooltip-top" data-tooltip-placement="bottom">
                        4323%
                    </span>
                </div>
                <div className="border p-4 text-left">
                    <p className="font-semibold inline-block border-dotted border-b-2 mb-2">Post Link Clicks</p>
                    <br />
                    <p className="inline-block">74,900,354</p>
                    <svg className="w-6 h-6 text-green-800 dark:text-white inline-block ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                        <path d="M17 0h-5.768a1 1 0 1 0 0 2h3.354L8.4 8.182A1.003 1.003 0 1 0 9.818 9.6L16 3.414v3.354a1 1 0 0 0 2 0V1a1 1 0 0 0-1-1Z" />
                        <path d="m14.258 7.985-3.025 3.025A3 3 0 1 1 6.99 6.768l3.026-3.026A3.01 3.01 0 0 1 8.411 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V9.589a3.011 3.011 0 0 1-1.742-1.604Z" />
                    </svg>  <span className="text-green-800 dark:text-white ml-2" data-tooltip="tooltip-top" data-tooltip-placement="bottom">
                        4323%
                    </span>
                </div>
                <div className="border p-4 text-left">
                    <p className="font-semibold inline-block border-dotted border-b-2 mb-2">Engagement Rate (per Impression)</p>
                    <br />
                    <p className="inline-block">74,900,354</p>
                    <svg className="w-6 h-6 text-green-800 dark:text-white inline-block ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                        <path d="M17 0h-5.768a1 1 0 1 0 0 2h3.354L8.4 8.182A1.003 1.003 0 1 0 9.818 9.6L16 3.414v3.354a1 1 0 0 0 2 0V1a1 1 0 0 0-1-1Z" />
                        <path d="m14.258 7.985-3.025 3.025A3 3 0 1 1 6.99 6.768l3.026-3.026A3.01 3.01 0 0 1 8.411 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V9.589a3.011 3.011 0 0 1-1.742-1.604Z" />
                    </svg> <span className="text-green-800 dark:text-white ml-2" data-tooltip="tooltip-top" data-tooltip-placement="bottom">
                        4323%
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ProfileStatics;
