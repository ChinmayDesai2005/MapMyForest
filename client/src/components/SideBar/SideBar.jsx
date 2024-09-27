import './SideBar.css'
import Logo from '../../assets/Logo_png.png';
import { IoSettingsSharp } from "react-icons/io5";
import {NavLink} from "react-router-dom"
import { VscGithubProject } from "react-icons/vsc";
import { RiImageAddFill,RiFileSettingsLine  } from "react-icons/ri";
import { AiOutlineVideoCameraAdd } from "react-icons/ai";
import { SiGoogleanalytics } from "react-icons/si";

function SideBar() {
  return (
    <div className='MainSideBarContainer'>
        <div className="BrandContainer">
            <img src={Logo} alt="logo.png" />
            <h1>MAYMYFOREST</h1>
        </div>
        <div className="RoutesLinkContainer">
            <NavLink to={'/home'} activeClassName="active">
                <VscGithubProject className='linkIcon'/> 
                <p>Project</p>
            </NavLink>
            <NavLink to={'/Random'} activeClassName="active">
                <RiFileSettingsLine  className='linkIcon'/> 
                <p>Manage</p>
            </NavLink>
            <NavLink to={'/Random'}>
                <RiImageAddFill className='linkIcon'/>
                <p>Add Image</p>
            </NavLink>
            <NavLink to={'/Random'}>
                <AiOutlineVideoCameraAdd className='linkIcon'/>
                <p>Add Video</p>
            </NavLink>
            <NavLink to={'/Random'}>
                <SiGoogleanalytics className='linkIcon'/>
                <p>Analysis</p>
            </NavLink>
        </div>
        <div className="BottomSettingsContainer">
            <IoSettingsSharp className='settings-icons'/>
            <h6>Setting</h6>
        </div>
    </div>
  )
}

export default SideBar