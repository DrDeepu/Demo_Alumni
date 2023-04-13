import React from "react";
import './ImageLoaderAnimation.css'

const ImageLoaderAnimation = () => {
  return (
    <div className="lds-facebook">
      <div id='first'></div>
      <div id='second'></div>
      <div id='third'></div>
    </div>
  );
};

export default ImageLoaderAnimation;
