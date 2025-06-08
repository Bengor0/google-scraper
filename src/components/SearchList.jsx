import "./../styles/SearchList.css";
import React from "react";

/**
 * Search results list component
 * @param {[]} results - a list of search results
 * @param {boolean} isCheckboxChecked - true if checkbox is checked
 * @returns ordered list of search results when result are not empty and checkbox is checked
 */
export default function SearchList({ results, isCheckboxChecked }) {
  if (isCheckboxChecked && results.length > 0) {
    return (
      <>
        <ol className="search-list center-content">
          {results.map((item) => (
            <li className="search-row" key={item.link}>
              <a className="a" href={item.link}>
                {item.title}
              </a>
              <p>{item.snippet}</p>
            </li>
          ))}
        </ol>
      </>
    );
  } else {
    return null;
  }
}
