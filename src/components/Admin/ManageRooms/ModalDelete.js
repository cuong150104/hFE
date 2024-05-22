import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const ModalDelete = (props) => {
  return (
    <>
      <Modal show={props.show} onHide={props.handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete Room</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure to delete this room: {props.dataModal.title}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={props.confirmDeleteRoom}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDelete;
