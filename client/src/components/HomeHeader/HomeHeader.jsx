import './HomeHeader.css';
import { FaBell } from 'react-icons/fa'; 
import { IoSettingsSharp } from 'react-icons/io5';
import Logo from '../../assets/Logo_png.png';

function HomeHeader() {
  return (
    <header className="header-container">
      <div className="brand-container">
        <img src={Logo} alt="logo" className="logo" />
        <h1 className="brand-title">MAPMYFOREST</h1>
      </div>
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
  );
}

export default HomeHeader;
