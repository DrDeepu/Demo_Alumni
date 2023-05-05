/* eslint-disable */
import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import AdminNavBar from "./AdminNavBar";
import "../BlurAnimation.css";
import "./Admin.css";
import { useSelector } from "react-redux";
import ReactAnimations from "../React-Animations/ReactAnimations";
import { Toaster } from "react-hot-toast";
import { LOCALHOST_URL } from "../config";

const Admin = () => {
  const navigate = useNavigate();

  const [loader, setloader] = useState(true);
  const [user, setUser] = useState(false);
  const [user_data, setUser_data] = useState({});
  const access_token = useSelector((state) => state.access_token.access_token);
  const user_email = useSelector((state) => state.set_user_data.user_email);

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      if (user_email) {
        navigate("/admindashboard");
        setUser(true);
      }
    } else {
      navigate("/login");
    }
    async function func() {
      await axios
        .get(`${LOCALHOST_URL}/user_count`, {
          headers: { Authorization: `Bearer ${access_token}` },
        })
        .then((res) => {
          setUser_data({
            total_users: res.data.total_users,
            valid_users: res.data.valid_users,
            not_valid_users: res.data.not_valid_users,
          });
        });
    }

    func();
    setloader(false);
  }, [loader, user]);

  return user === true || user === "true" ? (
    loader ? (
      <div
        align="center"
        style={{
          left: "50%",
          height: "100vh",
          width: "100%",
          paddingTop: "20%",
        }}
      >
        <ReactAnimations />
      </div>
    ) : (
      <>
        <Toaster position={"top-center"} reverseOrder={false} />
        <AdminNavBar />
        <div id="admin_blur_animation" className="admin-dashboard">
          <div
            style={{
              width: "1080",
              height: "100vh",
              paddingLeft: "30px",
              paddingRight: "30px",
            }}
          >
            <div id="container">
              <div
                id="card_hover_users_total"
                className="box box1 card_hover_users"
              >
                <h2>{user_data.total_users}</h2>
                <br />
                <p>Total Users </p>
              </div>
              <div
                id="card_hover_users_approved"
                className="box box2 card_hover_users"
              >
                <h2>{user_data.valid_users}</h2>
                <br />
                <p>Total Approved Users </p>
              </div>
              <div
                id="card_hover_users_pending"
                className="box box3 card_hover_users"
              >
                <h2>{user_data.not_valid_users}</h2>
                <br />
                <p>Total Pending Users</p>
              </div>
            </div>
            {/* <AdminReport /> */}
          </div>
        </div>
      </>
    )
  ) : (
    navigate("/login")
  );
};

export default Admin;
