import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/esm/Image";
import ApproveDeletePost from "../Alerts/ApproveDeletePost";
import ViewAdminPost from "./ViewAdminPost";

function PostCard({
  title,
  description,
  img_url,
  post_id,
  post_event_start_date,
  post_event_start_time,
  post_event_end_date,
  post_event_end_time,
  post_delete,
  setRefetch,
  fetchAllPosts,
}) {
  return (
    <>
      <Card id="card_hover_posts" style={{ width: "18rem" }}>
        {/* <Card.Img variant="top" src={img_url} /> */}
        <Image
          src={img_url}
          style={{ height: "200px", border: "1px solid black" }}
        />

        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <div className="grid grid-cols-2">
            <ViewAdminPost
              title={title}
              description={description}
              img_url={img_url}
              post_id={post_id}
              post_event_start_date={post_event_start_date}
              post_event_start_time={post_event_start_time}
              post_event_end_date={post_event_end_date}
              post_event_end_time={post_event_end_time}
              fetchAllPosts={() => {
                fetchAllPosts();
              }}
            />
            <ApproveDeletePost
              fetchAllPosts={() => {
                fetchAllPosts();
              }}
              setRefetch={() => setRefetch()}
              value="Delete"
              post_id={post_id}
              // post_delete={() => post_delete()}
            />
          </div>
        </Card.Body>
      </Card>
    </>
  );
}

export default PostCard;
