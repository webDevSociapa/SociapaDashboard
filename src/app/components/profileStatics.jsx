import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const MetricCard = ({ title, value, tooltip, isLoading }) => {
  return (
    <div className="border p-4 text-left">
      <p className="font-semibold inline-block border-dotted border-b-2 mb-2">{title}</p>
      <br />
      {isLoading ? (
        <div>
          <Skeleton height={14} style={{ marginTop: '16px' }} />
          <Skeleton count={2} style={{ marginTop: '8px' }} />
        </div>
      ) : (
        <>
          <p className="inline-block">{value}</p>
          <svg
            className="w-6 h-6 text-green-800 dark:text-white inline-block ml-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 18 18"
          >
            <path d="M17 0h-5.768a1 1 0 1 0 0 2h3.354L8.4 8.182A1.003 1.003 0 1 0 9.818 9.6L16 3.414v3.354a1 1 0 0 0 2 0V1a1 1 0 0 0-1-1Z" />
            <path d="m14.258 7.985-3.025 3.025A3 3 0 1 1 6.99 6.768l3.026-3.026A3.01 3.01 0 0 1 8.411 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V9.589a3.011 3.011 0 0 1-1.742-1.604Z" />
          </svg>
          <span className="text-green-800 dark:text-white ml-2">{tooltip}</span>
        </>
      )}
    </div>
  );
};

const ProfileStatics = ({ dataById }) => {
  const isLoading = dataById.length === 0;
  const { impressions = 'N/A' } = dataById[0] || {};

  const metrics = [
    { title: 'Impressions', value: impressions, tooltip: '4323%' },
    { title: 'Engagements', value: '74,900,354', tooltip: '4323%' },
    { title: 'Post Link Clicks', value: '74,900,354', tooltip: '4323%' },
    { title: 'Engagement Rate (per Impression)', value: '74,900,354', tooltip: '4323%' },
  ];


  return (
    <div className="border h-auto mt-10 ">
      {/* Header Section */}
      <div className="border-b pb-4">
        <h3 className="font-bold text-lg">Performance Summary</h3>
        <p className="text-sm text-gray-600">
          View your key profile performance metrics accrued during the selected time period.
        </p>
      </div>

      {/* Metrics Section */}
      <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, index) => (
          <MetricCard
            key={index}
            title={metric.title}
            value={metric.value}
            tooltip={metric.tooltip}
            isLoading={isLoading}
          />
        ))}
      </div>
    </div>
  );
};

export default ProfileStatics;
