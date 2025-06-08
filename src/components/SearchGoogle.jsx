import React from "react";
import { useState } from "react";
import searchIcon from "./../assets/search-icon.svg";
import "./../styles/SearchGoogle.css";

const API_KEY = "AIzaSyDmg_yCLf6k3rIhf9_XL96tVEaQLecarg8";
const CX = "e77f5770920a84a18";

/**
 * Google search component
 * @param {() => void} setResults - sets the list of search results when button is clicked
 * @param {() => void} setPreviousQuery - sets the state of previous search query which can be then displayed to UI
 * @param {Error} error - error message
 * @param {() => void} setError - sets the error message
 * @param {() => void} animateError - reference to a function that animates error
 * @param {boolean} initialSearch - true if first search on google hasn't been initialized
 * @param {() => void} setInitialSearch - sets state of initial search to false when user initializes first search
 * @returns google search UI
 */
export default function SearchGoogle({
  setResults,
  setPreviousQuery,
  error,
  setError,
  animateError,
  initialSearch,
  setInitialSearch,
}) {
  const [currentQuery, setCurrentQuery] = useState("");

  //function called on search button click or pressed "Enter"
  const search = async () => {
    if (currentQuery === "") {
      setError("Please enter a search query.");
      animateError();
    } else {
      try {
        const response = await fetch(
          `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CX}&q=${encodeURIComponent(
            currentQuery
          )}`
        );
        const data = await response.json();
        setError(null);

        setResults(data.items);
        initialSearch && setInitialSearch(false);
        data.items.length > 0 && setPreviousQuery(currentQuery);
      } catch (error) {
        setError("Failed to fecth search results.");
        animateError();

        console.error(error);
      }
    }
  };

  return (
    <>
      <div className="flex-container center-content">
        <label htmlFor="search-input" className="search-label">
          <img
            className="search-icon-img"
            src={searchIcon}
            alt="search-icon.svg"
          />
          <input
            id="sear-input"
            className="search-input"
            type="text"
            value={currentQuery}
            onChange={(e) => setCurrentQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                search();
              }
            }}
          />
        </label>
      </div>
      <div className="flex-container center-content error-container">
        <p className="error-paragraph">{error}</p>
      </div>
      <div className="flex-container center-content search-button-container">
        <button className="btn search-btn" onClick={search}>
          Search
        </button>
      </div>
    </>
  );
}
