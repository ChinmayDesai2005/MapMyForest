import { useState,useEffect } from "react";
import './Projects.css';
import ProjectCard from "../../components/misc/ProjectCard";
import { IoMdAdd } from "react-icons/io";
import HomeHeader from "../../components/HomeHeader/HomeHeader";
import Footer from "../../components/Footer/Footer";
import MyLoader from "../../components/misc/MyLoader";
import { toast } from 'react-toastify';
import axios from "axios";
import { UserState } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import states from '../../utils/states.json'
import Form from 'react-bootstrap/Form';


function Projects() {
  const [projects, setProjects] = useState([]); // State for projects array
  const [ProjectName, setProjectName] = useState("");
  const [MoreProjects, setMoreProjects] = useState(false);
  const [loading,setLoading] = useState(false);
  //modal handling
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [project_name,setProjectname] = useState("");
  const [locations, setLocations] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");


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
  localStorage.setItem('selectedProject',JSON.stringify(project))
  navigate('/home')
};

const newProjectCreation = async() => {
  const location = `${selectedState}, ${selectedLocation}`;
  const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      withCredentials: true
    }
    try {
      setLoading(true); 
      const response = await axios.post("http://localhost:5000/api/v1/project/createproject",{project_name,location},config);
      setSelectedProject(response.data.project)
      localStorage.setItem('selectedProject',JSON.stringify(response.data.project))
      toast.success(response.data.message);
      navigate('/home')
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.error || "Error Creating projects");
    } finally {
      setLoading(false);
    }
  }

const handleStateChange = (e) => {
    const stateId = e.target.value;
    setSelectedState(stateId);
    const selectedStateObj = states.find(state => state.id === stateId);
    setLocations(selectedStateObj?.GoverningBodies || []);
    setSelectedLocation("");  // Reset location on state change
  };

  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value);
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
        <button className="create-btn" onClick={handleShow}>
          <IoMdAdd className="action_button_icons" />
          Create New Project
        </button>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="Create_project_box">
          <div className="input_project_div">
            <label htmlFor="">Project Name</label>
            <input type="text" id="project_name" value={project_name} onChange={(e)=>setProjectname(e.target.value)} placeholder="Enter your project name"/>
          </div>
          <div className="input_project_div">
                  <label htmlFor="state">State</label>
                  <Form.Select id="state" value={selectedState} onChange={handleStateChange}>
                    <option value="">Select State</option>
                    {states.map((state) => (
                      <option key={state.id} value={state.id}>{state.name}</option>
                    ))}
                  </Form.Select>
                </div>
                <div className="input_project_div">
                  <label htmlFor="location">Location</label>
                  <Form.Select id="location" value={selectedLocation} onChange={handleLocationChange} disabled={!selectedState}>
                    <option value="">Select Government Body</option>
                    {locations.map((location) => (
                      <option key={location.id} value={location.name}>{location.name}</option>
                    ))}
                  </Form.Select>
                </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={newProjectCreation}>
            {loading? (<Spinner animation="grow" />): "Create Project"}
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
      </section>
      <Footer />
    </>
  )
}

export default Projects;
