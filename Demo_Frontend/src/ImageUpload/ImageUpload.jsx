import axios from "axios";
import React from "react";
import "./ImageUpload.css";
import { useState, useEffect } from "react";
import ReactAnimations from "../React-Animations/ReactAnimations";

const ImageUpload = () => {
  const [uploadimage, setuploadImage] = useState(null);
  const [fetchimage, setfetchImage] = useState(null);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    if (uploadimage !== null) buttonHandle();
  }, [uploadimage]);
  async function buttonHandle() {
    const formData = new FormData();
    formData.append("file", uploadimage);

    await axios
      .post("http://localhost:5000/uploadimage", formData)
      .then(async () => {
        await axios.get(`http://localhost:5000/fetchimage`).then((res) => {
          setfetchImage(res.data);
          setLoader(false);
        });
      });

    console.log(fetchimage);
  }
  return (
    <div>
      <input
        type="file"
        onChange={(e) => {
          setuploadImage(e.target.files[0]);
          console.log(uploadimage);
          // buttonHandle();
          // setLoader(true);
        }}
      />
      {/* <button onClick={() => buttonHandle("post")}>Upload</button> */}
      <button
        onClick={() => {
          buttonHandle();
          setLoader(true);
        }}
      >
        Upload
      </button>
      {loader ? (
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
        <div id="image_loader">
          <img
            src={fetchimage}
            alt="Cloudinary Image"
            style={{ width: "300px", height: "300px" }}
          />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
