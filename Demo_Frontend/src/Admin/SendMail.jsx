import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React from "react";
import axios from "axios";
import { getAllUsers } from "../Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { Form, FormGroup, FormCheck, FormControl } from "react-bootstrap";

function MyVerticallyCenteredModal(props) {
  const dispatch = useDispatch();

  const [allUsers, setAllUsers] = React.useState(true);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedOptions, setSelectedOptions] = React.useState([]);
  const userData = useSelector((state) => state.getAllUsers.data);
  React.useEffect(() => {
    functionDispatch();
  }, []);

  function functionDispatch() {
    dispatch(getAllUsers());
  }

  function CheckboxList() {
    const handleOptionChange = (option) => {
      if (selectedOptions.includes(option)) {
        setSelectedOptions(
          selectedOptions.filter((selectedOption) => selectedOption !== option)
        );
      } else {
        setSelectedOptions([...selectedOptions, option]);
      }
    };

    const filteredOptions = Object.keys(userData).filter(
      (option) =>
        // console.log(userData[option]["firstname"])
        userData[option]["firstname"]
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        selectedOptions.includes(userData[option]["firstname"])
    );
    console.log(filteredOptions);
    return (
      <div>
        <FormControl
          placeholder="Search Alumni"
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
          value={searchQuery}
        />
        {/* <div style={{ maxHeight: "200px", overflowY: "scroll" }}>
          <Form>
            <FormGroup>
              {filteredOptions.map((option) => (
                <>
                  <FormCheck
                    key={option}
                    label={userData[option]["firstname"]}
                    checked={selectedOptions.includes(option)}
                    onChange={() =>
                      handleOptionChange(userData[option]["firstname"])
                    }
                  />
                </>
              ))}
            </FormGroup>
          </Form>
        </div> */}
      </div>
    );
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit Mail Subject
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Mail Subject</Form.Label>
            <Form.Control type="text" placeholder="new mail subject" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Mail Title</Form.Label>
            <Form.Control type="text" placeholder="new mail title" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Mail Description</Form.Label>
            <Form.Control as="textarea" placeholder="new mail description" />
          </Form.Group>
          <Form.Group>
            <Form.Check
              checked={allUsers}
              type="checkbox"
              label="All Alumni"
              onChange={(e) => {
                console.log(setAllUsers(e.target.checked));
                // functionDispatch();
              }}
            />
            {!allUsers && (
              <>
                <CheckboxList />
              </>
            )}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            props.onHide();
            props.onShow();
          }}
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

function SendMail(props) {
  const [modalShow, setModalShow] = React.useState(false);
  const [checked, setCheckbox] = React.useState(false);

  return (
    <>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Check
          type="checkbox"
          checked={checked}
          label="Mail Alumni"
          onClick={() => setCheckbox(!checked)}
          onChange={(e) => {
            e.target.checked && setModalShow(true);
          }}
        />
      </Form.Group>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => {
          setModalShow(false);
          setCheckbox(false);
        }}
        onShow={() => setCheckbox(true)}
        mail={() => props.mail()}
      />
    </>
  );
}

export default SendMail;
