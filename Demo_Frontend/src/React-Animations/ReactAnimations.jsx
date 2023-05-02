/* eslint-disable */
import React from "react";
import UseAnimations from "react-useanimations";
import loading2 from "react-useanimations/lib/loading2";

export default function ReactLoading2Animations() {
  return (
    <>
      <UseAnimations animation={loading2} size={56} />
    </>
  );
}

export function Loader() {
  return (
    <>
      <div
        align="center"
        style={{
          left: "50%",
          height: "100vh",
          width: "100%",
          paddingTop: "20%",
        }}
      >
        <ReactLoading2Animations />
      </div>
    </>
  );
}
