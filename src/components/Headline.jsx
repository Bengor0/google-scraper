import React from "react";
import { useEffect, useState } from "react";
import "./../styles/Headline.css";

/**
 * Headline component
 * @param {string} headlineText - text to be displayed in header
 * @param {Error} error - error message
 * @param {boolean} isErrorAnimated - true if headline shoudl be animated when error occurs
 * @param {() => void} setIsErrorAnimated - changes state of error animation
 * @returns Animatable headline for page header
 */
export default function Headline({
  headlineText,
  error,
  isErrorAnimated,
  setIsErrorAnimated,
}) {
  const [className, setClassName] = useState("headline");
  const headlineArray = headlineText.split("");
  const timeoutTime = (headlineArray.length - 1) * 70 + 500;

  useEffect(() => {
    if (error && isErrorAnimated) {
      setClassName("headline move");
      setTimeout(() => {
        setClassName("headline");
        setIsErrorAnimated(false);
      }, timeoutTime);
    }
  }, [isErrorAnimated]);

  return (
    <>
      {headlineArray.map((letter, index) => (
        <span className={className} key={index} style={{ "--index": index }}>
          {letter}
        </span>
      ))}
    </>
  );
}
