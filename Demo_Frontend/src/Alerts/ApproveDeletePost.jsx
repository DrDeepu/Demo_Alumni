import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { LOCALHOST_URL } from "../config";

function ApproveDeletePost({
  email,
  value,
  post_title,
  post_id,
  setRefetch,
  fetchAllPosts,
}) {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function approveDeletePost(post_id) {
    // console.log(post_id);
    await axios
      .post(`${LOCALHOST_URL}/delete_admin_post`, { data: { post_id } })
      .then((cl) => {
        // console.log(cl);
        // window.location.reload();
        // navigate("/adminposts");
        fetchAllPosts();
      });
  }

  return (
    <>
      <Button
        variant="primary"
        onClick={handleShow}
        style={{ backgroundColor: "red" }}
      >
        {value}
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Post {post_title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you really want to delete this post.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleClose();
              approveDeletePost(post_id);

              setRefetch();
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ApproveDeletePost;
