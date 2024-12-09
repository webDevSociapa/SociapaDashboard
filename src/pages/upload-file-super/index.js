'use client'

import { useState } from 'react';
import ExcelUploadForm from '../../app/components/excelUploadForm';

export default function Home() {
  const [sheetData, setSheetData] = useState(null);
  const [fetchSheetName, setFetchSheetName] = useState('');

  const handleFetch = async () => {
    if (!fetchSheetName) {
      alert('Please enter a sheet name to fetch');
      return;
    }

    try {
      const response = await fetch(`/api/excel/${fetchSheetName}`);
      const data = await response.json();
      setSheetData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setSheetData(null);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Excel File Upload and Data Fetch</h1>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Upload Excel File</h2>
        <ExcelUploadForm />
      </div>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Fetch Sheet Data</h2>
        <div className="flex space-x-2">
          <input
            type="text"
            value={fetchSheetName}
            onChange={(e) => setFetchSheetName(e.target.value)}
            className="flex-grow rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="Enter sheet name to fetch"
          />
          <button
            onClick={handleFetch}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Fetch Data
          </button>
        </div>
      </div>
      {sheetData && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Sheet Data</h2>
          <pre className="bg-gray-100 p-4 rounded-md overflow-auto">
            {JSON.stringify(sheetData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
