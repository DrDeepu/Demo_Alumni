import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';



const year_wise_data = {
    2022:
        [{month:'January',count:10},
        {month:'February',count:20},
        {month:'March',count:30},
        {month:'April',count:20},
        {month:'May',count:50},
        {month:'June',count:30},
        {month:'July',count:10},
        {month:'August',count:10},
        {month:'Sepetember',count:10},
        {month:'October',count:10},
        {month:'Novemeber',count:10},
        {month:'December',count:10}]
    ,
    2023:[
      {month:'January',count:120},
      {month:'February',count:130},
      {month:'March',count:120},
      {month:'April',count:110},
      {month:'May',count:110},
      {month:'June',count:110},
      {month:'July',count:120},
      {month:'August',count:10},
      {month:'Sepetember',count:10},
      {month:'October',count:10},
      {month:'Novemeber',count:10},
      {month:'December',count:10},
    ],
    // 2021:{
    //     January:10,
    //     February:10,
    //     March:10,
    //     April:10,
    //     May:10,
    //     June:10,
    //     July:10,
    //     August:10,
    //     Sepetember:10,
    //     October:10,
    //     Novemeber:10,
    //     December:10,
    // },
    // 2022:{
    //     January:10,
    //     February:10,
    //     March:10,
    //     April:10,
    //     May:10,
    //     June:10,
    //     July:10,
    //     August:10,
    //     Sepetember:10,
    //     October:10,
    //     Novemeber:10,
    //     December:10,
    // },
    // 2023:{
    //     January:10,
    //     February:10,
    //     March:10,
    //     April:10,
    //     May:10,
    //     June:10,
    //     July:10,
    //     August:10,
    //     Sepetember:10,
    //     October:10,
    //     Novemeber:10,
    //     December:10,
    // }
}



// const options = {
//   scales: {
//     y: {
//       beginAtZero: true
//     }
//   }
// };


const options = {
    scales: {
      x: {
        type: 'category',
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      },
      y: {
        type: 'linear',
        beginAtZero: true,
      },
    },
  };
  

  const AdminReport = () => {
    // const data = {
    //   labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    //   datasets: [
    //     {
    //       label: 'Number of Students Registered',
    //       data: [],
    //       backgroundColor: 'rgba(255, 99, 132, 0.2)',
    //       borderColor: 'rgba(255, 99, 132, 1)',
    //       borderWidth: 1,
    //     },
    //   ],
    // };
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [data, setData] = useState({
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
      {
        label: 'Number of Students Registered',
        data: [],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  });
  // console.log(data.datasets[0].data)
  const registrationData = year_wise_data[year].filter(years=>
    years
      );
  const filteredData = registrationData.filter((item) => 
  item.month
  // console.log(item.month)
  )
  ;
  useEffect(()=>{
    // setData(...data ,data.datasets[0].data:filteredData.map((item) => item.count))
    // setData(...data,data.datasets[0].data:1})
    // console.log()
    setData(prev=>({...prev ,datasets:[{...prev.datasets[0],data:filteredData.map((item) => item.count)}]}))

  },[year])
  // const [year, setYear] = useState(year_wise_data[0]);


  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  // replace this with your actual API call to get the registration data for the selected year
  // const registrationData = [
  //   { month: 'January', count: 20 },
  //   { month: 'February', count: 30 },
  //   { month: 'March', count: 40 },
  //   { month: 'April', count: 25 },
  //   { month: 'May', count: 35 },
  //   { month: 'June', count: 45 },
  //   { month: 'July', count: 55 },
  //   { month: 'August', count: 65 },
  //   { month: 'September', count: 75 },
  //   { month: 'October', count: 85 },
  //   { month: 'November', count: 95 },
  //   { month: 'December', count: 105 },
  // ];
  // const registrationData = year_wise_data[year].filter(years=>
  //   years
  //     );
      // console.log(registrationData)
  // filter the registration data to include only the selected year
  // const filteredData = registrationData.filter((item) => 
  // item.month
  // // console.log(item.month)
  // )
  // ;
  // setData({...data ,datasets:[{...[0],data:[filteredData.map((item) => item.count)]}]})

// console.log(data)
// console.log(filteredData)
  // update the chart data with the filtered registration data
  // setData({...data ,data.datasets[0].data:filteredData.map((item) => item.count)})
// console.log(year_wise_data[year])

  // console.log(data.datasets[0].data)
  // year_wise_data[years].month.includes(year));
  // console.log(year_wise_data[years]['month']));
// console.log(filteredData)
  // data.datasets[0].data = filteredData.map((item,keys) =>console.log(year_wise_data[item]));




  return (
    <div>
      <h2>Student Registration Chart</h2>
      <select value={year} onChange={handleYearChange}>
        {
            Object.keys(year_wise_data).map(years=>{
                return (
                  <option value={years} >{years}</option>
                )
                
            })
        }
      </select>
      <Bar data={data} options={options} />
    </div>
  );
};

export default AdminReport;
