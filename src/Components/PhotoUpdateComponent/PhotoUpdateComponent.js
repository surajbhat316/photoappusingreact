import React, { useRef } from 'react'
import "./PhotoUpdateComponent.css"
import { db } from '../../config/firebaseinit';
import { doc, updateDoc } from "firebase/firestore";

export default function PhotoUpdateComponent(props) {
    const {photoUpdate,setPhotoUpdate} = props;
    let photo = photoUpdate.photo;

    const updatedDescriptionRef = useRef();
    function handleClick(){
        setPhotoUpdate({
            status: false,
            photo: ""
        });
    }

    async function handleUpdateFormSubmit(e, photoId){
        e.preventDefault();
        console.log("Enters update method ", photoId);
        console.log(updatedDescriptionRef.current.value);

        const photosRef = doc(db, "photos", photoId);
        await updateDoc(photosRef, {
            description: updatedDescriptionRef.current.value
        });
        setPhotoUpdate({
            status: false,
            photo: ""
        });
    }
  return (
    <div id='mainContainer'>
        <div>
            <button onClick={handleClick}>Back</button>
        </div>
        <div id='image'>
            <img src={photo.encoding}  alt={photo.description}/>
        </div>

        <div id='updateForm'>
            <form onSubmit={(e) => handleUpdateFormSubmit(e, photo.id)}>
                <input ref={updatedDescriptionRef} type='text' placeholder='Enter new Description' required />
                <button type='submit'>Update</button>
            </form>
        </div>
    </div>
  )
}
