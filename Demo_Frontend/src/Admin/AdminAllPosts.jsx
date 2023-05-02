/* eslint-disable */
import React from "react";
import PostCard from "./PostCard";
import ReactAnimations from "../React-Animations/ReactAnimations";
import "./Admin.css";
import { Container, Row } from "react-bootstrap";
export default function AdminAllPosts({
  postsData,
  loader,
  setRefetch,
  fetchAllPosts,
}) {
  return loader ? (
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
    <div id="card-container" align="center">
      <Container>
        <Row xs={1} sm={2} md={3} style={{ gap: "10px" }}>
          {Object.keys(postsData).map((post) => {
            return (
              <>
                <PostCard
                  fetchAllPosts={() => {
                    fetchAllPosts();
                  }}
                  key={post}
                  className="card"
                  title={postsData[post]["post_title"]}
                  description={postsData[post]["post_description"]}
                  img_url={postsData[post]["post_image_url"]}
                  post_id={postsData[post]["post_id"]}
                  post_event_start_date={
                    postsData[post]["post_event_start_date"]
                  }
                  post_event_start_time={
                    postsData[post]["post_event_start_time"]
                  }
                  post_event_end_time={postsData[post]["post_event_end_time"]}
                  post_event_end_date={postsData[post]["post_event_end_date"]}
                  setRefetch={() => setRefetch()}
                  // post_delete={() => post_delete(post)}
                />
              </>
            );
          })}
        </Row>
      </Container>
    </div>
  );
}
