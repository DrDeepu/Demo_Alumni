import axios from "axios";
import Button from "react-bootstrap/Button";
import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/esm/Image";
import { LOCALHOST_URL } from "../config";
import "./User.css";
import ViewPost from "./ViewPost";
import { useSelector, useDispatch } from "react-redux";

function PostCard({ title, description, img_url, post_id }) {
  const userData = useSelector((state) => state.set_user_profile_data);
  const user_email = useSelector((state) => state.set_user_data.user_email);

  const [accept, setAccept] = useState(false);
  useEffect(() => {
    get_accept_decline();
  }, [accept]);

  async function post_accept() {
    await axios
      .post(`${LOCALHOST_URL}/post_accept`, {
        post_id: post_id,
        email: user_email,
      })
      .then(setAccept(false));
  }

  async function post_decline() {
    await axios
      .post(`${LOCALHOST_URL}/post_decline`, {
        post_id: post_id,
        email: user_email,
      })
      .then(setAccept(true));
  }
  async function get_accept_decline() {
    await axios
      .post(`${LOCALHOST_URL}/get_accept_decline`, {
        post_id: post_id,
        email: user_email,
      })
      .then((res) => {
        // console.log(res);
        setAccept(res.data.accepted);
      });
  }
  return (
    <>
      <Card id="card_hover_posts" style={{ width: "18rem" }}>
        <Image src={img_url} style={{ height: "200px" }} />

        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <div className="grid grid-cols-1">
            <ViewPost
              title={title}
              description={description}
              img_url={img_url}
              post_id={post_id}
              post_accept={() => post_accept()}
              post_decline={() => post_decline()}
              get_accept_decline={() => {
                get_accept_decline();
              }}
              accept={accept}
              setAccept={() => {
                setAccept();
              }}
            />
            {/* <ApproveDeletePost value="Delete" post_id={post_id} /> */}
          </div>
        </Card.Body>
      </Card>
    </>
  );
}

export default PostCard;
