import HomeHeader from "../../components/HomeHeader/HomeHeader.jsx";
import "./Home.css";
import Footer from "../../components/Footer/Footer.jsx";
import GetStartedButton from "../../components/GetStartedButton/GetStartedButton.jsx";
import FunctionContainer from "../../components/FunctionContainer/FunctionContainer.jsx";

function Home() {
  return (
    <div className="home-container">
      <HomeHeader />
      <div className="background-image">
        <div className="overlay-content">
          <h1 className="welcome-text">Welcome to</h1>
          <h1 className="mapmyforest-text">MapMyForest</h1>
          <p className="description-text">
            Efficiently enumerate, track, and analyze tree data using aerial
            imagery.
          </p>
          <GetStartedButton />
        </div>
        <div className="youtube-embed">
          <div className="youtube-title">Demo Video</div>
          <iframe
            height="100%"
            src="https://www.youtube-nocookie.com/embed/O-qOTTTI-BU?si=mkLACBdA1A7_sQOG"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        </div>
      </div>
      <FunctionContainer />

      <Footer />
    </div>
  );
}

export default Home;
