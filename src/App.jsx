import { useState } from "react";
import Headline from "./components/Headline";
import SearchGoogle from "./components/SearchGoogle";
import DownloadListOptions from "./components/DownloadListOptions";
import SearchList from "./components/SearchList";
import "./App.css";

export default function App() {
  const [previousQuery, setPreviousQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [isErrorAnimated, setIsErrorAnimated] = useState(false);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [initialSearch, setInitialSearch] = useState(true);
  const headlineText = "Google";

  const animateError = () => {
    !isErrorAnimated && setIsErrorAnimated(true);
  };


  return (
    <>
      <header
        className="flex-container top-container"
        style={{ alignItems: "center", justifyContent: "center" }}
      >
        <Headline
          headlineText={headlineText}
          error={error}
          isErrorAnimated={isErrorAnimated}
          setIsErrorAnimated={setIsErrorAnimated}
        />
      </header>
      <main className="flex-container center-content">
        <SearchGoogle
          setResults={setResults}
          setPreviousQuery={setPreviousQuery}
          error={error}
          setError={setError}
          animateError={animateError}
          setInitialSearch={setInitialSearch}
        />
        <div className="flex-container center-content">
          <DownloadListOptions
            results={results}
            query={previousQuery}
            initialSearch={initialSearch}
            isCheckboxChecked={isCheckboxChecked}
            setIsCheckboxChecked={setIsCheckboxChecked}
          />
        </div>
        <div className="flex-container center-content">
          <SearchList results={results} isCheckboxChecked={isCheckboxChecked}/>
        </div>
      </main>
      <footer></footer>
    </>
  );
}
