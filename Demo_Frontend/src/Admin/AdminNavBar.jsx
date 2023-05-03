/* eslint-disable */
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
// import PeopleIcon from "@mui/icons-material/People";
// import PostAddIcon from "@mui/icons-material/PostAdd";
// import HomeIcon from "@mui/icons-material/Home";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
// import ReactAnimations from "../React-Animations/ReactAnimations";
import Badge from "@mui/material/Badge";
import "./Admin.css";

function AdminNavBar(props) {
  const [user_data, setUser_data] = useState({});
  const [user, setUser] = useState(false);
  // const [loader, setloader] = useState(true);

  const navigate = useNavigate();
  // const access_token = useSelector((state) => state.access_token.access_token);
  const user_email = useSelector((state) => state.set_user_data.user_email);
  useEffect(() => {
    // if (user === "false" || user === false) {
    //   console.log("Admin IF condition", user);
    //   navigate("/login");
    // } else {
    //   console.log("Admin Else condition", user);
    //   navigate("/admin");
    // }
    if (localStorage.getItem("access_token")) {
      if (user_email === "admin@email.com") {
        // navigate("/admindashboard");
        setUser(true);
      }
    } else {
      navigate("/login");
    }

    async function func() {
      await axios.get("http://127.0.0.1:5000/user_count").then((res) => {
        // console.log(res.data.total_users);
        setUser_data({
          not_valid_users: res.data.not_valid_users,
        });
        // setUser_data(res.data);
      });
    }
    func();
    // eslint-disable-next-line
  }, [user]);

  return user === true || user === "true" ? (
    <>
      <Navbar bg="light" expand="lg" className="admin-navbar">
        <Container fluid>
          <Navbar.Brand href="/admindashboard">
            <NavLink to="/admindashboard">Admin Panel</NavLink>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link>
                <NavLink className="nav-link" to="/admindashboard">
                  {/* Home */}
                  {/* <HomeIcon /> */}

                  <span>Home</span>
                </NavLink>
              </Nav.Link>
              <Nav.Link>
                {!props.count ? (
                  <Badge
                    badgeContent={user_data.not_valid_users}
                    color="primary"
                  >
                    <NavLink className="nav-link" to="/adminusers">
                      {/* Users */}
                      {/* <PeopleIcon /> */}

                      <span>Users</span>
                    </NavLink>
                  </Badge>
                ) : (
                  <Badge badgeContent={props.count} color="primary">
                    <NavLink className="nav-link" to="/adminusers">
                      {/* Users */}
                      {/* <PeopleIcon /> */}

                      <span>Users</span>
                    </NavLink>
                  </Badge>
                )}
              </Nav.Link>
              {/* <MailIcon color="action" /> */}
              <Nav.Link>
                <NavLink className="nav-link" to="/adminposts">
                  {/* Posts */}
                  {/* <PostAddIcon /> */}

                  <span>Posts</span>
                </NavLink>
              </Nav.Link>
              <Nav.Link>
                <NavLink className="nav-link" style={{border:'none'}} to='#'>
                  {/* Posts */}
                  {/* <PostAddIcon /> */}

                  <span
                    onClick={() => {
                      setUser(false);
                      localStorage.removeItem("access_token");
                    }}
                  >
                    Logout
                  </span>
                </NavLink>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <hr></hr>
    </>
  ) : (
    navigate("/login")
  );
}

export default AdminNavBar;
