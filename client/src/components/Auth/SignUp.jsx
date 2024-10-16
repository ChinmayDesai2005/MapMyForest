import "./Main.css";
import { FaFacebook, FaGoogle, FaLinkedin} from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from 'axios'; 
import { toast } from 'react-toastify';
import { UserState } from "../../Context/UserContext";

function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const {setUser} = UserState();

  const handleSubmit = async(e) => {
    e.preventDefault()
    const userData = {
      username: username,
      email: email,
      password: password
    }
    try {
      const response = await axios.post('http://localhost:5000/api/v1/user/register', userData);

      if (response.status === 201) {
        localStorage.setItem('MapMyForestUser',JSON.stringify(response.data.user))
        localStorage.setItem('accessToken',JSON.stringify(response.data.accessToken))
        setUser(response.data.user)
        toast.success(response.data.message);
        navigate('/project');
      }
    } catch (error) {
      if (error.response && error.response.data) {
        alert(error.response.data.error || 'Registration failed');
      } else {
        alert('An error occurred during registration.');
      }
    }
  }
  return (
    <form method="post" onSubmit={handleSubmit}>
      <input type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)}/>
      <input type="text" placeholder="Username" required value={username} onChange={(e) => setUsername(e.target.value)}/>
      <input type="password" placeholder="Password" required  value={password} onChange={(e) => setPassword(e.target.value)}/>
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
