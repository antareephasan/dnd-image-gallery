import React, { useEffect, useState } from 'react'
import UploadGallery from './components/UploadGallery'
import './App.css'
import { images } from './constants/index'; //Getting all images from constants

const App = () => {
  const [items, setItems] = useState(images); //stores all the initial images
  const [selectedImages, setSelectedImages] = useState([]); //stores all the selected images
  const [isChecked, setIsChecked] = useState(false); //For the big CheckBox on top also refered as AlCheckBox


  //Removing selected Images from the gallery when Delete file is clicked 
  const handleDelete = () => {
    setItems(items.filter((item) => !selectedImages.includes(item.id)));
    setSelectedImages([])
  }

  //Removing all selected images if allCheckBox is unChecked
  const handleAllCheckboxChange = () => {
    if (isChecked) {
      setSelectedImages([]);
    }
    setIsChecked((prev) => !prev);
  };

  //Adding or removing image id from selectedImage while a checkbox is clicked on an image
  const handleCheckBoxChange = (id) => {
    setSelectedImages((prevSelectedImages) => {
      if (prevSelectedImages.includes(id)) {
        return prevSelectedImages.filter((item) => item !== id);
      } else {
        return [...prevSelectedImages, id];
      }
    });
  };

  //Showing the all checkBox on top if one or more image is selected
  useEffect(() => {
    if (selectedImages.length > 0) {
      setIsChecked(true);
    }
  }, [selectedImages])

  return (
    <div className='container'>
      {/* TopBar  */}
      <div className='top-bar'>

        {/* Dynamic Header */}
        <div className='header-container'>
          {/* If one or more image is selected show the Big AllCheckBox on Top */}
          {selectedImages.length > 0 && (
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleAllCheckboxChange}
              className='custom-checkbox'
            />
          )}
          <h1 className='header'>
            {selectedImages.length > 0 ?
              `${selectedImages.length} ${selectedImages.length === 1 ? "File" : "Files"} selected`
              : "Gallery"}
          </h1>
        </div>

        {/* Delete button */}
        {selectedImages.length > 0 && (
          <button onClick={handleDelete} className='delete-button'>
            {`Delete ${selectedImages.length === 1 ? "file" : "files"}`}
          </button>
        )}

      </div>

      {/* Gallery Container */}
      <div className='gallery-container'>
        <UploadGallery
          items={items}
          setItems={setItems}
          images={images}
          selectedImages={selectedImages}
          setSelectedImages={setSelectedImages}
          handleCheckBoxChange={handleCheckBoxChange}
        />
      </div>
    </div>
  )
}

export default App