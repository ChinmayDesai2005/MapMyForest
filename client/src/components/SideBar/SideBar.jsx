import './SideBar.css'
import Logo from '../../assets/Logo_png.png';
import { IoSettingsSharp } from "react-icons/io5";
import {NavLink, useNavigate} from "react-router-dom"
import { VscGithubProject } from "react-icons/vsc";
import { RiImageAddFill,RiFileSettingsLine  } from "react-icons/ri";
import { AiOutlineVideoCameraAdd } from "react-icons/ai";
import { SiGoogleanalytics } from "react-icons/si";

function SideBar() {
    const navigate = useNavigate();
  return (
    <div className='MainSideBarContainer'>
        <div className="BrandContainer">
            <img src={Logo} alt="logo.png" />
            <h1 onClick={()=>(navigate('/'))}>MAPMYFOREST</h1>
        </div>
        <div className="RoutesLinkContainer">
            <NavLink to={'/home/project'} activeclassname="active">
                <VscGithubProject className='linkIcon'/> 
                <p>Project</p>
            </NavLink>
            <NavLink to={'/home/manage'} activeclassname="active">
                <RiFileSettingsLine  className='linkIcon'/> 
                <p>Manage</p>
            </NavLink>
            <NavLink to={'/home/uploadimage'}>
                <RiImageAddFill className='linkIcon'/>
                <p>Add Image</p>
            </NavLink>
            <NavLink to={'/random'}>
                <AiOutlineVideoCameraAdd className='linkIcon'/>
                <p>Add Video</p>
            </NavLink>
            <NavLink to={'/home/analysis'}>
                <SiGoogleanalytics className='linkIcon'/>
                <p>Analysis</p>
            </NavLink>
        </div>
        
        <NavLink to={'/home/profile'} className="BottomSettingsContainer">
            <IoSettingsSharp className='settings-icons'/>
            <h6>Settings</h6>
        </NavLink>
        
    </div>
  )
}

export default SideBar