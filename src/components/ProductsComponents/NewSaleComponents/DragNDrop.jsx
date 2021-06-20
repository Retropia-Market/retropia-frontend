import React from 'react';
import { useDropzone } from 'react-dropzone';
import { FormattedMessage } from 'react-intl';
import ImageList from './ImageList';

const DragNDrop = ({ onDrop, accept, images }) => {
    // Initializing useDropzone hooks with options
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept,
        maxFiles: 5,
    });

    /* 
    useDropzone hooks exposes two functions called getRootProps and getInputProps
    and also exposes isDragActive boolean
  */

    return (
        <div {...getRootProps()} className="drag-drop-zone">
            <input className="dropzone-input" {...getInputProps()} />
            <div className="text-center">
                {isDragActive ? (
                    <p className="dropzone-content">
                        <FormattedMessage id="sale.drop" />
                    </p>
                ) : (
                    <p className="dropzone-content">
                        <FormattedMessage id="sale.drag" />
                    </p>
                )}

                <ImageList images={images} />
            </div>
        </div>
    );
};

export default DragNDrop;
