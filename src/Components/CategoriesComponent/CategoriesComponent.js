import React from 'react'
import "./CategoriesComponent.css";
export default function CategoriesComponent(props) {
  let {categories, getCategoryName} = props;
  return (
    <div className="categoriesContainer">
        {categories.map((elem,i) =>{
            return (
              <div className="category" key={i} onClick={() => getCategoryName(elem.categoryName)} >
                {elem.categoryName}
              </div> 
            )
        })}
    </div>
  )
}
