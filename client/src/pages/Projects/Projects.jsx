import { useState,useEffect } from "react";
import './Projects.css';
import ProjectCard from "../../components/misc/ProjectCard";
import { ImPencil2 } from "react-icons/im";
import { IoMdAdd } from "react-icons/io";
import HomeHeader from "../../components/HomeHeader/HomeHeader";
import Footer from "../../components/Footer/Footer";
import MyLoader from "../../components/misc/MyLoader";
import { toast } from 'react-toastify';
import axios from "axios";
import { UserState } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";
// import { FaSearch } from 'react-icons/fa';


function Projects() {
  const [projects, setProjects] = useState([]); // State for projects array
  const [ProjectName, setProjectName] = useState("");
  const [MoreProjects, setMoreProjects] = useState(false);
  const [loading,setLoading] = useState(false);
  const {user,setSelectedProject} = UserState();
  const navigate = useNavigate()
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));
  
   useEffect(() => {
    loadProjects();
  }, []);

  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("MapMyForestUser"));
    if (!user) navigate("/auth");
  },[user,navigate])


  const loadProjects = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      withCredentials: true
    }
    try {
      setLoading(true); 
      const response = await axios.get("http://localhost:5000/api/v1/project/accessallproject",config);
      setProjects(response.data.project_group || []);
      toast.success(response.data.message);
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.error || "Error loading projects");
    } finally {
      setLoading(false);
    }
  };

  const projectsToShow = MoreProjects ? projects : projects.slice(0, 4);
  

const handleCardSelect = (project) => {
  setSelectedProject(project);
  navigate('/home')
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

     {loading ? (
          <MyLoader />
        ) : (
          <div className="projects-grid">
            {projectsToShow.map((project) => (
              <ProjectCard
                key={project._id}
                project={project}
                handleCardSelect={handleCardSelect}
              />
            ))}
          </div>
        )}  
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
