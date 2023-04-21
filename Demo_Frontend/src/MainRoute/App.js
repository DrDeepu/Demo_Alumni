import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Opening Folder Files
import SignUp from "../Opening/SignUp";
import Login from "../Opening/Login";
import ForgetPassword from "../Opening/ForgetPassword";

// User Folder Files
import UserDashboard from "../User/UserDashboard";
import UserProfile from "../User/UserProfile";
import UserPostsPage from "../User/UserPostsPage";
import UserSearchPage from "../User/UserSearchPage";
import UserChat from "../User/UserChat";
import ChangePassword from "../Opening/ChangePassword";

// Admin Folder Files
import AdminDashboard from "../Admin/AdminDashboard";
import AdminUsers from "../Admin/AdminUsers";
import AdminPosts from "../Admin/AdminPosts";

// 404 Folder Files
import PageNotFound from "../404/PageNotFound";

// MainRoute Files
import TestHome from "./MainHomePage/TestHome";
import MainWebsite from "./MainHomePage/MainHomePage";

// TestFolder files
import ImageUpload from "../ImageUpload/ImageUpload";

// Redux Store files
import { Provider } from "react-redux";
import store from "../Redux/store";

// TestPages files
import Users from "../TestPages/Users_Hover_Effect";
import SingleUsers from "../TestPages/Single_User_Hover_Effect";
import USER_TEST_PROFILE from "../User/UserEditProfile";

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            {/* <Route exact path="/" element={<MainWebsite />}></Route> */}
            <Route exact path="/" element={<TestHome />}></Route>
            <Route exact path="/Login" element={<Login />}></Route>
            <Route exact path="/SignUp" element={<SignUp />}></Route>
            <Route
              exact
              path="/ForgetPassword"
              element={<ForgetPassword />}
            ></Route>
            <Route
              exact
              path="/UserDashboard"
              element={<UserDashboard />}
            ></Route>
            <Route exact path="/Profile" element={<UserProfile />}></Route>
            <Route
              exact
              path="/UserPostsPage"
              element={<UserPostsPage />}
            ></Route>
            <Route
              exact
              path="/UserSearchPage"
              element={<UserSearchPage />}
            ></Route>
            <Route exact path="/UserChat" element={<UserChat />}></Route>
            <Route
              exact
              path="/reset_password"
              element={<ChangePassword />}
            ></Route>
            <Route
              exact
              path="/AdminDashboard"
              element={<AdminDashboard />}
            ></Route>
            <Route exact path="/AdminUsers" element={<AdminUsers />}></Route>
            <Route exact path="/AdminPosts" element={<AdminPosts />}></Route>
            <Route exact path="/ImageUpload" element={<ImageUpload />}></Route>
            <Route exact path="/Users" element={<Users />}></Route>
            <Route exact path="/SingleUsers" element={<SingleUsers />}></Route>
            <Route
              exact
              path="/User_Test_Profile"
              element={<USER_TEST_PROFILE />}
            ></Route>

            {/* <Route path="*" element={<PageNotFound />} /> */}
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
