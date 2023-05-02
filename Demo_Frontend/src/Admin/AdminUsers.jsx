/* eslint-disable */
import React from "react";
import AdminNavBar from "./AdminNavBar";
import UserCard from "./UserCard";
import { useEffect, useState } from "react";
import axios from "axios";
import "../BlurAnimation.css";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Pagination from "@mui/material/Pagination";

const AdminUsers = () => {
  const [userdata, setUserdata] = useState({});
  const [reFetch, setReFetch] = useState(false);
  const [filter, setFilter] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const [pagination, setPagination] = React.useState(5);

  const handleChange = (event) => {
    setFilter(event.target.value);
  };
  const access_token = useSelector((state) => state.access_token.access_token);
  useEffect(() => {
    fetch_all_users();
    // authenticaiton();
    // console.log(page);
    setPagination(page * 5);

    //eslint-disable-next-line
  }, [reFetch, filter, page]);
  async function func() {
    await axios.get("http://127.0.0.1:5000/user_count").then((res) => {
      // console.log(res.data.total_users);
      setCount(res.data.not_valid_users);
      // setUser_data(res.data);
    });
  }
  func();

  async function fetch_all_users() {
    await axios
      .get("http://127.0.0.1:5000/all_users", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((res) => {
        setUserdata(res.data);
      })
      .catch((res) => {
        // console.log(res);
      });
  }
  // console.log(userdata);
  let countValue = 0;
  const values = Object.keys(userdata).filter((value, key) => {
    // console.log(key);
    // countValue += 1;
    return filter !== 0
      ? filter === true
        ? userdata[value]["valid"] === "true" && value
        : userdata[value]["valid"] === "false" && value
      : value;
  });
  console.log(countValue);
  return (
    <>
      <AdminNavBar count={count} />
      <div id="admin_users_blur_animation" className="admin-users">
        <Box sx={{ minWidth: 120 }}>
          <FormControl sx={{ width: "10%" }}>
            <InputLabel id="demo-simple-select-label">Filter User</InputLabel>
            <Select
              className="admin-filter-box"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={filter}
              label="Filter"
              onChange={handleChange}
            >
              <MenuItem value={0}>All</MenuItem>
              <MenuItem value={true}>Accepted</MenuItem>
              <MenuItem value={false}>Pending</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <div style={{ paddingLeft: "20px", paddingRight: "20px" }}>
          {Object.keys(values).map((value, key) => {
            // console.log(key);
            countValue += 1;

            return (
              <>
                {key >= pagination - 5 && key < pagination && (
                  <UserCard
                    className="usercard"
                    fetch_all_users={fetch_all_users}
                    setRefetch={() => {
                      setReFetch(!reFetch);
                    }}
                    key={key}
                    email={userdata[values[value]]["email"]}
                    valid={userdata[values[value]]}
                    data={userdata[values[value]]}
                  />
                )}
                <br />
              </>
            );
          })}
        </div>
        <div width="100%">
          <Pagination
            count={Math.ceil(countValue / 5)}
            color="primary"
            onChange={(e) => {
              setPage(parseInt(e.target.innerText));
            }}
            onClick={(e) => {
              // console.log(e.target.innerText);
            }}
            hideNextButton
            hidePrevButton
          />
        </div>
      </div>
    </>
  );
};

export default AdminUsers;
