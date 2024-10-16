import { Link } from "react-router-dom";
import './Starter.css';
import { UserState } from "../../Context/UserContext";
import { useEffect } from "react";

function Starter() {
  const {selectedProject} = UserState();

  useEffect(()=>{
    console.log(selectedProject)
  })

  return (
    <div className="starter-container">
      <div className="project-starter-card">
        <h1 className="project-title">{selectedProject.project_name}</h1>
        <p><strong>Creation Date:</strong> {selectedProject.created_at}</p>
        <p><strong>Selected State:</strong> {selectedProject.location}</p>

        <div className="navigation-buttons">
          <Link to="/home/manage" className="manage-link">
            Manage Project
          </Link>
          <Link to="/home/uploadimage" className="upload-link">
            Upload Image
          </Link>
          <Link to="/home/analysis" className="analysis-link">
            Analyze Data
          </Link>
        </div>
        <div className="uploaded-images-section">
          <h2>Uploaded Images</h2>
          <div className="image-grid">
            {selectedProject.tree_images.length > 0 ? (
              selectedProject.tree_images.map((image, index) => (
                <div key={index} className="image-card">
                  <img src={image.image_url} alt={`Uploaded ${index + 1}`} />
                </div>
              ))
            ) : (
              <p>No images uploaded yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Starter;
