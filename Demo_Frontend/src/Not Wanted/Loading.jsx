/* eslint-disable */
import React from "react";
import ReactLoading from "react-loading";
// import { useNavigate } from "react-router";

export default function Loading() {
  // const navigate = useNavigate()
  // setTimeout(()=>navigate('/Dashboard'), 1000);
  return (
    <div
      align="center"
      style={{
        left: "50%",
        height: "100vh",
        width: "100%",
        paddingTop: "20%",
        background: "rgba(0,0,0,0.5)",
      }}
    >
      {/* <ReactLoading type="balls" color="#0000FF" height={100} width={50} /> */}
      {/* <ReactLoading type="bars" color="#0000FF" height={100} width={50} />
      <ReactLoading type="bubbles" color="#0000FF" height={100} width={50} />
      <ReactLoading type="cubes" color="#0000FF" height={100} width={50} />
      <ReactLoading type="cylon" color="#0000FF" height={100} width={50} />
      <ReactLoading type="spin" color="#0000FF" height={100} width={50} />
      <ReactLoading type="spokes" color="#0000FF" height={100} width={50} /> */}
      <ReactLoading
        // type="spinningBubbles"
        type="spin"
        // color="#0000FF"
        color="red"
        height={200}
        width={80}
      />
    </div>
  );
}
