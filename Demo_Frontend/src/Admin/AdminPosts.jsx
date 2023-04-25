import "../BlurAnimation.css";
import AdminAddPostsModal from "./AdminAddPostsModal";
import AdminAllPosts from "./AdminAllPosts";
import AdminNavBar from "./AdminNavBar";
import axios from "axios";
import { useEffect, useState } from "react";

export default function AdminPosts() {
  const [postsData, setPostsData] = useState({});
  const [loader, setLoader] = useState(true);
  const [reFetch, setReFetch] = useState(false);
  useEffect(() => {
    // setLoader(true);
    fetchAllPosts();
  }, [reFetch]);
  async function fetchAllPosts() {
    await axios
      .get("http://localhost:5000/fetch_all_admin_post")
      .then((res) => {
        // console.log(res.data);
        setPostsData(res.data);
        setLoader(false);
      })
      .catch((res) => {
        // console.log(res);
        setLoader(true);
      });
  }
  return (
    <>
      <AdminNavBar />
      <div id="admin_add_post_blur_animation">
        <div align="center">
          <AdminAddPostsModal
            setRefetch={() => setReFetch(!reFetch)}
            postsData={postsData}
          />
        </div>
        <hr />
        <AdminAllPosts
          postsData={postsData}
          fetchAllPosts={() => {
            fetchAllPosts();
          }}
          loader={loader}
          setRefetch={() => {
            setReFetch(!reFetch);
          }}
        />
      </div>
    </>
  );
}
