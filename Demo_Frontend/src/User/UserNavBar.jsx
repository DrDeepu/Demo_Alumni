import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useState, useEffect } from "react";
import axios from "axios";
import PostAddIcon from "@mui/icons-material/PostAdd";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import ChatIcon from "@mui/icons-material/Chat";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { store_user_profile_data } from "../Redux/actions";
import { useNavigate } from "react-router";

function AdminNavBar(props) {
  const navigate = useNavigate();

  // const [user_data, setUser_data] = useState({});
  const [userData, setUserData] = useState({});
  const access_token = useSelector((state) => state.access_token.access_token);
  const dispatch = useDispatch();

  useEffect(() => {
    // async function func() {
    //   await axios.get("http://127.0.0.1:5000/user_count").then((res) => {
    //     console.log(res.data.total_users);
    //     setUser_data({
    //       not_valid_users: res.data.not_valid_users,
    //     });
    //   });
    // }
    // func();
    profile();
  }, []);

  async function profile() {
    await axios
      .get("http://localhost:5000/profile", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((res) => {
        // dispatch(store_user_profile_data(userData));
        setUserData({
          firstName: res.data.firstname,
          lastName: res.data.lastname,
          email: res.data.email,
          phone: res.data.phone,
          // password: res.data.password,
          instaId: res.data.instaid,
          linkedinId: res.data.linkedinid,
          githubId: res.data.gitid,
          domain: res.data.domain,
          profession: res.data.profession,
          company: res.data.company,
          websiteUrl: res.data.website,
          imageUrl: res.data.user_profile_image_url,
        });
        // setLoader(false);
        // setImageUrl(res.data.user_profile_image_url);
        // console.log("DATA ------------", res);
      })
      .catch((res) => {
        // console.log("Session Time out ------- ", res);
        navigate("/login");
      });
  }
  dispatch(store_user_profile_data(userData));

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand href="/userdashboard">Alumni Panel</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              {/* <Nav.Link href="/userdashboard" style={{}}> */}
              {/* <HomeIcon /> */}
              <Nav.Link>
                <NavLink to="/userdashboard">
                  <HomeIcon />
                </NavLink>
              </Nav.Link>
              {/* <Nav.Link href="/profile" style={{}}> */}
              <Nav.Link>
                {/* <AccountCircleIcon /> */}
                <NavLink to="/profile">
                  <AccountCircleIcon />
                </NavLink>
              </Nav.Link>

              {/* <Nav.Link href="/UserPostsPage">
                <PostAddIcon /> */}
              <Nav.Link>
                <NavLink to="/userpostspage">
                  {/* <AccountCircleIcon /> */}
                  <PostAddIcon />
                </NavLink>
              </Nav.Link>
              {/* <Nav.Link href="/UserSearchPage">
                <PersonSearchIcon /> */}
              <Nav.Link>
                <NavLink to="/UserSearchPage">
                  <AccountCircleIcon />
                </NavLink>
              </Nav.Link>
              {/* <Nav.Link>
                <NavLink to="/UserChat">
                  <ChatIcon />
                </NavLink>
              </Nav.Link> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <hr></hr>
    </>
  );
}

export default AdminNavBar;
