import UserNavBar from "./UserNavBar";
import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import PostCard from "./PostCard";
// import ReactAnimations from "../React-Animations/ReactAnimations";
import { Container, Row } from "react-bootstrap";
import { LOCALHOST_URL } from "../config";

const UserShowPosts = () => {
  const [postsData, setPostsData] = useState({});
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    // setLoader(true);
    fetchAllPosts();
  }, []);
  async function fetchAllPosts() {
    await axios
      .get(`${LOCALHOST_URL}/fetch_all_admin_post`)
      .then((res) => {
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
      <UserNavBar />
      <div className="main_blur_div_animation">
        <div id="card-container" align="center">
          <Container>
            <Row xs={1} sm={2} md={3} style={{ gap: "10px" }}>
              {Object.keys(postsData).map((post) => {
                return (
                  <>
                    <PostCard
                      // className="card"
                      title={postsData[post]["post_title"]}
                      description={postsData[post]["post_description"]}
                      img_url={postsData[post]["post_image_url"]}
                      post_id={postsData[post]["post_id"]}
                      start_date={postsData[post]["post_event_start_date"]}
                      start_time={postsData[post]["post_event_start_time"]}
                      end_date={postsData[post]["post_event_end_date"]}
                      end_time={postsData[post]["post_event_end_time"]}
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
