import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "./../../../redux/actions/alertActions";
import { register } from "../../../redux/actions/authActions";
import Spinner from "react-bootstrap/Spinner";

const Register = ({ history }) => {
  const alertState = useSelector((state) => state.alertReducer);
  const authReducer = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();

  const state = {
    psuedo: "",
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState(state);

  const { psuedo, password, email } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    if (!psuedo || !email || !password) {
      dispatch(setAlert("please fill all the fields", "danger"));
    }
    e.preventDefault();

    dispatch(register(formData, history));
    console.log(formData);

    authReducer.isAuthenticated &&
      dispatch(setAlert("please fill all the fields", "success"));

    setFormData(state);
  };

  const component = (
    <Container>
      <h1 className='mt-4' style={{ textAlign: "center", color: "gray" }}>
        Register an Account
      </h1>

      <Form className='mt-5' onSubmit={(e) => onSubmit(e)}>
        <Form.Group controlId='formBasicEmail'>
          <Form.Label style={{ color: "white" }}>Psuedo</Form.Label>
          <Form.Control
            style={{ opacity: "0.9" }}
            type='name'
            placeholder='Choose a psuedo'
            onChange={(e) => onChange(e)}
            name='psuedo'
            value={psuedo}
          />
          <Form.Text className='text-muted' style={{ color: "white" }}>
            what should we call you
          </Form.Text>
        </Form.Group>
        <Form.Group controlId='formBasicEmail'>
          <Form.Label style={{ color: "white" }}>Email address</Form.Label>
          <Form.Control
            style={{ opacity: "0.9" }}
            type='email'
            placeholder='email'
            onChange={(e) => onChange(e)}
            name='email'
            value={email}
          />
          <Form.Text className='text-muted' style={{ color: "white" }}>
            Please enter a Valid Email Address
          </Form.Text>
        </Form.Group>
        <Form.Group
          controlId='formBasicPassword'
          style={{ color: "white", opacity: "2" }}
        >
          <Form.Label>Password</Form.Label>
          <Form.Control
            style={{ opacity: "0.9" }}
            type='password'
            placeholder='Password'
            onChange={(e) => onChange(e)}
            name='password'
            value={password}
          />
          <Form.Text style={{ color: "white" }} className='text-muted'>
            password must be at least 6 carachter long
          </Form.Text>
        </Form.Group>
        <Button variant='primary' type='submit' size='lg'>
          Register
        </Button>
        <Form.Text className='text-muted'>
          already have an account? <Link to='/Login'>Login</Link>
        </Form.Text>
      </Form>
    </Container>
  );

  const spin = (
    <div className='center'>
      <Container>
        <Spinner animation='border' className='lg' />
      </Container>
    </div>
  );

  return (
    <>
      <div className='register-alright'>
        <div className='alluring' style={{ left: "43%" }}>
          {" "}
          {alertState.length > 0 &&
            alertState.map((alert, index) => (
              <Alert key={index} variant={alert.alertype} className='mt-5'>
                {alert.msg}
              </Alert>
            ))}
        </div>
        <div className='form-width dude'>
          {authReducer.loading ? spin : component}
        </div>
      </div>
    </>
  );
};

export default Register;
