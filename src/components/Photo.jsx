import React, { forwardRef } from "react";

export const Photo = forwardRef(
  ({ url, id, selectedImages, setSelectedImages, handleCheckBoxChange, index, faded, style, ...props }, ref) => {
    const inlineStyles = {
      opacity: faded ? "0.2" : "1",
      transformOrigin: "0 0",
      height: index === 0 ? 400 : 180, //Making the first image bigger than others
      width: index === 0 ? 400 : 180,
      gridRowStart: index === 0 ? "span 2" : null,
      gridColumnStart: index === 0 ? "span 2" : null,
      backgroundImage: `url("${url}")`,
      backgroundSize: "cover",
      backgroundPosition: 'center',
      border: "1px dotted rgb(184, 184, 180)",
      borderRadius: "10px",
      ...style,
    };




    return (
      <>
        <div ref={ref} style={inlineStyles} {...props} className="image-container">
          
          {/* Showing Selected checkbox on image without hovering */}
          {selectedImages.includes(id) &&
            <input
              type="checkbox"
              checked={selectedImages.includes(id)}
              onChange={() => handleCheckBoxChange(id)}
              className='custom-checkbox-for-all'
            />
          }
          {/* The overlay class is used for creating overlay on image hover */}
          <div className="overlay">
            {/* Show Checkbox on image when the hovered*/}
            <input
              type="checkbox"
              checked={selectedImages.includes(id)} //Checking if the id of the image is in selectedImages array
              onChange={() => handleCheckBoxChange(id)} //HandleCheckBox function for adding or removing images id from selectedImages
              className='custom-checkbox-for-all'
            />
          </div>
        </div>
      </>


    );
  }
);


