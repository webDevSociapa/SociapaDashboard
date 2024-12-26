"use client"
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';

export default function ChannelAnalysis() {
    const [reportStatus, setReportStatus] = useState(null); // To show download status or errors

    const handleReportDownload = async () => {
        try {
            setReportStatus("Downloading...");
            const sheetName = localStorage.getItem('sheetName')
            // Update the URL with the correct query parameter
            const response = await fetch(`/api/downloadReport?sheetName=${sheetName}`, {
                method: "GET",
            });

            if (!response.ok) {
                throw new Error(`Failed to download report: ${response.statusText}`);
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `${sheetName}.xlsx`; // Download as an Excel file
            link.click();
            window.URL.revokeObjectURL(url);

            setReportStatus("Report downloaded successfully!");
        } catch (error) {
            console.error("Error downloading report:", error);
            setReportStatus("Failed to download the report. Please try again.");
        }
    };

    return (
        <>
            <div className="container mx-auto my-8">
                <h1 className="text-center text-2xl font-bold mb-6">Report</h1>
                <div className="text-center">
                    <p className="mb-4">Click below to download the analysis report.</p>
                    <button
                        onClick={handleReportDownload}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        Download Report
                    </button>
                    {reportStatus && (
                        <p className="mt-4 text-center text-sm">
                            {reportStatus}
                        </p>
                    )}
                </div>
            </div>
            <ToastContainer />

        </>
    );
}
