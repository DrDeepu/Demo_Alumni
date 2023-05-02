/* eslint-disable */
import { Conversation } from "@open-web/react-sdk";

const CommentsSection = () => {
  return (
    <Conversation
      spotId="sp_example"
      postId="example_post"
      articleTags={["tag1", "tag2", "tag3"]}
      postUrl="http://www.example.com"
    />
  );
};
export default CommentsSection;
