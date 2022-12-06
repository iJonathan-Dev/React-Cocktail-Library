import React, { useState, useEffect } from "react";

const RecipeModal = ({ handleClose, ...props }) => {
  const recipeID = props.recipeId;
  const [recipe, setRecipe] = useState("");

  useEffect(() => {
    fetch("https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + recipeID)
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        console.table(data.drinks);
        setRecipe(data.drinks);
      });
  }, [recipeID]);

  return (
    <div className="recipe-modal">
      {recipe && <h2 className="recipe-title">{recipe[0].strDrink}</h2>}
      <button onClick={handleClose}>Close</button>
    </div>
  );
};

export default RecipeModal;
