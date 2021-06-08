import React from "react"
import { useDropzone } from "react-dropzone"
import ImageList from "./ImageList"

const DragNDrop = ({onDrop, accept, images}) => {
     // Initializing useDropzone hooks with options
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxFiles:5
  });

  /* 
    useDropzone hooks exposes two functions called getRootProps and getInputProps
    and also exposes isDragActive boolean
  */
 

  return (
    <div {...getRootProps()} className='drag-drop-zone'>
      <input className="dropzone-input" {...getInputProps()} />
      <div className="text-center">
        {isDragActive ? (
          <p className="dropzone-content">Release to drop the files here</p>
        ) : (
          <p className="dropzone-content">
            Drag 'n' drop some files here, or click to select files
          </p>
        )}

        
            <ImageList images={images}/>
      </div>
    </div>
  );
}

export default DragNDrop