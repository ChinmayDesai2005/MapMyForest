import { Link } from "react-router-dom";
import './Starter.css';

function Starter() {
  const project = {
    id: 0,
    name: "Amazon Rainforest Survey",
    creationDate: "July 15, 2015",
    Status: "In Progress",
    selectedState: "True",
    uploadedImages: [
      // Example image URLs or base64-encoded strings
      "https://example.com/image1.jpg",
      "https://example.com/image2.jpg",
      "https://example.com/image3.jpg",
    ],
  };

  return (
    <div className="starter-container">
      <div className="project-starter-card">
        <h1 className="project-title">{project.name}</h1>
        <p><strong>Creation Date:</strong> {project.creationDate}</p>
        <p><strong>Status:</strong> {project.Status}</p>
        <p><strong>Selected State:</strong> {project.selectedState}</p>

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
            {project.uploadedImages.length > 0 ? (
              project.uploadedImages.map((image, index) => (
                <div key={index} className="image-card">
                  <img src={image} alt={`Uploaded ${index + 1}`} />
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
