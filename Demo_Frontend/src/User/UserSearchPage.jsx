import React from "react";
import UserNavBar from "./UserNavBar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import axios from "axios";
import { LOCALHOST_URL } from "../config";
import SingleUser from "../TestPages/Single_User_Hover_Effect";
import AlumniSearchProfile from "./AlumniSearchProfile";

const UserSearchPage = () => {
  const [age, setAge] = React.useState("");
  const [userData, setUserData] = useState(null);
  const [searchUserData, setSearchUserData] = useState(null);
  const [search, setSearch] = useState(false);
  const [trigger, setTrigger] = useState(true);

  async function getUserData() {
    await axios.get(`${LOCALHOST_URL}/all_users`).then((res) => {
      setUserData(res.data);
      // console.log("=========AXIOS RESULT=======", res);
    });
  }
  useEffect(() => {
    // console.log("========= UseEffect userData =======", userData);
    if (trigger === true) getUserData();
    setTrigger(false);
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
              setSearchUserData(e.target.value.replace(/\s+/g, ""));
              getUserData();
            }}
          />
        </Form>
        <br />
        {/* <div>Search result</div> */}
        {searchUserData !== "" && searchUserData !== null ? (
          <div className="grid grid-cols-3">
            {userData !== null &&
              userData !== "" &&
              Object.keys(userData).map((user) => {
                const userName =
                  userData[user].firstname + userData[user].lastname;
                const firstName = userData[user].firstname;
                const lastName = userData[user].lastname;
                //   if (
                //     searchUserData !== 0 &&
                //     userName.slice(0, searchUserData.length) === searchUserData
                //   )
                return (
                  ((searchUserData !== 0 &&
                    searchUserData !== "" &&
                    // (console.log(userData)
                    userName.slice(0, searchUserData.length).toLowerCase() ===
                      searchUserData.toLowerCase()) ||
                    firstName.slice(0, searchUserData.length).toLowerCase() ===
                      searchUserData.toLowerCase() ||
                    lastName.slice(0, searchUserData.length).toLowerCase() ===
                      searchUserData.toLowerCase()) && (
                    <AlumniSearchProfile userData={userData[user]} />
                  )
                );

                // )
                // );
              })}
          </div>
        ) : (
          <div className="grid grid-cols-3 ">
            {/* Search Users */}
            {userData &&
              Object.keys(userData).map((user, keys) => {
                return (
                  <>
                    {" "}
                    <AlumniSearchProfile userData={userData[user]} />
                  </>
                );
                // console.log(userData[user]);
              })}
          </div>
        )}
      </div>
    </>
  );
};

export default UserSearchPage;
