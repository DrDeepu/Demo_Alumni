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
  filter,
}) {
  const [pagination, setPagination] = React.useState(5);
  const [count, setCount] = React.useState(0);
  const [page, setPage] = React.useState(1);
  let countValue = 0;
  React.useEffect(() => {}, [filter]);
  const values = Object.keys(postsData).filter((value, key) => {
    // console.log(key);
    // setPage(1);
    // countValue += 1;
    return filter === 0
      ? new Date(postsData[value]["post_event_start_date"]) > new Date() &&
          postsData[value]
      : filter === true
      ? new Date(postsData[value]["post_event_start_date"]) < new Date() &&
        new Date(postsData[value]["post_end_start_date"]) > new Date() &&
        postsData[value]
      : new Date(postsData[value]["post_event_start_date"]) < new Date() &&
        postsData[value];
    // return postsData[value];
  });
  console.log(values);
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
          {Object.keys(values).map((post,key) => {
            return (
              <>
                <PostCard
                  fetchAllPosts={() => {
                    fetchAllPosts();
                  }}
                  key={key}
                  className="card"
                  title={postsData[values[post]]["post_title"]}
                  description={postsData[values[post]]["post_description"]}
                  img_url={postsData[values[post]]["post_image_url"]}
                  post_id={postsData[values[post]]["post_id"]}
                  post_event_start_date={
                    postsData[values[post]]["post_event_start_date"]
                  }
                  post_event_start_time={
                    postsData[values[post]]["post_event_start_time"]
                  }
                  post_event_end_time={
                    postsData[values[post]]["post_event_end_time"]
                  }
                  post_event_end_date={
                    postsData[values[post]]["post_event_end_date"]
                  }
                  setRefetch={() => setRefetch()}
                  // post_delete={() => post_delete(post)}
                />
              </>
            );
          })}
        </Row>
      </Container>
      <div width="100%" align="center">
        <div className="pagination">
          {countValue > 5 && (
            <Pagination
              // defaultChecked={2}
              value={2}
              // className="pagination"
              count={Math.ceil(countValue / 5)}
              color="primary"
              onChange={(e, p) => {
                setPage(parseInt(p));
                // console.log(p);
              }}
              page={page}
            />
          )}
        </div>
      </div>
    </div>
  );
}
