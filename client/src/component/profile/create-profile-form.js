import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Redirect } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputGroup from "react-bootstrap/InputGroup";
import { createProfile } from "../../redux/actions/profileActions";
import { setAlert } from "../../redux/actions/alertActions";

export const ProfileForm = ({ history }) => {
  const alertSate = useSelector((state) => state.alertReducer);
  //const authState = useSelector((state) => state.authReducer);
  const profileState = useSelector((state) => state.profileReducer);

  const dispatch = useDispatch();
  const state = {
    description: "",
    facebook: "",
    instagram: "",
    youtube: "",
  };

  useEffect(() => {
    !profileState.loading && profileState.profile !== null && (
      <Redirect to='/profile' />
    );
  }, [dispatch, profileState.loading, profileState.profile]);

  const [data, setFormData] = useState(state);
  //const [file, setFile] = useState(null);

  const onChange = (e) => {
    setFormData({ ...data, [e.target.name]: e.target.value });
  };
  const { description, instagram, facebook, youtube } = data;

  const onSubmit = (e) => {
    e.preventDefault();

    if (
      description === "" ||
      facebook === "" ||
      youtube === "" ||
      instagram === ""
    ) {
      dispatch(setAlert("please fill all fields", "danger"));
    } else {
      dispatch(createProfile(data, history));
    }
  };

  const compo = (
    <div className='alright-add'>
      <div className='alluring' style={{ marginTop: "0px" }}>
        {alertSate.length > 0 &&
          alertSate.map((alert, index) => (
            <Alert key={index} variant={alert.alertype} className='mt-5'>
              {alert.msg}
            </Alert>
          ))}
      </div>
      <div className='west'>
        {/* <div className='form-width'></div> */}
        <Form
          className='form-width'
          onSubmit={(e) => onSubmit(e)}
          style={{ color: "white", opacity: "0.9" }}
        >
          <Form.Group>
            <h2 className='mt-4 align'>Create Account Add social Links</h2>
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

            <h2 className='align'>add a discription</h2>

            <InputGroup.Text>
              <InputGroup.Prepend>
                <InputGroup.Text style={{ fontSize: "large" }}>
                  Add a description
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                as='textarea'
                aria-label='With textarea'
                style={{ width: "40vh" }}
                onChange={(e) => onChange(e)}
                name='description'
                value={description}
              />
            </InputGroup.Text>
            <Button
              variant='primary'
              type='submit'
              className='mt-4'
              size='lg'
              block
              onClick={() => <Redirect to='/profile' />}
            >
              Submit
            </Button>
          </Form.Group>
        </Form>
      </div>
    </div>
  );

  // if (authState.isAuthenticated && profileState.profile == !null) {
  //   <Redirect to='/profile' />;
  // }

  return profileState.profile ? (
    <Redirect to='/profile' />
  ) : (
    <div style={{ postion: "relative" }}>{compo}</div>
  );
};
