import './ProjecHeader.css'
import {  FaBell } from 'react-icons/fa'; // Import icons from react-icons
import { IoSettingsSharp } from 'react-icons/io5';
import { FaRegUserCircle } from "react-icons/fa";
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Profile from '../../pages/Profile/Profile'


function ProjectHeader() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <header className="projectheader-container">
      <nav className="nav-links">
        <a href="/" className="nav-link">Home</a>
        <a href="/projects" className="nav-link">Projects</a>
        <a href="/about" className="nav-link">About</a>
        <a href="/contact" className="nav-link">Contact</a>
      </nav>
      <div className="nav-icons">
        <IoSettingsSharp className="icon" />
        <FaBell className="icon" />
        <FaRegUserCircle className="profile-image" onClick={handleShow}/>

        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>User Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body><Profile /></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
      </header>
  )
}

export default ProjectHeader