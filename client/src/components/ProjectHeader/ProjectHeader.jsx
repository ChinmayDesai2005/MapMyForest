import './ProjecHeader.css'
import {  FaBell } from 'react-icons/fa'; // Import icons from react-icons
import { IoSettingsSharp } from 'react-icons/io5';

function ProjectHeader() {
  return (
    <header className="header-container">
      <nav className="nav-links">
        <a href="/" className="nav-link">Home</a>
        <a href="/projects" className="nav-link">Projects</a>
        <a href="/about" className="nav-link">About</a>
        <a href="/contact" className="nav-link">Contact</a>
      </nav>
      <div className="nav-icons">
        <IoSettingsSharp className="icon" />
        <FaBell className="icon" />
        <img 
          src="https://via.placeholder.com/40" 
          alt="Profile" 
          className="profile-image"
        />
      </div>
      </header>
  )
}

export default ProjectHeader