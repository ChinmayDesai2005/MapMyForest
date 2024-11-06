/* eslint-disable react-hooks/rules-of-hooks */
import { Link, useNavigate } from "react-router-dom";
import './Starter.css';
import { UserState } from "../../Context/UserContext";
import { useEffect } from "react";
import MyLoader from "../../components/misc/MyLoader";

function Starter() {
  const navigate = useNavigate();
  const { selectedProject, setSelectedProject } = UserState();

  useEffect(() => {
    const storedProject = JSON.parse(localStorage.getItem("selectedProject"));
    if (storedProject) {
      setSelectedProject(storedProject);
    }
  }, [setSelectedProject]);

  if (!selectedProject) {
    return <div><MyLoader /></div>;
  }

  const handleNavigate = () => {
    navigate('/home/uploadimage');
  };

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
          <Link to="/home/analysis" className="analysis-link">
            Data Analysis
          </Link>
        </div>
        <div className="uploaded-images-section">
          <h2>Uploaded Images</h2>
          <div className="gallery-container">
            <div className="image-stack">
              {selectedProject.tree_images.length > 0 ? (
                <>
                  {selectedProject.tree_images.map((image, index) => (
                    <div className="image-wrapper" key={index}>
                      <img src={image.image_url} alt={`Uploaded ${index + 1}`} />
                    </div>
                  ))}
                  <button className="add-button" onClick={handleNavigate}>
                    <div className="plus-icon"></div>
                  </button>
                </>
              ) : (
                <p>No images uploaded yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Starter;
