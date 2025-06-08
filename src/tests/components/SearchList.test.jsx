import React from "react";
import { it, expect, describe, afterEach } from "vitest";
import { render, screen, within, cleanup } from "@testing-library/react";
import SearchList from "../../components/SearchList";
import "@testing-library/jest-dom/vitest";

describe("SearchList", () => {
  afterEach(() => {
    cleanup();
  });

  const testResults = [
    {
      title: "Google",
      link: "www.google.com",
      snippet: "This is Google page.",
    },
    {
      title: "Facebook",
      link: "www.facebook.com",
      snippet: "This is Facebook page.",
    },
    {
      title: "Spotify",
      link: "www.spotify.com",
      snippet: "This is Spotify page.",
    },
  ];

  it("should render an ordered list with <li> element for each item in provided testResults array, each having 1 <a> and 1 <p> element", () => {
    render(<SearchList results={testResults} isCheckboxChecked={true} />);

    const list = screen.getByRole("list");
    expect(list).toBeInTheDocument();

    const listItems = screen.getAllByRole("listitem");
    expect(listItems).toHaveLength(testResults.length);

    listItems.forEach((item, index) => {
      const link = within(item).getByRole("link");
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", testResults[index].link);
      expect(link).toHaveTextContent(testResults[index].title);

      const paragraph = within(item).getByRole("paragraph");
      expect(paragraph).toBeInTheDocument();
      expect(paragraph).toHaveTextContent(testResults[index].snippet);
    });
  });

  it("should render an empty DOM element on false isCheckBoxChecked", () => {
    const { container } = render(
      <SearchList results={testResults} isCheckboxChecked={false} />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("should render an empty DOM element on empty results array", () => {
    const { container } = render(
      <SearchList results={[]} isCheckboxChecked={false} />
    );
    expect(container).toBeEmptyDOMElement();
  });
});
