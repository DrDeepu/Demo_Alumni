/* eslint-disable */
import "../BlurAnimation.css";
import AdminAddPostsModal from "./AdminAddPostsModal";
import AdminAllPosts from "./AdminAllPosts";
import AdminNavBar from "./AdminNavBar";
import axios from "axios";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Pagination from "@mui/material/Pagination";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { LOCALHOST_URL } from "../config";
import React from "react";

export default function AdminPosts() {
  const [postsData, setPostsData] = useState({});
  const [loader, setLoader] = useState(true);
  const [reFetch, setReFetch] = useState(false);
  const [filter, setFilter] = React.useState(0);

  useEffect(() => {
    // setLoader(true);
    fetchAllPosts();
  }, [reFetch]);
  async function fetchAllPosts() {
    await axios
      .get(`${LOCALHOST_URL}/fetch_all_admin_post`)
      .then((res) => {
        // console.log(res.data);
        setPostsData(res.data);
        setLoader(false);
      })
      .catch((res) => {
        // console.log(res);
        setLoader(true);
      });
  }
  return (
    <>
      <AdminNavBar />
      <div id="admin_add_post_blur_animation" className="admin-posts">
        <div align="center">
          <Box>
            <div className="filter-form">
              <FormControl>
                <InputLabel id="demo-simple-select-label">
                  Filter User
                </InputLabel>
                <Select
                  className="admin-filter-box"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  // value={filter}
                  label="Filter"
                  onChange={(e) => {
                    setFilter(e.target.value);
                  }}
                >
                  <MenuItem value={0}>Upcoming</MenuItem>
                  <MenuItem value={true}>Ongoing</MenuItem>
                  <MenuItem value={false}>Completed</MenuItem>
                </Select>
              </FormControl>
            </div>
          </Box>
          <AdminAddPostsModal
            setRefetch={() => setReFetch(!reFetch)}
            postsData={postsData}
          />
        </div>
        <hr />
        <AdminAllPosts
          postsData={postsData}
          fetchAllPosts={() => {
            fetchAllPosts();
          }}
          loader={loader}
          setRefetch={() => {
            setReFetch(!reFetch);
          }}
          filter={filter}
        />
      </div>
    </>
  );
}
