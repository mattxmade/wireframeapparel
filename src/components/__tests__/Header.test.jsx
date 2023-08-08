import React, { Fragment } from "react";
import { HashRouter } from "react-router-dom";
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
      <HashRouter>
        <Header>
          <SearchBar />
          <Nav />
          <BasketWidget />
        </Header>
      </HashRouter>
    );

    expect(asFragment).toMatchSnapshot();
  });

  it("Renders correct number of list items", () => {
    render(
      <HashRouter>
        <Header>
          <SearchBar />
          <Nav />
          <BasketWidget />
        </Header>
      </HashRouter>
    );

    const listItems = screen.getAllByRole("listitem");
    expect(listItems.length).toEqual(7);
  });

  it("Renders h1", () => {
    render(
      <HashRouter>
        <Header>
          <SearchBar />
          <Nav />
          <BasketWidget />
        </Header>
      </HashRouter>
    );

    const heading = screen.getByRole("heading");
    expect(heading.textContent.toLowerCase()).toBe("wireframe apparel");
  });

  it("Renders image", () => {
    render(
      <HashRouter>
        <Header>
          <SearchBar />
          <Nav />
          <BasketWidget />
        </Header>
      </HashRouter>
    );

    const image = screen.getByRole("img");
    expect(image.alt.toLowerCase()).toBe("wireframe apparel logo");
  });
});
