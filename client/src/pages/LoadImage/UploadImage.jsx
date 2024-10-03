/* eslint-disable no-unused-vars */
import { useState } from "react"
import { MdOutlineFileUpload  } from 'react-icons/md';
import ReactMarkdown from "react-markdown";
import './upload.css'

function UploadImage() {
  const [singleImage,setSingleImage] = useState(null);
  const [selectedName, setSelectedName] = useState("");
  const [ImageBase64,setImageBase64] = useState('');
  const [text, setText] = useState("# Hello world, we are good");

  const handleImage = async(e) => {
    const file = e.target.files[0];
    setSingleImage(file);
    setSelectedName(file.name)
    const base64 = await convertToBase64(file);
    setImageBase64(base64);
  }

  const handleSubmit = async() => {
        console.log(ImageBase64)
  }

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
            <MdOutlineFileUpload  size={50} />
            <h3 className="dynamic-message">{ selectedName || "Browse any file here" }</h3>
            <p>Maximun file size 10mb</p>
            <input
              type="file"
              className="default-file-input"
              onChange={handleImage}
            />
            </div>
            </div>
            <div className="uploadImageSectionFileSubmitButton">
              <button className="uploadImageSectionSubmitButton" onClick={handleSubmit}>Submit</button>
            </div>
            <div className="UploadSection_Analysis_Output_MarkDown">
              <ReactMarkdown>
                {text}
              </ReactMarkdown>
            </div>
        </section>
    </>
  )
}

export default UploadImage