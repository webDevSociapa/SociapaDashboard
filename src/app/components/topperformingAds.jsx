import axios from "axios";
import { useEffect, useState } from "react";

export default function TopPerformingAds() {
    const [topAds,setTopAds] = useState([])
    const campaigns = [
        { sr: '01', name: 'Target Sales', Popularity: '12/12', Type: 8923 },
        { sr: '02', name: 'Target Sales', Popularity: '12/12', Type: 8923 },
        { sr: '03', name: 'Target Sales', Popularity: '12/12', Type: 8923 },
        { sr: '04', name: 'Target Sales', Popularity: '12/12', Type: 8923 },
    ];


 
    

    useEffect(() => {
        const fetchStatsData = async () => {
          try {
            const sheetName = localStorage.getItem('sheetName')
            if (!sheetName) {
              setError('Sheet name not found. Please set the sheet name first.')
              return
            }
    
            const response = await axios.get(`/api/excelData?sheetName=${sheetName}`)
            const processedData = processChartData(response.data)
            setTopAds(processedData)
            console.log('Processed chart data11111:', processedData)
          } catch (error) {
            console.error('Error fetching data:', error)
            setError('Failed to fetch data. Please try again later.')
          }
        }
    
        fetchStatsData()
      }, [])

    const processChartData = (data) => {
        // Assuming the data is sorted by date
        const lastTwoMonths = data.slice(-60) // Get last 60 days (approximately 2 months)
        console.log("lastTwoMonthssss",lastTwoMonths);
        
        
        
        return lastTwoMonths.map(item => ({
          date: item[""] || '', // Assuming the date is in the "" column
          impressions: parseInt(item.__EMPTY_5 || 0),
          clicks: parseInt(item.__EMPTY_7 || 0),
          cpc: parseInt(item.__EMPTY_8),
          ctr: parseInt(item.__EMPTY_9)
        }))
      }

      


    //   const topAdsData = topAds.map((itm,index))
    // const topAdsData = topAds.map((itm)=>({
    //     const data2 = itm.clicks(()=> itm)
    // }))


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
