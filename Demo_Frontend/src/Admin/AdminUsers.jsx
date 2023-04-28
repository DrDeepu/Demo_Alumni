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

const AdminUsers = () => {
  const [userdata, setUserdata] = useState({});
  const [reFetch, setReFetch] = useState(false);
  const [filter, setFilter] = React.useState(0);
  const [count, setCount] = React.useState(0);

  const handleChange = (event) => {
    setFilter(event.target.value);
  };
  const access_token = useSelector((state) => state.access_token.access_token);
  useEffect(() => {
    fetch_all_users();
    // authenticaiton();
    //eslint-disable-next-line
  }, [reFetch, filter]);
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

  return (
    <>
      <AdminNavBar count={count} />
      <div id="admin_users_blur_animation">
        <Box sx={{ minWidth: 120 }}>
          <FormControl sx={{ width: "10%" }}>
            <InputLabel id="demo-simple-select-label">Filter User</InputLabel>
            <Select
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
          {Object.keys(userdata).map((value) => {
            return (
              <>
                {filter !== 0 ? (
                  filter === true ? (
                    userdata[value]["valid"] === "true" && (
                      <UserCard
                        className="usercard"
                        fetch_all_users={fetch_all_users}
                        setRefetch={() => {
                          setReFetch(!reFetch);
                        }}
                        key={value}
                        email={value}
                        valid={userdata[value]}
                        data={userdata[value]}
                      />
                    )
                  ) : (
                    userdata[value]["valid"] === "false" && (
                      <UserCard
                        className="usercard"
                        fetch_all_users={fetch_all_users}
                        setRefetch={() => {
                          setReFetch(!reFetch);
                        }}
                        key={value}
                        email={value}
                        valid={userdata[value]}
                        data={userdata[value]}
                      />
                    )
                  )
                ) : (
                  <UserCard
                    fetch_all_users={fetch_all_users}
                    setRefetch={() => {
                      setReFetch(!reFetch);
                    }}
                    key={value}
                    email={value}
                    valid={userdata[value]}
                    data={userdata[value]}
                  />
                )}
                <br></br>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default AdminUsers;
