import React, { Fragment } from "react";
import { render, screen } from "@testing-library/react";

import "@testing-library/jest-dom";
import "@testing-library/dom";

import Header from "../core/Header";

const SearchBar = jest.fn(() => <Fragment />);
const Nav = jest.fn(() => <Fragment />);
const BasketWidget = jest.fn(() => <Fragment />);

describe("Header Component tests", () => {
  it("Renders Header component", () => {
    const { asFragment } = render(
      <Header>
        <SearchBar />
        <Nav />
        <BasketWidget />
      </Header>
    );

    expect(asFragment).toMatchSnapshot();
  });

  it("Renders correct number of list items", () => {
    render(
      <Header>
        <SearchBar />
        <Nav />
        <BasketWidget />
      </Header>
    );

    const listItems = screen.getAllByRole("listitem");
    expect(listItems.length).toEqual(3);
  });

  it("Renders h1", () => {
    render(
      <Header>
        <SearchBar />
        <Nav />
        <BasketWidget />
      </Header>
    );

    const heading = screen.getByRole("heading");
    expect(heading.textContent).toMatch(/wireframe apparel/i);
  });

  it("Renders image", () => {
    render(
      <Header>
        <SearchBar />
        <Nav />
        <BasketWidget />
      </Header>
    );

    const image = screen.getByRole("img");
    expect(image.alt).toMatch(/wireframe apparel/i);
  });

  it("Throws error if props.children node is undefined", () => {
    expect(() => render(<Header></Header>)).toThrow();
  });
});
