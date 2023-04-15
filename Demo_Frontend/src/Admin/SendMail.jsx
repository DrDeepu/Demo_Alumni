import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React from "react";
import { useState, useEffect } from "react";
import "./Admin.css";

import { getAllUsers, saveMailData } from "../Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { Form, FormGroup, FormControl } from "react-bootstrap";

function MyVerticallyCenteredModal(props) {
  const dispatch = useDispatch();
  const [allUsers, setAllUsers] = useState(true);
  const userData = useSelector((state) => state.getAllUsers.data);

  const [mailData, setMailData] = useState({
    mailSubject: "",
    mailTitle: "",
    mailDescription: "",
  });

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  const [selectedOptions, setSelectedOptions] = useState([]);
  function CheckboxList(props) {
    const [searchQuery, setSearchQuery] = useState("");

    const handleOptionChange = (option) => {
      if (selectedOptions.includes(option)) {
        setSelectedOptions(
          selectedOptions.filter((selectedOption) => selectedOption !== option)
        );
      } else {
        setSelectedOptions([...selectedOptions, option]);
      }
    };

    const datas = Object.keys(userData).map((user) => {
      return userData[user];
    });

    const filteredOptions = datas.filter((option) => {
      return (
        (option["firstname"] + " " + option["lastname"])
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        selectedOptions.includes(option["firstname"] + option["lastname"])
      );
    });
    return (
      <div>
        <FormControl
          placeholder="Search Alumni"
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
          value={searchQuery}
        />

        <div style={{ maxHeight: "200px", overflowY: "scroll" }}>
          <Form>
            <FormGroup>
              {filteredOptions.map((option) => (
                <div id="send_mail">
                  <Form.Check
                    key={option}
                    label={option["firstname"] + " " + option["lastname"]}
                    checked={selectedOptions.includes(option)}
                    // disabled={selectedOptions.pop(option)}
                    onChange={() => handleOptionChange(option)}
                  />
                </div>
              ))}
            </FormGroup>
          </Form>
        </div>
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
            <Form.Control
              type="text"
              placeholder="new mail subject"
              onChange={(e) => {
                setMailData({ ...mailData, mailSubject: e.target.value });
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Mail Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="new mail title"
              onChange={(e) => {
                setMailData({ ...mailData, mailTitle: e.target.value });
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Mail Description</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="new mail description"
              onChange={(e) => {
                setMailData({ ...mailData, mailDescription: e.target.value });
              }}
            />
          </Form.Group>
          <Form.Group>
            <Form.Check
              checked={allUsers}
              type="checkbox"
              label="All Alumni"
              onChange={(e) => {
                setAllUsers(e.target.checked);
                // functionDispatch();
              }}
            />
            {!allUsers && (
              <>
                <CheckboxList mailSelectedUsers={props.mailSelectedUsers} />
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
            !allUsers && dispatch(saveMailData({ mailData, selectedOptions }));
            allUsers &&
              dispatch(saveMailData({ mailData, selectedOptions: [] }));
            props.mailTrue();
          }}
          disabled={
            mailData.mailSubject === "" ||
            mailData.mailTitle === "" ||
            mailData.mailDescription === "" ||
            (!allUsers && selectedOptions.length === 0)
              ? true
              : false
          }
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
  // console.log(props);
  return (
    <>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Check
          type="checkbox"
          checked={checked}
          label="Mail Alumni"
          onChange={(e) => {
            setCheckbox(Boolean(e.target.checked));
            e.target.checked && setModalShow(true);
            // props.mailFalse();
          }}
        />
      </Form.Group>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => {
          setModalShow(false);
          setCheckbox(false);
          // props.mailFalse();
        }}
        onShow={() => setCheckbox(true)}
        mail={() => props.mail()}
        mailTrue={() => props.mailTrue()}
      />
    </>
  );
}

export default SendMail;
