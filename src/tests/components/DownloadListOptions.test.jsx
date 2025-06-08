import React from "react";
import { describe, it, expect, vi, afterEach } from "vitest";
import {  render, screen, cleanup } from "@testing-library/react";
import DownloadListOptions from "../../components/DownloadListOptions";
import "@testing-library/jest-dom/vitest";

describe("DownloadListOptions", () => {
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
      title: "LinkedIn",
      link: "www.linkedin.com",
      snippet: "This is LinkedIn page.",
    },
  ];
  const testQuery = "social media";

  it("should render 2 <p>, 1 <img>, 2 <button>, 1 <input> and 1 <span> with text 'Hide' if results are provided and checkbox is checked", () => {
    const { container } = render(
      <DownloadListOptions
        results={testResults}
        query={testQuery}
        initialSearch={false}
        isCheckboxChecked={true}
        setIsCheckboxChecked={vi.fn()}
      />
    );

    const buttonList = screen.getAllByRole("button");
    expect(buttonList).toHaveLength(2);

    const resultsParagraph = screen.getByText(`Results for: "${testQuery}"`);
    expect(resultsParagraph).toBeInTheDocument();

    const downloadParagraph = screen.getByText("Download");
    expect(downloadParagraph).toBeInTheDocument();

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeInTheDocument();

    const span = container.querySelector("span");
    expect(span).toHaveTextContent("Hide");
  });

  it("should render 2 <p>, 1 <img>, 2 <button>, 1 <input> and 1 <span> with text 'Show' if results are provided and checkbox is not checked", () => {
    const { container } = render(
      <DownloadListOptions
        results={testResults}
        query={testQuery}
        initialSearch={false}
        isCheckboxChecked={false}
        setIsCheckboxChecked={vi.fn()}
      />
    );

    const buttonList = screen.getAllByRole("button");
    expect(buttonList).toHaveLength(2);

    const resultsParagraph = screen.getByText(`Results for: "${testQuery}"`);
    expect(resultsParagraph).toBeInTheDocument();

    const downloadParagraph = screen.getByText("Download");
    expect(downloadParagraph).toBeInTheDocument();

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeInTheDocument();

    const span = container.querySelector("span");
    expect(span).toHaveTextContent("Show");
  });

  it("should render 1 <p> element if result are not provided and its not the initial search", () => {
    render(
      <DownloadListOptions
        results={[]}
        query={testQuery}
        initialSearch={false}
        isCheckboxChecked={true}
        setIsCheckboxChecked={vi.fn()}
      />
    );

    const resultsParagraph = screen.getByRole("paragraph");
    expect(resultsParagraph).toHaveTextContent(
      `No results for: "${testQuery}"`
    );
  });

  it("should be empty DOM element if results are not provided and it is initial search", () => {
    const { container } = render(
      <DownloadListOptions
        results={[]}
        query={"social media"}
        initialSearch={true}
        isCheckboxChecked={true}
        setIsCheckboxChecked={vi.fn()}
      />
    );
    expect(container).toBeEmptyDOMElement();
  });
});
