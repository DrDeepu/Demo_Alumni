import React from "react";
import UserNavBar from "./UserNavBar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import axios from "axios";
import { LOCALHOST_URL } from "../config";
import SingleUser from "../TestPages/Single_User_Hover_Effect";

const UserSearchPage = () => {
  const [userData, setUserData] = useState(null);
  const [searchUserData, setSearchUserData] = useState(null);
  const [search, setSearch] = useState(false);
  async function getUserData() {
    await axios.get(`${LOCALHOST_URL}/all_users`).then((res) => {
      setUserData(res.data);
      // console.log("=========AXIOS RESULT=======", res);
    });
  }
  useEffect(() => {
    // console.log("========= UseEffect userData =======", userData);
  }, [search, userData]);

  return (
    <>
      <UserNavBar />
      <div style={{ marginLeft: "10%", marginRight: "10%" }}>
        <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="Search Alumni"
            className="me-2"
            aria-label="Search"
            onChange={(e) => {
              setSearchUserData(e.target.value);
            }}
          />
          <Button
            variant="outline-success"
            onClick={() => {
              setSearch(!search);
              getUserData();
              // console.log(
              //   "========= Button Search User Data =======",
              //   searchUserData
              // );
            }}
          >
            Search
          </Button>
        </Form>
        <br />
        <div>Search result</div>
        <div className="grid grid-cols-3">
          {userData !== null &&
            userData !== "" &&
            Object.keys(userData).map((user) => {
              const userName =
                userData[user].firstname + userData[user].lastname;
              //   if (
              //     searchUserData !== 0 &&
              //     userName.slice(0, searchUserData.length) === searchUserData
              //   )
              return (
                searchUserData !== 0 &&
                searchUserData !== "" &&
                // (console.log(userData)
                userName.slice(0, searchUserData.length).toLowerCase() ===
                  searchUserData.toLowerCase() && (
                  <SingleUser
                    name={userData[user]["firstname"]}
                    profession={userData[user]["profession"]}
                    image_url={userData[user]["user_profile_image_url"]}
                  />
                )
              );

              // )
              // );
            })}
        </div>
      </div>
    </>
  );
};

export default UserSearchPage;
