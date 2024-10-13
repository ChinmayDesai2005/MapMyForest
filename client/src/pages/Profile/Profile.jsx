import Form from 'react-bootstrap/Form';
import './Profile.css'

function Profile() {
  return (
      <div className="DetailsContainer">
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
          <Form.Label>Permanent Address</Form.Label>
          <Form.Control type="text" placeholder="Mumbai, India" />
          </Form.Group>
          <Form.Group className="mb-3">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control type="text" placeholder="400074" />
          </Form.Group>
        </div>
      </div>
  )
}

export default Profile