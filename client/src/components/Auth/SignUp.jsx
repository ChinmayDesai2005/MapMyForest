import "./Main.css";
import { FaFacebook, FaGoogle, FaLinkedin} from 'react-icons/fa';
import { useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();
  const handleSubmit = async() => {
    navigate('/home')
  }
  return (
    <form method="post" onSubmit={handleSubmit}>
      <input type="email" placeholder="Email" required />
      <input type="password" placeholder="Password" required />
      <input type="password" placeholder="Confirm Password" required />
      <button type="submit">Sign Up</button>
      <div className="social-login">
        <p>Continue with</p> 
        <div className="icon-container"> 
          <a href="https://google.com" className="icon" aria-label="Google" target="_blank" rel="noopener noreferrer">
            <FaGoogle />
          </a>
          <a href="https://facebook.com" className="icon" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
            <FaFacebook />
          </a>
          <a href="https://linkedin.com" className="icon" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
            <FaLinkedin />
          </a>
        </div>
      </div>
    </form>
  );
}

export default SignUp;
