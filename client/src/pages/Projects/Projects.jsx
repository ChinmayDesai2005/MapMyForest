import { useState } from "react";
import './Projects.css';
import ProjectCard from "../../components/misc/ProjectCard";
import { ImPencil2 } from "react-icons/im";
import { IoMdAdd } from "react-icons/io";
import HomeHeader from "../../components/HomeHeader/HomeHeader";
import Footer from "../../components/Footer/Footer";
// import { FaSearch } from 'react-icons/fa';

// Initial projects data
const initialProjects = [
  {
    id: 0,
    name: "Amazon Rainforest Survey",
    creationDate: "July 15, 2015",
    Status: "In Progress",
    selectedState: 'True'
  },
  {
    id: 1,
    name: "Central Park Tree Census",
    creationDate: "July 14, 2005",
    Status: "Completed",
    selectedState: 'False'
  },
  {
    id: 2,
    name: "Mountain Forest Assessment",
    creationDate: "June 12, 2018",
    Status: "On Hold",
    selectedState: 'False'
  },
  {
    id: 3,
    name: "Wildlife Migration Study",
    creationDate: "April 5, 2012",
    Status: "Completed",
    selectedState: 'False'
  },
  {
    id: 4,
    name: "Urban Park Analysis",
    creationDate: "March 22, 2019",
    Status: "In Progress",
    selectedState: 'False'
  },
  {
    id: 5,
    name: "Wildlife Migration Study",
    creationDate: "April 5, 2012",
    Status: "Completed",
    selectedState: 'False'
  },
  {
    id: 6,
    name: "Wildlife Migration Study",
    creationDate: "April 5, 2012",
    Status: "Completed",
    selectedState: 'False'
  },
  {
    id: 7,
    name: "Wildlife Migration Study",
    creationDate: "April 5, 2012",
    Status: "Completed",
    selectedState: 'False'
  }
];

function Projects() {
  const [projects, setProjects] = useState(initialProjects); // State for projects array
  const [ProjectName, setProjectName] = useState("");
  const [MoreProjects, setMoreProjects] = useState(false);

  // Determine the projects to display based on 'See More' or 'See Less'
  const projectsToShow = MoreProjects ? projects : projects.slice(0, 4);
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  const handleCardSelect = (id) => {
    // Update the selectedState of the project in the projects array
    const updatedProjects = projects.map((project) => 
      project.id === id ? { ...project, selectedState: project.selectedState === 'True' ? 'False' : 'True' } : project
    );
    setProjects(updatedProjects); 
    
    // Toggle selection of the project card
    setSelectedProjectId(id === selectedProjectId ? null : id);
  };

  return (
    <>
    <HomeHeader/>
      <section className="ProjectSection">
        <div className="TopProjectDiv">
        <h3>Projects</h3>
        <div className="search-wrapper">
          <input 
            placeholder="Search For Project" 
            value={ProjectName} 
            onChange={(e) => setProjectName(e.target.value)}
          />
        </div>
      </div>
      <div className="LoadingDiv">
        <h6>Recent</h6>
        <p onClick={() => setMoreProjects(!MoreProjects)}>
          {MoreProjects ? "See Less" : "See More"}
        </p>
      </div>
      <div className="projects-grid">
        {projectsToShow.map((project, id) => (
          <ProjectCard 
            key={id} 
            project={project} 
            handleCardSelect={handleCardSelect} 
            isSelected={project.id === selectedProjectId}
          />
        ))}
      </div>
      <div className="actions_button_div">
        <button className="create-btn">
          <IoMdAdd className="action_button_icons" />
          Create New Project
        </button>
        <button className="edit-btn">
          <ImPencil2 className="action_button_icons" />
          Edit Project
        </button>
      </div>
      </section>
      <Footer />
    </>
  )
}

export default Projects;
