import { useCallback, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import DragNDrop from './DragNDrop';

const NewSaleImageSelect = ({
    setImageAdded,
    files,
    setFiles,
    setProductType,
    imageAdded,
}) => {
    const [previews, setPreviews] = useState([]);
    const [images, setImages] = useState([]);
    const user = useSelector((s) => s.user);

    const onDrop = useCallback(
        (acceptedFiles) => {
            // Loop through accepted files
            acceptedFiles.map((file) => {
                // Initialize FileReader browser API
                const reader = new FileReader();
                // onload callback gets called after the reader reads the file data
                reader.onload = function (e) {
                    // add the image into the state. Since FileReader reading process is asynchronous, its better to get the latest snapshot state (i.e., prevState) and update it.
                    setImages((prevState) => [
                        ...prevState,
                        { id: file.path, src: e.target.result },
                    ]);
                };
                // Read the file as Data URL (since we accept only images)
                setFiles((prev) => [...prev, file]);
                reader.readAsDataURL(file);
                return file;
            });
        },
        [setFiles]
    );

    const handleFile = (e) => {
        const l = Array.from(e.target.files);
        setFiles((prevFiles) => [...prevFiles, ...l]);
        setPreviews([...l.map((f) => URL.createObjectURL(f))]);
        e.target.value = null;
    };

    const handleClick = (i) => {
        setFiles([]);
        setPreviews([]);
        setImageAdded(false);
    };

    const handleTypeData = (visionData) => {
        const wordsArray = visionData
            .map((data) => data.name.toLowerCase().split(' '))
            .flatMap((v) => v);

        for (let word of wordsArray) {
            if (word === 'console') {
                return 'console';
            } else if (word === 'controller') {
                return 'accesory';
            }
        }
        return 'videogame';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (files.length < 1) return;
        // const fd = new FormData();
        // fd.append('image', files[0]);
        // const ret = await fetch('http://localhost:8080/sell/vision/', {
        //     method: 'POST',
        //     headers: {
        //         Authorization: 'Bearer ' + user.token,
        //     },
        //     body: fd,
        // });
        if (true) {
            // const response = await ret.json();
            // setProductType(handleTypeData(response));
            setImageAdded(true);
        }
    };

    return (
        <div className="image-select">
            <div className="add-first-image">
                {previews.map((preview, i) => (
                    <div
                        className={!imageAdded ? 'image' : 'image visioned'}
                        style={{ backgroundImage: `url(${preview})` }}
                        onClick={() => handleClick(i)}
                        key={i}
                    />
                ))}
                {!imageAdded && (
                    <>
                        <label>
                            <div className="image add" />
                            <input type="file" onChange={handleFile} />
                        </label>
                        <h3>
                            <FormattedMessage id="sale.imgDescription" />
                        </h3>
                        <button
                            className="agregar-imagen yellow-button"
                            onClick={handleSubmit}
                        >
                            Agregar Imagen
                        </button>
                    </>
                )}
            </div>
            <DragNDrop onDrop={onDrop} accept={'image/*'} images={images} />
        </div>
    );
};

export default NewSaleImageSelect;
