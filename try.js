

 
    // Output: [90, 180, 135, 72]
    

    // data.map((item,index)=>{
    //     console.log(item,index)
    // })

    const data1 = [3, 6, 3, 6, 2];
    const data2 = [6, 4, 7, 3, 8];
    
    const calculateFieldDifference = (data1, data2) => {
      const sum1 = data1.reduce((acc, item) => acc + item, 0); // Sum the values in data1
      const sum2 = data2.reduce((acc, item) => acc + item, 0); // Sum the values in data2
      return sum1 - sum2;
    }; 