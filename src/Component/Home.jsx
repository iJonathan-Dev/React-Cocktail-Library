import React, { useState } from "react";

export const Home = () => {
  const [searchValue, setSearchValue] = useState("");
  const [cocktailList, setCocktailList] = useState(null);
  const [placeholder, setPlaceholder] = useState(null);

  const doSearch = (searchValue) => {
    fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + searchValue)
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log(data.drinks);
        setCocktailList(data.drinks);
        setPlaceholder(searchValue);
        setSearchValue("");
      });
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
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;
