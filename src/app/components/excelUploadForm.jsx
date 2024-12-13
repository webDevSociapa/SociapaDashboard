'use client'

import { useState } from 'react';

export default function ExcelUploadForm() {
  const [file, setFile] = useState(null);
  const [sheetName, setSheetName] = useState('');
  const [message, setMessage] = useState('');
  const [successStatus,setSuccessStatus] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !sheetName) {
      setMessage('Please select a file and enter a sheet name');
      return;
    }
    const formData = new FormData();
    formData.append('file', file);
    formData.append('sheetName', sheetName);


    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      setMessage('Error uploading file');
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="file" className="block text-sm font-medium text-gray-700">
          Excel File
        </label>
        <input
          type="file"
          id="file"
          accept=".xlsx, .xls, .csv"
          onChange={(e) => setFile(e.target.files[0])}
          className="mt-1 block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-violet-50 file:text-violet-700
            hover:file:bg-violet-100"
        />
      </div>
      <div>
        <label htmlFor="sheetName" className="block text-sm font-medium text-gray-700">
          Sheet Name
        </label>
        <input
          type="text"
          id="sheetName"
          value={sheetName}
          onChange={(e) => setSheetName(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          placeholder="Enter sheet name"
        />
      </div>
      <button
        type="submit"
        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Upload
      </button>
      {message && <p className="mt-2 text-sm text-gray-600">{message}</p>}
    </form>
  );
}

