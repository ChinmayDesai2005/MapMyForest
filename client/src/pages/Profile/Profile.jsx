import Form from 'react-bootstrap/Form';
import './Profile.css'
import { GoPencil } from "react-icons/go";

function Profile() {
  return (
    <div className="ProfileCard">
      <div className="DetailsContainer">
        <div className="ImageContainer">
          {/* <img src="https://via.placeholder.com/40" alt="placeholder.jpg" /> */}
          <div className="icon-container">
          <GoPencil className="edit-icon" />
          <img src="https://via.placeholder.com/40" alt="placeholder.jpg" />
          </div>
        </div>
        <div className="FormPart1">
          <Form.Group className="mb-3" controlId="ProfileName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Charles" />
          </Form.Group>
          <Form.Group className="mb-3" controlId='ProfileEmail'>
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="charlenereed@gmail.com" />
          </Form.Group>
          <Form.Group className="mb-3">
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control type="date" placeholder="25 January 1990" />
          </Form.Group>
          <Form.Group className="mb-3">
          <Form.Label>Permanent Address</Form.Label>
          <Form.Control type="text" placeholder="Mumbai, India" />
          </Form.Group>
          <Form.Group className="mb-3">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control type="text" placeholder="400074" />
          </Form.Group>
        </div>
        <div className="FormPart2">
          <Form.Group className="mb-3" controlId="ProfileName">
          <Form.Label>User Name</Form.Label>
          <Form.Control type="text" placeholder="Charles" />
          </Form.Group>
          <Form.Group className="mb-3" controlId='ProfileEmail'>
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="**********" />
          </Form.Group>
          <Form.Group className="mb-3">
          <Form.Label>Present Address</Form.Label>
          <Form.Control type="text" placeholder="Mumbai, India" />
          </Form.Group>
          <Form.Group className="mb-3">
          <Form.Label>City</Form.Label>
          <Form.Control type="text" placeholder="Mumbai" />
          </Form.Group>
          <Form.Group className="mb-3">
          <Form.Label>Country</Form.Label>
          <Form.Control type="text" placeholder="India" />
          </Form.Group>
        </div>
      </div>
      <div className="SaveButton">
        <button>Save</button>
      </div>
    </div>
  )
}

export default Profile