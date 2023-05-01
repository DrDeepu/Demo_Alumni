import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import NavBar from "./UserNavBar";
import { useSelector, useDispatch } from "react-redux";
import { store_user_profile_data } from "../Redux/actions";
import { LOCALHOST_URL } from "../config";

const Dashboard = () => {
  const navigate = useNavigate();
  const [loader, setloader] = useState(true);
  const [user, setUser] = useState(localStorage.getItem("user"));
  const [userData, setUserData] = useState({});
  const access_token = useSelector((state) => state.access_token.access_token);
  const user_email = useSelector((state) => state.set_user_data.user_email);
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      if (user_email !== "admin@email.com") {
        navigate("/userdashboard");
        profile();
        setUser(true);
      }
    } else {
      navigate("/login");
    }
    setloader(false);
    // eslint-disable-next-line
  }, [loader, user]);

  async function profile() {
    await axios
      .get(`${LOCALHOST_URL}/profile`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((res) => {
        setUser(true);
        dispatch(
          store_user_profile_data({
            firstName: res.data.firstname,
            lastName: res.data.lastname,
            email: res.data.email,
            phone: res.data.phone,
            password: res.data.password,
            instaId: res.data.instaid,
            linkedinId: res.data.linkedinid,
            githubId: res.data.gitid,
            domain: res.data.domain,
            profession: res.data.profession,
            company: res.data.company,
            websiteUrl: res.data.website,
            imageUrl: res.data.user_profile_image_url,
          })
        );
        setUserData({
          firstName: res.data.firstname,
          lastName: res.data.lastname,
          email: res.data.email,
          phone: res.data.phone,
          password: res.data.password,
          instaId: res.data.instaid,
          linkedinId: res.data.linkedinid,
          githubId: res.data.gitid,
          domain: res.data.domain,
          profession: res.data.profession,
          company: res.data.company,
          websiteUrl: res.data.website,
          imageUrl: res.data.user_profile_image_url,
        });
        // setLoader(false);
        // setImageUrl(res.data.user_profile_image_url);
        // console.log("DATA ------------", res);
      })
      .catch((res) => {
        // console.log("Session Time out ------- ", res);
        navigate("/login");
      });
  }
  dispatch(store_user_profile_data(userData));

  window.onload = () => {
    setloader(false);
  };
  return user === "true" || user === true ? (
    <>
        <NavBar />
      <div id="dashboard_blur_animation">
        <div align="center">
          {/* <button
            className={
              "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
            }
            onClick={() => {
              setUser(false);
              localStorage.removeItem("access_token");
            }}
          >
            logout
          </button> */}
        </div>
      </div>
    </>
  ) : (
    navigate("/login")
  );
};

export default Dashboard;
