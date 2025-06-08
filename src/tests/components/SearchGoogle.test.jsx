import React from "react";
import { describe, it, expect, afterEach, vi } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import SearchGoogle from "../../components/SearchGoogle";
import "@testing-library/jest-dom/vitest";

describe("SearchGoogle", () => {
  afterEach(() => {
    cleanup();
  });

  it("should render 1 <input>, 1 <img> and 1 <button>", () => {
    render(
      <SearchGoogle
        setResults={[]}
        setPreviousQuery={"hello"}
        error={null}
        setError={vi.fn()}
        animateError={vi.fn()}
        initialSearch={true}
        setInitialSearch={vi.fn()}
      />
    );

    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();

    const img = screen.getByRole("img");
    expect(img).toBeInTheDocument();

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });
});
