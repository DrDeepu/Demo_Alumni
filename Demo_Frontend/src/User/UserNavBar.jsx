/* eslint-disable */
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { store_user_profile_data } from "../Redux/actions";
import { useNavigate } from "react-router";
import "./User.css";
import "../Admin/Admin.css";
import { LOCALHOST_URL } from "../config";

function UserNavBar(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState(false);
  const access_token = useSelector((state) => state.access_token.access_token);
  const user_email = useSelector((state) => state.set_user_data.user_email);
  const userFirstName = useSelector(
    (state) =>
      state.set_user_profile_data.firstName +
      " " +
      state.set_user_profile_data.lastName
  );

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      // if (user_email !== "admin@email.com") {
      if (user_email===null) {
        setUser(true);
      }
    } else {
      navigate("/login");
    }

    profile();
  }, [user]);

  async function profile() {
    await axios
      .get(`${LOCALHOST_URL}/profile`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((res) => {
        dispatch(
          store_user_profile_data({
            firstName: res.data.firstname,
            lastName: res.data.lastname,
            email: res.data.email,
            phone: res.data.phone,
            password: res.data.password,
            instaId: res.data.instaid,
            linkedinId: res.data.linkedinid,
            githubId: res.data.gitid,
            domain: res.data.domain,
            profession: res.data.profession,
            company: res.data.company,
            websiteUrl: res.data.website,
            imageUrl: res.data.user_profile_image_url,
          })
        );
      })
      .catch((res) => {
        navigate("/login");
      });
  }
  return (
    <>
      {user === true || user === "true" ? (
        <>
          <Navbar bg="light" expand="lg">
            <Container fluid>
              {/* <Navbar.Brand href="/userdashboard">Alumni Panel</Navbar.Brand> */}
              <Navbar.Brand href="/profile">{userFirstName}</Navbar.Brand>
              <Navbar.Toggle aria-controls="navbarScroll" />
              <Navbar.Collapse id="navbarScroll">
                <Nav
                  className="me-auto my-2 my-lg-0"
                  style={{ maxHeight: "100px" }}
                  navbarScroll
                >
                  {/* <Nav.Link href="/userdashboard" style={{}}> */}
                  {/* <HomeIcon /> */}
                  {/* <Nav.Link>
                <NavLink to="/userdashboard" className="nav-link">

                  Home
                </NavLink>
              </Nav.Link> */}
                  {/* <Nav.Link href="/profile" style={{}}> */}
                  <Nav.Link>
                    {/* <AccountCircleIcon /> */}
                    <NavLink to="/profile" className="nav-link">
                      {/* <AccountCircleIcon /> */}
                      Profile
                    </NavLink>
                  </Nav.Link>

                  {/* <Nav.Link href="/UserPostsPage">
                <PostAddIcon /> */}
                  <Nav.Link>
                    <NavLink to="/userpostspage" className="nav-link">
                      {/* <AccountCircleIcon /> */}
                      {/* <PostAddIcon /> */}
                      Posts
                    </NavLink>
                  </Nav.Link>
                  {/* <Nav.Link href="/UserSearchPage">
                <PersonSearchIcon /> */}
                  <Nav.Link>
                    <NavLink to="/UserSearchPage" className="nav-link">
                      {/* <PersonSearchIcon /> */}
                      Search
                    </NavLink>
                  </Nav.Link>
                  <Nav.Link>
                    <NavLink to="/UserChat" className="nav-link">
                      {/* <ChatIcon /> */}
                      Chat
                    </NavLink>
                  </Nav.Link>

                  {/* <ChatIcon /> */}

                  <Nav.Link>
                    <NavLink
                      className="nav-link"
                      style={{ border: "none" }}
                      to="#"
                    >
                      <span
                        onClick={() => {
                          setUser(false);
                          // ChatEngine.disconnect();

                          localStorage.removeItem("access_token");
                        }}
                      >
                        logout
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
      )}
    </>
  );
  // ) : (
  //   navigate("/login")
  // );
}

export default UserNavBar;
