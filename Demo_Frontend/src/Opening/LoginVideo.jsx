/* eslint-disable */
import React from "react";

const TestHome = ({ children }) => {
  return (
    <div id="intro" className="bg-image vh-100 shadow-1-strong">
      {/* <video
        style={{ minWidth: "100%", minHeight: "100%" }}
        // playsinline
        autoPlay
        muted
        loop
        type="video/mp4"
      >
        <source
          className="h-100"
          src="https://mdbootstrap.com/img/video/Lines.mp4"
        />
      </video> */}
      <div
        className="mask"
        style={{
          background:
            "linear-gradient( 45deg,rgba(29, 236, 197, 0.7),rgba(91, 14, 214, 0.7) 100%)",
        }}
      >
        <div className="container d-flex align-items-center justify-content-center text-center h-100">
          <div className="text-white">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default TestHome;
