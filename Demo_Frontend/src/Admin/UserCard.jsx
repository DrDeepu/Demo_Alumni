import Container from "react-bootstrap/Container";
import "./Admin.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FullScreenUserModal from "./FullscreenAddUserModal.jsx";
import DeleteAlert from "../Alerts/DeleteAlert";
import ApproveAlert from "../Alerts/ApproveAlert";
import DisapproveAlert from "../Alerts/DisapproveAlert";

function UserCard(props) {
  return (
    <>
      <Container
        id="card_hover_users"
        style={{
          // border: "2px solid",
          // borderColor: "black",
          borderRadius: "10px",
          padding: "10px",
        }}
      >
        <Row>
          <Col xs={8}>
            <FullScreenUserModal mail={props.email} data={props.data} />
          </Col>
          {props.valid.valid === "false" ? (
            <Col xs={2}>
              <ApproveAlert value={"Activate"} data={props.data} />
            </Col>
          ) : (
            <Col xs={2}>
              <DisapproveAlert value={"Deactivate"} data={props.data} />
            </Col>
          )}

          <Col xs={2}>
            {" "}
            <DeleteAlert value={"Delete"} data={props.data} />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default UserCard;
