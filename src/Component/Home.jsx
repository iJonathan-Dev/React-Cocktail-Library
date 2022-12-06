import React, { useState } from "react";
import RecipeModal from "./RecipeModal";

const Home = () => {
  const [searchValue, setSearchValue] = useState("");
  const [cocktailList, setCocktailList] = useState(null);
  const [placeholder, setPlaceholder] = useState(null);
  const [viewRecipe, setViewRecipe] = useState(false);
  const [recipeID, setRecipeID] = useState("");

  const doSearch = (searchValue) => {
    fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + searchValue)
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        console.table(data.drinks);
        setCocktailList(data.drinks);
        setPlaceholder(searchValue);
        setSearchValue("");
      });
  };

  const handleClick = (e, id) => {
    e.preventDefault();

    setViewRecipe(true);
    setRecipeID(id);
  };

  const handleClose = () => {
    setViewRecipe(false);
  };

  return (
    <div>
      <div className="search-container">
        <label htmlFor="search-box">Search</label>
        <input type="text" id="search-box" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} required />
        <button id="search-button" onClick={() => doSearch(searchValue)}>
          Search
        </button>
        {placeholder && <p>Search result for {placeholder}</p>}
        <br />

        {cocktailList &&
          cocktailList.map((data) => (
            <div key={data.idDrink}>
              <p>{data.strDrink}</p>
              <a href="#" onClick={(e) => handleClick(e, data.idDrink)}>
                View Recipe
              </a>
            </div>
          ))}

        {viewRecipe && <RecipeModal recipeId={recipeID} handleClose={() => handleClose()} />}
      </div>
    </div>
  );
};

export default Home;
