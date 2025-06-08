import React from "react";
import { json2csv } from "json-2-csv";
import documentIcon from "./../assets/document-icon.svg";
import "./../styles/DownloadList.css";

/**
 * Download options component
 * @param {[]} results - a list of results
 * @param {string} query - currently searched query in input
 * @param {boolean} initialSearch - true if first search on google hasn't been initialized
 * @param {boolean} isCheckboxChecked - true if checkbox is checked
 * @param {() => void} setIsCheckboxChecked - sets the state of App component when the checkbox is clicked
 * @returns download options UI
 */
export default function DownloadListOptions({ results, query, initialSearch, isCheckboxChecked, setIsCheckboxChecked }) {

  //function to parse JSON from API to a string
  const downloadJSON = () => {
    const jsonString = JSON.stringify(results, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    download(url, "json");
  };

  //function to parse JSON from API to a CSV format
  const downloadCSV = () => {
    try {
      const csvString = json2csv(results);
      const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);

      download(url, "csv");
    } catch (err) {
      console.error("Error exporting CSV:", err);
      alert("Failed to export CSV.");
    }
  };

  //function to download
  const download = (url, fileType) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = `results.${fileType}`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (results.length > 0) {
    return (
      <>
        <div className="bar"></div>
        <div className="flex-container center-content">
          <p className="paragraph">Results for: "{query}"</p>
        </div>
        <div className="flex-container center-content img-container">
          <img
            className="document-icon-img"
            src={documentIcon}
            alt="file-icon.svg"
          ></img>
        </div>
        <div className="flex-container center-content download-container">
          <p>Download</p>
        </div>
        <div className="flex-container align">
          <button className="btn download-btn" onClick={downloadJSON}>
            results.json
          </button>
          <button className="btn download-btn" onClick={downloadCSV}>
            results.csv
          </button>
          <input
            className="checkbox"
            type="checkbox"
            id="checkbox"
            onChange={(event) => setIsCheckboxChecked(event.target.checked)}
          />
          <label className="btn download-btn" htmlFor="checkbox">
            {isCheckboxChecked ? <span>Hide</span> : <span>Show</span>}
          </label>
        </div>
        
      </>
    );
  } else if (!initialSearch && results.length === 0) {
    return (
      <>
        <div className="bar"></div>
        <div className="flex-container center-content">
          <p className="paragraph">No results for: "{query}"</p>
        </div>
      </>
    );
  } else {
    return null;
  }
}
