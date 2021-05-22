import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
// import {
//   createProfile,
//   updateProfile,
// } from "../../redux/actions/profileActions";
import { updateUser } from "../../redux/actions/authActions";
import { deleteProfile } from "../../redux/actions/profileActions";
import { setAlert } from "../../redux/actions/alertActions";

export const UpdateUser = ({ history }) => {
  const alertSate = useSelector((state) => state.alertReducer);
  // const authState = useSelector((state) => state.authReducer);
  // const profileState = useSelector((state) => state.profileReducer);

  const dispatch = useDispatch();
  const state = {
    psuedo: "",
    email: "",
    password: "",
  };

  const [data, setFormData] = useState(state);

  const onChange = (e) => {
    setFormData({ ...data, [e.target.name]: e.target.value });
  };

  const { psuedo, email, password } = data;

  const check = (psuedo, email, password) => {
    if (!psuedo || psuedo.length < 3) {
      dispatch(setAlert("psuedo must be at least 3 carachter long", "danger"));
    } else if (!email || !validateEmail(email)) {
      dispatch(setAlert("please a valid email", "danger"));
    } else if (!password || password.length < 6) {
      dispatch(
        setAlert("password must be at least 6 carachter long", "danger")
      );
    } else {
      dispatch(updateUser(data, history));
    }
    //
  };

  const profileId = useParams();

  const submitDelete = () => {
    window.confirm(
      "this actions cannot be undone are you sure you want to preceed?"
    );
    dispatch(deleteProfile(profileId.profileId, history));
    console.log(profileId);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    check(psuedo, email, password);
  };

  const compo = (
    <>
      <div className='alluring' style={{ left: "720px" }}>
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
          className='form-width mt-4'
          style={{ textAlign: "center", color: "white" }}
          onSubmit={(e) => onSubmit(e)}
        >
          <h1 className='ml-4 mt-4' style={{ color: "white" }}>
            Update Credentials
          </h1>
          <Form.Group>
            <Form.Group>
              <Form.Label>psuedo</Form.Label>
              <Form.Control
                type='text'
                placeholder='add psuedo...'
                value={psuedo}
                name='psuedo'
                onChange={(e) => onChange(e)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>email</Form.Label>
              <Form.Control
                type='text'
                placeholder='add an email...'
                value={email}
                name='email'
                onChange={(e) => onChange(e)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>password</Form.Label>
              <Form.Control
                type='password'
                placeholder='password...'
                value={password}
                name='password'
                onChange={(e) => onChange(e)}
              />
            </Form.Group>

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
          <h2>
            <i className='fas fa-user-edit mt-2'>
              {" "}
              update Profile info{"    "}
            </i>
            {"  "}
            <Button
              onClick={() => history.push("/update-profile")}
              className='btn-dark'
            >
              Update
            </Button>
            {"   "}
          </h2>
          <h2 className='mt-4'>
            <i class='fas fa-user-slash'></i>delete user profile {"    "}
            {"  "}
            <Button onClick={() => submitDelete()} className='btn-danger'>
              Delete
            </Button>
            {"   "}
          </h2>
        </Form>
      </div>
    </>
  );

  function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  return <div className='update-container'>{compo}</div>;
};
