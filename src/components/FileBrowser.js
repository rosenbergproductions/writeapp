import React from 'react';
import { Modal, Button, ListGroup } from 'react-bootstrap';

const FileBrowser = ({ show, onHide, documents, onSelect }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Open Document</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ListGroup>
          {documents.map(doc => (
            <ListGroup.Item key={doc.id} action onClick={() => onSelect(doc)}>
              {doc.title || 'Untitled'}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FileBrowser;
