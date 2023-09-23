import { db } from "./config/firebaseinit";
import { collection, addDoc, getDocs } from "firebase/firestore";

import "./App.css";
import { useEffect, useRef, useState } from "react";
import CategoriesComponent from "./Components/CategoriesComponent";
function App() {
  let categoryInput = useRef("");
  const [categories, setCategories] = useState([]);

  useEffect(()=>{
    
    async function getData(){
      let categoryData = [];
      const querySnapshot = await getDocs(collection(db, "category"));
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        categoryData.push(doc.data());
      });
      setCategories(categoryData);
    }
    getData();
  },[])
  function handleClick(){
    const formElement = document.getElementsByClassName("categoryForm")[0];
    if(formElement.classList.contains("visibilityHidden")){
      formElement.classList.remove("visibilityHidden");
      formElement.classList.add("categoryForm");
      return;
    }
    if(formElement.classList.contains("categoryForm")){
      formElement.classList.add("visibilityHidden");
    }
  }

  async function handleFormSubmit(e){
    e.preventDefault();
    const categoryObject = {
      categoryName: categoryInput.current.value,
      createdAt: Date.now()
    }
    // Add a new document with a generated id.
    const docRef = await addDoc(collection(db, "category"), categoryObject);
    categoryInput.current.value = "";
    console.log("Document written with ID: ", docRef.id);
  }
  return (
    <>
      <div onClick={handleClick} className="categoryBtnContainer">
        <div>
          Create Category
        </div>
      </div>

      <div className="categoryForm visibilityHidden">
          <form onSubmit={handleFormSubmit}>
            <div>
              <input ref={categoryInput} type="text"  placeholder="Enter category name" required/>
            </div>
            <div>
              <button type="submit">Add Category</button>
            </div>
          </form>
      </div>

      <div id="availableCategories">
          <h2>Available Categories</h2>
          <CategoriesComponent categories={categories} />
      </div>
    </>
  );
}

export default App;
