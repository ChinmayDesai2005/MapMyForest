import "./SideBar.css";
import Logo from "../../assets/Logo_png.png";
import { NavLink, useNavigate } from "react-router-dom";
import { VscGithubProject } from "react-icons/vsc";
import { RiImageAddFill, RiFileSettingsLine } from "react-icons/ri";
import { AiOutlineVideoCameraAdd } from "react-icons/ai";
import { SiGoogleanalytics } from "react-icons/si";

function SideBar() {
  const navigate = useNavigate();
  return (
    <div className="MainSideBarContainer">
      <div className="BrandContainer">
        <img src={Logo} alt="logo.png" />
        <h1 onClick={() => navigate("/")}>MAPMYFOREST</h1>
      </div>
      <div className="RoutesLinkContainer">
        <NavLink to={"/home"} activeclassname="active">
          <VscGithubProject className="linkIcon" />
          <p>Home</p>
        </NavLink>
        <NavLink to={"/home/manage"} activeclassname="active">
          <RiFileSettingsLine className="linkIcon" />
          <p>Manage</p>
        </NavLink>
        <NavLink to={"/home/uploadimage"}>
          <RiImageAddFill className="linkIcon" />
          <p>Add Images</p>
        </NavLink>
        {/* <NavLink to={'/random'} aria-disabled className="disabled-link">
                <AiOutlineVideoCameraAdd className='linkIcon'/>
                <p>Add Video</p>
            </NavLink> */}
        <NavLink to={"/home/analysis"}>
          <SiGoogleanalytics className="linkIcon" />
          <p>Analysis</p>
        </NavLink>
      </div>
    </div>
  );
}

export default SideBar;
