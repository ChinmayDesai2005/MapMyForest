/* eslint-disable no-unused-vars */
import { useState,useEffect } from "react";
import { MdOutlineFileUpload,MdLock } from "react-icons/md";
import ReactMarkdown from "react-markdown";
import "./upload.css";
import { toast } from "react-toastify";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";

function UploadImage() {
  const [selectedName, setSelectedName] = useState("");
  const [ImageBase64, setImageBase64] = useState("");
  const [text, setText] = useState("# Hello world, we are good");
  const [selectedImages, setSelectedImages] = useState([]); // State for multiple images
  const [responseObjects, setResponseObjects] = useState([]); // {"annotated": base64, "count": int}
  const [detectionConf, setDetectionConf] = useState(0.15);
  const [detectionIOU, setDetectionIOU] = useState(0.5);
  const [responseStatus, setResponseStatus] = useState("None");
  const [currentStatus, setCurrentStatus] = useState("None");

  useEffect(() => {
    const project = JSON.parse(localStorage.getItem("selectedProject"));
    if (project && project.currentStatus) {
      setCurrentStatus(project.currentStatus);
    }
  }, []);

  const handleImages = async (e) => {
    setResponseStatus("None");
    const files = Array.from(e.target.files);
    const base64Images = await Promise.all(
      files.map((file) =>
        convertToBase64(file).then((base64) => base64.split(",")[1])
      )
    );

    setSelectedImages(base64Images);
    setSelectedName(`${files.length} file(s) selected`);
  };

  const saveDataToProject = async (responseData) => {
    const config = {
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken")
        )}`,
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    console.log(responseData);
    const toSend = {
      project_id: JSON.parse(localStorage.getItem("selectedProject"))._id,
      annotated_images: JSON.stringify(responseData),
    };
    try {
      // const response = await fetch(
      //   "http://localhost:5000/api/v1/project/addannotatedimages",
      //   {
      //     method: "POST",
      //     body: JSON.stringify(toSend),
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   }
      // );

      const response = axios.post(
        "http://localhost:5000/api/v1/project/addannotatedimages",
        toSend,
        config
      );

      // const responseData = await response.json();
    } catch (error) {
      console.error(error.message);
      toast.error("Error saving to DB. Please try again later.");
    }
  };

  const handleSubmit = async () => {
    setResponseObjects([]);
    setResponseStatus("Wait");
    // console.log(detectionConf, detectionIOU);
    const endpoint = "http://localhost:5000/enumerate";
    try {
      let formData = new FormData();
      formData.append("imagesb64", JSON.stringify(selectedImages));
      formData.append("confidence", detectionConf);
      formData.append("iou", detectionIOU);

      const response = await fetch(endpoint, {
        method: "POST",
        body: formData,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
        },
      });

      const responseData = await response.json();
      // Extract response images and tree counts
      // const newResponseImages = responseData.map((res) => res["annotated"]);
      // const newResponseCounts = responseData.map((res) => res["count"]);

      setResponseObjects(responseData);
      // setResponseCounts(newResponseCounts);
      setResponseStatus("Done");
      saveDataToProject(responseData);
    } catch (error) {
      setResponseStatus("None");
      console.error(error.message);
      toast.error("An error has occurred. Please try again later.");
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  return (
    <>
      <section className="uploadImageSection">
        {currentStatus === "In Progress" && (
          <div className="lock-overlay">
            <MdLock size={100} />
            <h2>Another process is currently running</h2>
          </div>
        )}
        <div className="uploadImageSectionParent">
          <div className="uploadImageSectionFileUpload">
            <MdOutlineFileUpload size={50} />
            <h3 className="dynamic-message">
              {selectedName || "Browse any file here"}
            </h3>
            <p>Maximum file size 10MB</p>
            <input
              type="file"
              className="default-file-input"
              onChange={handleImages}
              multiple
              disabled={currentStatus === "In Progress"}
            />
          </div>
        </div>
        <div className="uploadImageSectionFileSubmitButton">
          <button
            className="uploadImageSectionSubmitButton"
            onClick={handleSubmit}
            disabled={currentStatus === "In Progress"}
          >
            Submit
          </button>
        </div>
      </section>
    </>
  );
}

export default UploadImage;
