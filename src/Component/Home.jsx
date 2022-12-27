import React, { useState } from "react";
import RecipeCard from "./RecipeCard";
import RecipeModal from "./RecipeModal";
import "./Home.scss";

const Home = () => {
  //input search state
  const [searchValue, setSearchValue] = useState("");

  //cocktail list search result state
  const [cocktailList, setCocktailList] = useState(null);

  //Placeholder text for search result state
  const [placeholder, setPlaceholder] = useState(null);

  //Modal box state
  const [viewRecipe, setViewRecipe] = useState(false);

  //Reciped ID state
  const [recipeID, setRecipeID] = useState("");

  //fetch data from API
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

  //open Modal box
  const openRecipeModal = (e, id) => {
    e.preventDefault();
    setViewRecipe(true);
    setRecipeID(id);
  };

  //close Modal box
  const handleClose = () => {
    setViewRecipe(false);
  };

  return (
    <div>
      <div className="search-container">
        <form onSubmit={(e) => doSearch(e, searchValue)}>
          <label htmlFor="search-box">Search Cocktail Recipe</label>
          <input type="text" id="search-box" placeholder="Type cocktail name..." value={searchValue} onChange={(e) => setSearchValue(e.target.value)} required />
          <button id="search-button" type="submit">
            Search
          </button>
        </form>
        {placeholder && cocktailList && <p className="placeholder">Search result for '{placeholder}'</p>}
        {placeholder && !cocktailList && <p className="placeholder">No result for '{placeholder}'</p>}
      </div>
      <br />
      <div className="search-result-container">{cocktailList && cocktailList.map((data) => <RecipeCard data={data} openRecipeModal={(e) => openRecipeModal(e, data.idDrink)} />)}</div>
      {viewRecipe && <RecipeModal recipeId={recipeID} handleClose={() => handleClose()} />}
    </div>
  );
};

export default Home;
