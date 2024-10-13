/* eslint-disable no-unused-vars */
import { useState } from "react";
import { MdOutlineFileUpload } from "react-icons/md";
import ReactMarkdown from "react-markdown";
import "./upload.css";

function UploadImage() {
  const [selectedName, setSelectedName] = useState("");
  const [ImageBase64, setImageBase64] = useState("");
  const [text, setText] = useState("# Hello world, we are good");
  const [selectedImages, setSelectedImages] = useState([]); // State for multiple images
  const [responseImages, setResponseImages] = useState([]); // For storing response images
  const [responseCounts, setResponseCounts] = useState([]);
  const [detectionConf, setDetectionConf] = useState(0.15);
  const [detectionIOU, setDetectionIOU] = useState(0.5);

  const handleImages = async (e) => {
    const files = Array.from(e.target.files); 
    const base64Images = await Promise.all(
      files.map((file) => convertToBase64(file).then((base64) => base64.split(",")[1]))
    );
    
    setSelectedImages(base64Images); 
    setSelectedName(`${files.length} file(s) selected`); 
  };

  const handleSubmit = async () => {
    setResponseImages([]);
    setResponseCounts([]);
    console.log(ImageBase64);
    console.log(detectionConf, detectionIOU);
    const endpoint = "http://localhost:5000/enumerate";
    try {
      const responseData = await Promise.all(
        selectedImages.map(async (imageBase64) => {
          let formData = new FormData();
          formData.append("imageb64", imageBase64);
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

          return response.json();
        })
      );

      // Extract response images and tree counts
      const newResponseImages = responseData.map((res) => res["annotated"]);
      const newResponseCounts = responseData.map((res) => res["count"]);

      setResponseImages(newResponseImages);
      setResponseCounts(newResponseCounts);
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
              onChange={handleImages}
              multiple
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
        {responseCounts.length > 0 && responseImages.length > 0 && (
          <div className="UploadSection_Analysis_Output_MarkDown">
            <ReactMarkdown>
              {`## **Tree Enumeration Results:**`}
            </ReactMarkdown>
            <div className="upload-section-analysis-output-images">
              {selectedImages.map((image, index) => (
                <div key={index}>
                  <ReactMarkdown>
                    {`### Image ${index + 1}: **${responseCounts[index]}** trees found`}
                  </ReactMarkdown>
                  <img
                    src={"data:image/jpg;base64," + image}
                    alt={`uploaded-image-${index}`}
                  />
                  <img
                    src={"data:image/jpg;base64," + responseImages[index]}
                    alt={`annotated-image-${index}`}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  );
}

export default UploadImage;
