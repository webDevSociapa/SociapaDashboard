// import axios from 'axios';

// export const fetchStatsData = async () => {
//   try {
//     const sheetName = localStorage.getItem('sheetName');
//     if (!sheetName) {
//       throw new Error('Sheet name not found in localStorage');
//     }

//     const response = await axios.get(`/api/excelData?sheetName=${sheetName}`);
//     return response.data; // Return the fetched data
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     throw error; // Re-throw the error for further handling
//   }
// };
