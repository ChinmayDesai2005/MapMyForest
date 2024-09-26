import { Outlet, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import UploadImage from "./pages/LoadImage/UploadImage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SideBar from "./components/SideBar/SideBar";
import ProjectHeader from "./components/ProjectHeader/ProjectHeader"
import Projects from "./pages/Projects/Projects";

function App() {

  const Layout = () => {
    return (<div className="MainContainer">
      <div className="MenuContainer"><SideBar /></div>
      <div className="contentMainContainer">
        <div className="ContentHeader"><ProjectHeader /></div>
        <div className="contentContainer"><Outlet /></div>
      </div>
    </div>)
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/uploadimage" element={<UploadImage />} />
        <Route path="/home" element={<Layout />}>
          <Route index element={<Projects />} />
        </Route>
      </Routes>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  )
}

export default App
