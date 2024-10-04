/* eslint-disable no-unused-vars */
import { useState } from "react";
import { MdOutlineFileUpload } from "react-icons/md";
import ReactMarkdown from "react-markdown";
import "./upload.css";

function UploadImage() {
  const [singleImage, setSingleImage] = useState(null);
  const [selectedName, setSelectedName] = useState("");
  const [ImageBase64, setImageBase64] = useState("");
  const [text, setText] = useState("# Hello world, we are good");
  const [responseImage, setresponseImage] = useState("");
  const [responseCount, setresponseCount] = useState("");
  const [detectionConf, setDetectionConf] = useState(0.15);
  const [detectionIOU, setDetectionIOU] = useState(0.5);

  const handleImage = async (e) => {
    const file = e.target.files[0];
    setSingleImage(file);
    setSelectedName(file.name);
    const base64 = await convertToBase64(file);
    setImageBase64(base64.split(",")[1]);
    setresponseCount("");
    setresponseImage("");
  };

  const handleSubmit = async () => {
    setresponseCount("");
    setresponseImage("");
    console.log(ImageBase64);
    console.log(detectionConf, detectionIOU);
    const endpoint = "http://localhost:5000/enumerate";
    try {
      let formData = new FormData();
      formData.append("imageb64", ImageBase64);
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
      const json = await response.json();
      console.log(json);
      setresponseImage(json["annotated"]);
      setresponseCount(json["count"]);
    } catch (error) {
      console.error(error.message);
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
              onChange={handleImage}
            />
          </div>
        </div>
        <div className="upload-section-detection-sliders">
          <p>Confidence: {detectionConf}</p>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            defaultValue="0.15"
            className="slider"
            id="detection-conf"
            onChange={(e) => setDetectionConf(e.target.value)}
          />
          <br />
          <p>Intersection over Union: {detectionIOU}</p>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            defaultValue="0.5"
            className="slider"
            id="detection-iou"
            onChange={(e) => setDetectionIOU(e.target.value)}
          />
        </div>
        <div className="uploadImageSectionFileSubmitButton">
          <button
            className="uploadImageSectionSubmitButton"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
        {responseCount && responseImage && (
          <div className="UploadSection_Analysis_Output_MarkDown">
            <ReactMarkdown>
              {`## **Tree Enumeration Results:**\n#### Total trees found: **${responseCount}** \n #### Output Image: \n`}
            </ReactMarkdown>
            <div className="upload-section-analysis-output-images">
              <img
                src={"data:image/jpg;base64," + ImageBase64}
                alt="annotated-image"
              />
              <img
                src={"data:image/jpg;base64," + responseImage}
                alt="annotated-image"
              />
            </div>
          </div>
        )}
      </section>
    </>
  );
}

export default UploadImage;
