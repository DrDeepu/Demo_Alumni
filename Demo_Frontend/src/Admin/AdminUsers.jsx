import React from "react";
import AdminNavBar from "./AdminNavBar";
import UserCard from "./UserCard";
import { useEffect, useState } from "react";
import axios from "axios";
import "../BlurAnimation.css";
import { useSelector } from "react-redux";

const AdminUsers = () => {
  const [userdata, setUserdata] = useState([]);
  const access_token = useSelector((state) => state.access_token.access_token);
  useEffect(() => {
    async function func() {
      await axios
        .get("http://127.0.0.1:5000/admin", {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        })
        .then((res) => {
          localStorage.setItem("access_token", res.data.access_token);
        })
        .catch((res) => {});
      await axios
        .get("http://127.0.0.1:5000/all_users", {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        })
        .then((res) => {
          setUserdata(res.data);
        });
    }
    func();
  }, []);

  return (
    <>
      <div id="admin_users_blur_animation">
        <AdminNavBar />
        <div style={{ paddingLeft: "20px", paddingRight: "20px" }}>
          {Object.keys(userdata).map((value) => {
            return (
              <>
                <UserCard
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
