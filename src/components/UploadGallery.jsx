import React, { useState } from "react";
import {
  DndContext,
  MouseSensor,
  DragOverlay,
  useSensor,
  useSensors,
  closestCenter
} from "@dnd-kit/core";
import { arrayMove, rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";

import { Grid } from "./Grid";
import { SortablePhoto } from "./SortablePhoto";
import { Photo } from "./Photo";

const UploadGallery = ({ items, setItems, selectedImages, setSelectedImages, handleCheckBoxChange }) => {
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10, // Enable sort function when dragging 10px   💡 here!!!
    },
  })
  const [activeId, setActiveId] = useState(null);
  const sensors = useSensors(mouseSensor);

  function handleDragStart(event) {
    setActiveId(event.active.id);
  }

  function handleDragEnd(event) {
    const { active, over } = event;

    // not dropping in the same element
    if (active?.id !== over?.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active?.id);
        const newIndex = items.findIndex((item) => item.id === over?.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }

    setActiveId(null);
  }

  function handleDragCancel() {
    setActiveId(null);
  }


  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <SortableContext items={items} strategy={rectSortingStrategy}>
          <Grid columns={5}>
            {items.map((image, index) => (
              <SortablePhoto
                key={image.id}
                url={image.url}
                id={image.id}
                index={index}
                selectedImages={selectedImages}
                setSelectedImages={setSelectedImages}
                handleCheckBoxChange={handleCheckBoxChange}
              />
            ))}
            <div className="upload-image-container">
              <div className="upload-image">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
              </div>

              <span>Add Images</span>
            </div>

          </Grid>
        </SortableContext>

        <DragOverlay adjustScale={true}>
          {activeId ? (
            <Photo
              url={items.find((item) => item.id === activeId)?.url}
              index={items.findIndex(({ id }) => id === activeId)}
              selectedImages={selectedImages}
              setSelectedImages={setSelectedImages}
            />
          ) : null}
        </DragOverlay>
      </DndContext>
    </>
  );
};

export default UploadGallery;