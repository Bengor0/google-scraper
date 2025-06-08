import React from "react";
import { describe, it, expect, afterEach, vi } from "vitest";
import { render, cleanup } from "@testing-library/react";
import Headline from "../../components/Headline";
import "@testing-library/jest-dom/vitest";

describe("Headline", () => {
  afterEach(() => {
    cleanup();
  });

  const headlineText = "Google";

  it("should render span elements in the number of the headline text length", () => {
    const { container } = render(
      <Headline
        headlineText={headlineText}
        error={null}
        isErrorAnimated={false}
        setIsErrorAnimated={vi.fn()}
      />
    );

    const letters = container.querySelectorAll("span");
    expect(letters).toHaveLength(headlineText.length);
    letters.forEach((letter, index) => {
      expect(letter).toHaveTextContent(headlineText[index]);
    });
  });
});
