import './Manage.css';
import { useState } from 'react';
function Manage() {
  const [formData, setFormData] = useState({
    projectName: '',
    location: '',
    startDate: '',
    endDate: '',
    photos: null,
    videos: null,
  });

    const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <div className="new-project-container">
      <form onSubmit={handleSubmit} className="new-project-form">
        <h1>Manage Project</h1>

        <div className="form-group">
          <label>Project Name</label>
          <input
            type="text"
            name="projectName"
            value={formData.projectName}
            onChange={handleChange}
            placeholder="Enter Project Name"
          />
        </div>

        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Location of project"
          />
        </div>

        <div className="form-group">
          <label>Start Date</label>
          <input
            type="date"
            name="Date of the Project"
            value={formData.startDate}
            onChange={handleChange}
          />
        </div>

        <div className="form-group media-upload">
          <div className="file-upload">
            <label>Select Photos to Upload</label>
            <input
              type="file"
              name="photos"
              onChange={handleFileChange}
              accept="image/*"
            />
          </div>

          <div className="file-upload">
            <label>Select Videos to Upload</label>
            <input
              type="file"
              name="videos"
              onChange={handleFileChange}
              accept="video/*"
            />
          </div>
        </div>

        <button type="submit" className="submit-btn">
          Save & Continue
        </button>
      </form>
    </div>
  )
}

export default Manage