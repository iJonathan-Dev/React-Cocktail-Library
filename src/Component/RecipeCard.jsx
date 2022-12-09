import React from "react";

const RecipeCard = ({ data, openRecipeModal }) => {
  return (
    <div key={data.idDrink} className="recipe-card">
      <div className="card-img-section">
        <img className="recipe-card-drink-thumb" src={data.strDrinkThumb} alt={data.strDrink} />
      </div>
      <div className="card-content-section">
        <div className="card-title">{data.strDrink}</div>
        <a href="#" onClick={(e) => openRecipeModal(e, data.idDrink)}>
          View Recipe
        </a>
      </div>
    </div>
  );
};

export default RecipeCard;
