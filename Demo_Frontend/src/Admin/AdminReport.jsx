import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { LOCALHOST_URL } from "../config";
import axios from "axios";

const AdminReport = () => {
  const year_wise_data = {
    2022: [
      { month: "January", count: 10 },
      { month: "February", count: 20 },
      { month: "March", count: 30 },
      { month: "April", count: 20 },
      { month: "May", count: 50 },
      { month: "June", count: 30 },
      { month: "July", count: 10 },
      { month: "August", count: 10 },
      { month: "Sepetember", count: 10 },
      { month: "October", count: 10 },
      { month: "Novemeber", count: 10 },
      { month: "December", count: 10 },
    ],
    2023: [
      { month: "January", count: 120 },
      { month: "February", count: 130 },
      { month: "March", count: 120 },
      { month: "April", count: 110 },
      { month: "May", count: 110 },
      { month: "June", count: 110 },
      { month: "July", count: 120 },
      { month: "August", count: 10 },
      { month: "Sepetember", count: 10 },
      { month: "October", count: 10 },
      { month: "Novemeber", count: 10 },
      { month: "December", count: 10 },
    ],
  };

  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [reportData, setReportData] = useState({});
  const [data, setData] = useState({
    labels: year_wise_data[year].map((year) => {
      return year.month;
    }),
    datasets: [
      {
        label: "Number of Students Registered",
        data: [],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  });
  const options = {
    // maintainAspectRatio: false,
    scales: {
      x: {
        type: "category",
        lables: year_wise_data[year].map((year) => {
          return year.month;
        }),
      },
      y: {
        type: "linear",
        beginAtZero: true,
      },
    },
  };
  const registrationData = year_wise_data[year].filter((years) => years);
  const filteredData = registrationData.filter((item) => item.month);
  useEffect(() => {
    setData((prev) => ({
      ...prev,
      datasets: [
        { ...prev.datasets[0], data: filteredData.map((item) => item.count) },
      ],
    }));
    async function getRegisteredReport() {
      await axios.get(`${LOCALHOST_URL}/get_registered_report`).then((res) => {
        // console.log(res);
        setReportData(res.data);
      });
    }
    getRegisteredReport();
  }, [year]);
  // console.log(reportData);

  console.log(
    reportData["2018"] !== undefined
      ? Object.keys(reportData["2018"]).map((values, keys) => {
          return reportData["2018"][values];
        })
      : "None"
  );
  const handleYearChange = (e) => {
    setYear(e.target.value);
  };
  return (
    <div>
      <h2>Student Registration Chart</h2>
      <select value={year} onChange={handleYearChange}>
        {Object.keys(year_wise_data).map((years) => {
          return <option value={years}>{years}</option>;
        })}
      </select>
      <div id="bar_div">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default AdminReport;
