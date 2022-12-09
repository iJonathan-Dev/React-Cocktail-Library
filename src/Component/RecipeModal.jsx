import { render } from "@testing-library/react";
import React, { useState, useEffect } from "react";

const RecipeModal = ({ handleClose, ...props }) => {
  const recipeID = props.recipeId;
  const [recipe, setRecipe] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + recipeID)
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        console.table(data.drinks[0]);
        setIsLoading(false);
        setRecipe(data.drinks[0]);
      });
  }, [recipeID]);

  const ingredientsList = () => {
    let list = [];
    for (let i = 1; i < 16; i++) {
      if (recipe[`strIngredient${i}`] !== null) {
        list.push(
          <li>
            {recipe[`strMeasure${i}`]} {recipe[`strIngredient${i}`]}
          </li>
        );
      }
    }
    console.log(list);
    return list;
  };

  return (
    <div className="recipe-modal">
      {isLoading && <p>Loading...</p>}
      {recipe && (
        <>
          <h2 className="recipe-name">{recipe.strDrink}</h2>
          <div className="container">
            <img className="drink-thumb" src={recipe.strDrinkThumb} />
            <h3 className="container-heading">Ingridients</h3>
            <ul className="ingridients-list">{ingredientsList()}</ul>
            <h3 className="container-heading">Instructions</h3>
            <p className="recipe-instructions">{recipe.strInstructions}</p>
          </div>
        </>
      )}
      <img className="btn-close" src="https://img.icons8.com/color/48/null/close-window.png" onClick={handleClose} />
    </div>
  );
};

export default RecipeModal;
