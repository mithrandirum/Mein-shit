import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
//import { useParams } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputGroup from "react-bootstrap/InputGroup";
import { profileUpdate } from "../../redux/actions/profileActions";
// import {
//   createProfile,
//   updateProfile,
// } from "../../redux/actions/profileActions";
// import { updateUser } from "../../redux/actions/authActions";
import { uploadImage } from "./../../redux/actions/profileActions";

import { setAlert } from "./../../redux/actions/alertActions";

export const UpdateProfile = ({ history, match }) => {
  const alertSate = useSelector((state) => state.alertReducer);
  // const authState = useSelector((state) => state.authReducer);
  // const profileState = useSelector((state) => state.profileReducer);

  const dispatch = useDispatch();
  const state = {
    facebook: "",
    youtube: "",
    instagram: "",
    description: "",
  };

  const [data, setFormData] = useState(state);

  const [file, setFile] = useState(null);

  const onImage = (e) => {
    setFile(e.target.files[0]);
    console.log(file);
  };
  console.log(file);

  const submitImage = (e) => {
    e.preventDefault();
    //stopProgation();

    dispatch(uploadImage(file));
  };

  const onChange = (e) => {
    setFormData({ ...data, [e.target.name]: e.target.value });
  };

  const { facebook, youtube, description, instagram } = data;

  const onSubmit = (e) => {
    e.preventDefault();
    if (
      facebook === "" ||
      youtube === "" ||
      description === "" ||
      instagram === ""
    ) {
      dispatch(setAlert("please fill in all feilds", "danger"));
    } else {
      dispatch(profileUpdate(data, history));
    }
  };

  const compo = (
    <>
      <div className='alluring'>
        {alertSate.length > 0 &&
          alertSate.map((alert, index) => (
            <Alert key={index} variant={alert.alertype} className='mt-5'>
              {alert.msg}
            </Alert>
          ))}
      </div>

      <div className='west'>
        <div className='form-width'></div>

        <Form
          style={{ textAlign: "center", color: "white" }}
          className='form-width-2'
          onSubmit={(e) => onSubmit(e)}
        >
          <Form.Group>
            <h2 style={{ textAlign: "center" }} className='align'>
              update social Links
            </h2>
            <Form.Group>
              <i className='fab fa-facebook-square'></i>
              <Form.Label>Facebook...</Form.Label>
              <Form.Control
                type='text'
                placeholder='add Facebook account url...'
                value={facebook}
                name='facebook'
                onChange={(e) => onChange(e)}
              />
              <Form.Text className='text-muted'></Form.Text>
            </Form.Group>

            <Form.Group>
              <i className='fab fa-instagram'></i>
              <Form.Label>Instargram</Form.Label>
              <Form.Control
                type='text'
                placeholder='add Instagram account url...'
                value={instagram}
                name='instagram'
                onChange={(e) => onChange(e)}
              />
            </Form.Group>
            <Form.Group controlId='formBasicPassword'>
              <i className='fab fa-youtube'></i>
              <Form.Label>Youtube</Form.Label>
              <Form.Control
                type='text'
                placeholder='add youtube account url...'
                value={youtube}
                name='youtube'
                onChange={(e) => onChange(e)}
              />
            </Form.Group>
            <Form className=''>
              <Form.Group>
                <Form.File
                  style={{ fontSize: "large" }}
                  id='exampleFormControlFile1'
                  label='Choose a profile image'
                  onChange={(e) => onImage(e)}
                />
              </Form.Group>
              <Button
                variant='primary'
                type='submit'
                className='mt-4'
                size='lg'
                onClick={(e) => submitImage(e)}
                style={{
                  marginBottom: "10px",
                }}
              >
                Submit Image
              </Button>
            </Form>

            <h2
              style={{
                marginBottom: "10px",
              }}
              className='align'
            >
              {" "}
              add a discription
            </h2>

            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text
                  style={{
                    fontSize: "large",
                    marginBottom: "10px",
                    marginTop: "10px",
                  }}
                >
                  Add a description
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                plaseholder='enter description...'
                as='textarea'
                aria-label='With textarea'
                style={{ width: "40vh" }}
                onChange={(e) => onChange(e)}
                name='description'
                value={description}
              />
            </InputGroup>
            <Button
              variant='primary'
              type='submit'
              className='mt-4'
              size='lg'
              block
            >
              Submit
            </Button>
          </Form.Group>
        </Form>
      </div>
    </>
  );

  return <div className='update-container'>{compo}</div>;
};
