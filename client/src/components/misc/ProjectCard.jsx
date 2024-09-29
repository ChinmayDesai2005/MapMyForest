/* eslint-disable react/prop-types */
import { FaCircle } from 'react-icons/fa'; 

function ProjectCard({project,handleCardSelect, isSelected}) {

    const cardStyle = isSelected ? 'selected-card' : 'project-card';

    const getStatusColor = () => {
    switch (project.Status.toLowerCase()) {
      case 'in progress':
        return '#61FF00'; // Green
      case 'completed':
        return '#0075FF'; // Blue
      case 'on hold':
        return '#ff9800'; // Orange
      default:
        return '#888'; // Default Gray
    }
  };

  return (
     <div 
      className={`project-card ${cardStyle}`} 
      onClick={() => handleCardSelect(project.id)}
    >
      <div className="project-card-header">
        <h3>{project.name}</h3>
        <p>Creation Date: {project.creationDate}</p>
      </div>
      <div className="project_card_footer">
        <p>Status: <span className={`status`}>{project.Status}</span></p>
        <FaCircle className="status-icon" style={{ color: getStatusColor() }} />
      </div>
    </div>
  )
}

export default ProjectCard