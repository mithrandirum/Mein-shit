import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { addPost } from "../../redux/actions/postActions";

export const AddPost = ({ show, handleClose, handleShow }) => {
  const dispatch = useDispatch();

  const [file, setFile] = useState(null);
  const [text, setText] = useState("");

  const onFile = (e) => {
    e.preventDefault();
    setFile(e.target.files[0]);
  };

  const onChange = (e) => {
    setText(e.target.value);
  };

  function onSubmit(e) {
    e.preventDefault();
    dispatch(addPost(file, text, e));
    handleClose();
    console.log(file, text);

    // setFile(null);
    // setText("");
  }

  return (
    <>
      {/* <Button variant='primary' onClick={handleShow}>
        Launch demo modal
      </Button> */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>publish a post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => onSubmit(e)}>
            <Form.Group controlId='exampleForm.ControlTextarea1'>
              <Form.Label>add a description</Form.Label>
              <Form.Control
                as='textarea'
                rows={3}
                onChange={(e) => onChange(e)}
              />
            </Form.Group>
          </Form>

          <Form.Group>
            <Form.File
              id='exampleFormControlFile1'
              label='add an image file'
              onChange={(e) => onFile(e)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='primary' onClick={(e) => onSubmit(e)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

// <Form.Group>
// <Form.File
//   id='exampleFormControlFile1'
//   label='add a an image'
//   onChange={(e) => onFile(e)}
// />
// </Form.Group>

// <Form.Group controlId='formBasicPassword'>
// <i className='fab fa-youtube'></i>
// <Form.Label>Youtube</Form.Label>
// <Form.Control
//   type='text'
//   placeholder='add youtube account url...'
//   value={youtube}
//   name='youtube'
//   onChange={(e) => onChange(e)}
// />
// </Form.Group>
// <Form className='form-width'>
// <Form.Group>
//   <Form.File
//     id='exampleFormControlFile1'
//     label='Choose a profile image'
//     onChange={(e) => onImage(e)}
//   />
// </Form.Group>
// <Button
//   variant='primary'
//   type='submit'
//   className='mt-4'
//   size='lg'
//   onClick={(e) => submitImage(e)}
// >
//   Submit Image
// </Button>
// </Form>
