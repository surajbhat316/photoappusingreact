import React, { useEffect, useRef, useState } from 'react';
import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import "./CategoryPhotos.css"
import { db } from '../../config/firebaseinit';
import PhotoUpdateComponent from '../PhotoUpdateComponent/PhotoUpdateComponent';

export default function CategoryPhotos(props) {


  let fileReference = useRef();
  let descriptionReference = useRef();
  const {setImageAddedToAlbumMessage,selectedCategory, setDisplayPhotos} = props;
  const [photos, setPhotos] = useState([]);
  const [photoUpdate ,setPhotoUpdate] = useState({status: false, photo: ""});
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() =>{
    console.log("Enters");
    async function getData(){
        let photosData = [];
        const q = query(collection(db, "photos"), where("category", "==", selectedCategory));
        // const querySnapshot = await getDocs(collection(db, "photos"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          // console.log(doc.id, " => ", doc.data());
          photosData.push({id: doc.id ,...doc.data()});
        });
        setPhotos(photosData);
        console.log(photosData);
      }
      getData();
  }, [selectedCategory, photoUpdate])

  function handleClick(){
    setDisplayPhotos(false);
  }

  function handleUploadBtnClick(){
    const photoUploadForm = document.getElementById("photoUploadForm");
    if(photoUploadForm.classList.contains("visibilityHidden")){
        photoUploadForm.classList.remove("visibilityHidden");
        return;
    }
    else{
        photoUploadForm.classList.add("visibilityHidden");
    }
  }

  function handleFormSubmit(e){
    e.preventDefault();
    console.log("Enters Form Upload Component");
    let file = fileReference.current.files[0];
    console.log("filesize ",file.size);

    if(file.size > 10001){
        console.log("File size larger");
        setErrorMessage("File size should be less than 10KB");
        return;
    }
    var reader = new FileReader();
    reader.onloadend = function() {
        // console.log('RESULT', reader.result);
        uploadEncodedPhoto(reader.result);

    }
    reader.readAsDataURL(file);
  }


  async function handleDelete(id){
    let remainingPhotos = photos.filter((photo) => photo.id !== id);
    await deleteDoc(doc(db, "photos", id));
    setPhotos(remainingPhotos);
  }

  function handleUpdate(photo){
    console.log(photo);
    setPhotoUpdate({
        status: true,
        photo: photo
    });
  }

  async function uploadEncodedPhoto(base64){
    console.log(base64);
    const photosObject = {
        description: descriptionReference.current.value,
        category: selectedCategory,
        encoding: base64,
        createdAt: Date.now()
    }

    const docRef = await addDoc(collection(db, "photos"), photosObject);
    console.log("Document written with ID: ", docRef.id);

    // Added start
    setDisplayPhotos(false);
    setImageAddedToAlbumMessage("Image added to album "+ selectedCategory);
    // Added End
  }
  return (
    <div>
        {photoUpdate.status=== false ?
        <div>
            <div className='header'>
                <button onClick={handleClick}>Back</button>
                <div className="uploadBtnContainer" onClick={handleUploadBtnClick}>
                    <div>
                        Upload a Photo
                    </div>
                </div>
                <form id='photoUploadForm' onSubmit={handleFormSubmit} className='visibilityHidden'>
                    <div>
                        <input ref={descriptionReference} type='text' placeholder='Enter Description' required / >
                    </div>
                    <div>
                        <input type='file' ref={fileReference}/>
                        {errorMessage?<p>{errorMessage}</p>:<p></p>}
                    </div>
                    <div>
                        <button type='submit'>Upload</button>
                    </div>
                </form>
            </div>

            <h2 style={{textAlign: "center", fontFamily: "Cambria, Cochin, Georgia, Times, 'Times New Roman', serif"}}>Photos for category {selectedCategory} </h2>

            <div id='photos'>
                {photos.map((photo) => {
                    return (
                        <div className='photo' id={photo.id}>
                            <div className='deleteBtn displayNone'>
                                <button onClick={() => handleDelete(photo.id)}>Delete</button>
                                <button onClick={() => handleUpdate(photo)}>Edit</button>
                            </div>
                            <img src={photo.encoding}  alt={photo.description}/>
                            <p>{photo.description}</p>
                        </div>
                    )
                })}
            </div>
        </div>:
        <div>
            <PhotoUpdateComponent photoUpdate={photoUpdate} setPhotoUpdate={setPhotoUpdate} />
        </div>}
    </div>
  )
}
