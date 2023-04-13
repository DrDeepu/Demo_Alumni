import React from "react";
import AdminNavBar from "./AdminNavBar";
import UserCard from "./UserCard";
import { useEffect, useState } from "react";
import axios from "axios";
import "../BlurAnimation.css";
import { useSelector } from "react-redux";

const AdminUsers = () => {
  const [userdata, setUserdata] = useState({});
  const [reFetch, setReFetch] = useState(false);

  const access_token = useSelector((state) => state.access_token.access_token);
  useEffect(() => {
    fetch_all_users();
    // authenticaiton();
  }, [reFetch]);
  async function authenticaiton() {
    await axios
      .get("http://127.0.0.1:5000/admin", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((res) => {
        localStorage.setItem("access_token", res.data.access_token);
      })
      .catch((res) => {
        // console.log(res);
      });
  }
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

  return (
    <>
      <div id="admin_users_blur_animation">
        <AdminNavBar />
        <div style={{ paddingLeft: "20px", paddingRight: "20px" }}>
          {Object.keys(userdata).map((value) => {
            return (
              <>
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
