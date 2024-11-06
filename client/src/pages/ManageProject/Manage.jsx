import { UserState } from '../../Context/UserContext';
import './Manage.css';
import { useState,useEffect } from 'react';
import axios from 'axios'


function Manage() {
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));
  const [formData, setFormData] = useState({
    project_name: '',
    location: '',
    created_at: '',
    tree_images: [],
    videoURL: '',
  });

  const {selectedProject} = UserState();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  useEffect(() => {
    const project_id = selectedProject?._id
    const fetchProject = async () => {
      const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      withCredentials: true
    }
      try {
        const response = await axios.post('http://localhost:5000/api/v1/project/fetchproject',{project_id},config);
        setFormData({
          project_name: response.data.project_data.project_name,
          location: response.data.project_data.location,
          tree_images: response.data.project_data.tree_images || [],
          videoURL: response.data.project_data.videoURL || '',
          created_at: formatDate(response.data.project_data.created_at)
        });
      } catch (error) {
        console.error("Error fetching project data", error);
      }
    };

    fetchProject();
  }, []);

    const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
            value={formData.project_name}
            onChange={handleChange}
            placeholder="Enter Project Name"
            readOnly
          />
        </div>

        <div className="form-group">
          <label>Governing Authority</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Location of project"
            readOnly
          />
        </div>

        <div className="form-group">
          <label>Creation Date</label>
          <input
            type="date"
            name="Date of the Project"
            value={formData.created_at}
            onChange={handleChange}
            readOnly
          />
        </div>

        {/* <div className="form-group media-upload">
  <div className="file-upload">
    <label>Drop Image or Browse</label>
    <input
      type="file"
      name="photos"
      onChange={handleFileChange}
      accept="image/*"
    />
  </div>

  <div className="file-upload">
    <label>Drag Video or Browse</label>
    <input
      type="file"
      name="videos"
      onChange={handleFileChange}
      accept="video/*"
    />
  </div>
</div> */}

        <button type="submit" className="submit-btn">
          Save & Continue
        </button>
      </form>
    </div>
  )
}

export default Manage