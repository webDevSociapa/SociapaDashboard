export function processChartData(data) {
    const processedData = data.reduce((acc, item) => {
      const date = item[""];
      if (date && date.startsWith('2024-')) {
        const impressions = parseInt(item['Report Period: Dec 1, 2024 - Dec 11, 2024'] || 0);
        const clicks = parseInt(item.__EMPTY_3 || 0);
        
        acc.push({
          date,
          impressions,
          clicks
        });
      }
      return acc;
    }, []);
  
    return processedData.sort((a, b) => new Date(a.date) - new Date(b.date));
  }
  
  