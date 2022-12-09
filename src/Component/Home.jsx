import React, { useState } from "react";
import RecipeCard from "./RecipeCard";
import RecipeModal from "./RecipeModal";
import "./Home.scss";

const Home = () => {
  const [searchValue, setSearchValue] = useState("");
  const [cocktailList, setCocktailList] = useState(null);
  const [placeholder, setPlaceholder] = useState(null);
  const [viewRecipe, setViewRecipe] = useState(false);
  const [recipeID, setRecipeID] = useState("");

  const doSearch = (e, searchValue) => {
    e.preventDefault();
    fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + searchValue)
      .then((response) => {
        // console.log(response);
        return response.json();
      })
      .then((data) => {
        // console.table(data.drinks);
        setCocktailList(data.drinks);
        setPlaceholder(searchValue);
        setSearchValue("");
        setViewRecipe(false);
      });
  };

  const openRecipeModal = (e, id) => {
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
        <form onSubmit={(e) => doSearch(e, searchValue)}>
          <label htmlFor="search-box">Search Cocktail Recipe</label>
          <input type="text" id="search-box" placeholder="Type cocktail name..." value={searchValue} onChange={(e) => setSearchValue(e.target.value)} required />
          <button id="search-button" type="" submit>
            Search
          </button>
        </form>
        {placeholder && cocktailList && <p className="placeholder">Search result for '{placeholder}'</p>}
        {!cocktailList && <p className="placeholder">No result for '{placeholder}'</p>}
      </div>
      <br />
      <div className="search-result-container">{cocktailList && cocktailList.map((data) => <RecipeCard data={data} openRecipeModal={(e) => openRecipeModal(e, data.idDrink)} />)}</div>
      {viewRecipe && <RecipeModal recipeId={recipeID} handleClose={() => handleClose()} />}
    </div>
  );
};

export default Home;
