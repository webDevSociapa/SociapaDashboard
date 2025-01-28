"use client"
import dayjs from "dayjs";

const AudienceGrowth = () => {
  return (
    <>
      <div className="bg-gray-100 p-6 mt-10 border border-gray-300 rounded-lg">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-lg font-semibold text-gray-800">Profile Performance</h1>
            <p className="text-sm text-gray-600">Activity from Nov 1, 2024 - Dec 25, 2024</p>
          </div>

          <div className="flex items-center gap-4">
            {/* Date Range Picker */}
            <div className="flex gap-2">
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => handleDateChange("start", e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) => handleDateChange("end", e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {/* Share Button */}
            <button className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">
              Share
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
                : "Select Metrics"}
            </span>
            <svg
              className={`w-5 h-5 transform ${isDropdownOpen ? "rotate-180" : "rotate-0"
                }`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {isDropdownOpen && (
            <div className="absolute mt-2 w-full border border-gray-300 rounded-md bg-white shadow-md z-10">
              {data.map((metric, index) => (
                <label
                  key={metric.id}
                  onClick={() => fetchDataById(metric.id)}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 cursor-pointer"
                >
                  <svg
                    className=""
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    viewBox="0 0 92 92"
                    fill="none"
                  >
                    <rect x="0.138672" rx="15" fill="#EDF4FF" />
                    <path
                      d="M56.4927 48.6403L57.7973 40.3588H49.7611V34.9759C49.7611 32.7114 50.883 30.4987 54.4706 30.4987H58.1756V23.4465C56.018 23.1028 53.8378 22.9168 51.6527 22.8901C45.0385 22.8901 40.7204 26.8626 40.7204 34.0442V40.3588H33.3887V48.6403H40.7204V68.671H49.7611V48.6403H56.4927Z"
                      fill="#337FFF"
                    />
                  </svg>
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

        </div>

        {/* Data Display Section */}

      </div>
      <ProfileStatics dataById={dataById} />
    </>
  )
}

export default AudienceGrowth