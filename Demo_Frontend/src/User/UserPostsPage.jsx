import UserNavBar from "./UserNavBar";
import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import PostCard from "./PostCard";
import ReactAnimations from "../React-Animations/ReactAnimations";
import { Container, Row } from "react-bootstrap";

const UserShowPosts = () => {
  const [postsData, setPostsData] = useState({});
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    // setLoader(true);
    fetchAllPosts();
  }, []);
  async function fetchAllPosts() {
    await axios
      .get("http://localhost:5000/fetch_all_admin_post")
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
    // loader ? (
    //   <div
    //     align="center"
    //     style={{
    //       left: "50%",
    //       height: "100vh",
    //       width: "100%",
    //       paddingTop: "20%",
    //     }}
    //   >
    //     <ReactAnimations />
    //   </div>
    // ) : (
    <>
      <div className="main_blur_div_animation">
        <UserNavBar />
        <div id="card-container" align="center">
          <Container>
            <Row xs={1} sm={2} md={3} style={{ gap: "10px" }}>
              {Object.keys(postsData).map((post) => {
                return (
                  <>
                    <PostCard
                      className="card"
                      title={postsData[post]["post_title"]}
                      description={postsData[post]["post_description"]}
                      img_url={postsData[post]["post_image_url"]}
                      post_id={postsData[post]["post_id"]}
                    />
                  </>
                );
              })}
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
};

export default UserShowPosts;
