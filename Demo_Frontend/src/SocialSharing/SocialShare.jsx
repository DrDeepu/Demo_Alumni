/* eslint-disable */
import { FacebookShareButton, FacebookIcon } from "react-share";
import React from "react";

const SocialShare = () => {
  return (
    <div>
      <FacebookShareButton
        url={"https://www.example.com"}
        quote={"Dummy text!"}
        hashtag="#muo"
      >
        <FacebookIcon size={32} round />
      </FacebookShareButton>
    </div>
  );
};

export default SocialShare;
