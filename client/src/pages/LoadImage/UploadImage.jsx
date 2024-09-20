import { useState } from "react"
import {Button} from "react-bootstrap"
import { MdOutlineFileUpload  } from 'react-icons/md';
import './upload.css'

function UploadImage() {
  const [singleImage,setSingleImage] = useState(null);
  const [selectedName, setSelectedName] = useState("");

  const handleImage = async(e) => {
    const file = e.target.files[0];
    setSingleImage(file);
    setSelectedName(file.name)
  }

  const handleSubmit = async() => {
        console.log(singleImage)
  }

  return (
    <>
        <section className="uploadImageSection">
            <div className="parent">
            <div className="file-upload">
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
            <Button onClick={handleSubmit}>Submit</Button>
        </section>
    </>
  )
}

export default UploadImage