import axios from "axios";
import Button from "react-bootstrap/Button";
import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/esm/Image";
import "./User.css";
import ViewPost from "./ViewPost";

function PostCard({ title, description, img_url, post_id }) {
  // console.log(title, description, img_url, post_id);
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
            />
            {/* <ApproveDeletePost value="Delete" post_id={post_id} /> */}
          </div>
        </Card.Body>
      </Card>
    </>
  );
}

export default PostCard;
