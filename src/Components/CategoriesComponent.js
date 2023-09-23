import React from 'react'
import "./CategoriesComponent.css";
export default function CategoriesComponent(props) {
  let {categories} = props;
  console.log("categories",categories);

  return (
    <div className="categoriesContainer">
        {categories.map((elem) =>{
            return (
              <>
                <div className="category">
                  {elem.categoryName}
                </div> 
              </>
            )
        })}
    </div>
  )
}
