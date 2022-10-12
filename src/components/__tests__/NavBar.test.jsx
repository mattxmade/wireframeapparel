import React, { Fragment } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { BrowserRouter } from "react-router-dom";

import "@testing-library/jest-dom";
import "@testing-library/dom";

import NavBar from "../core/NavBar";

const paths = ["/", "shop", "basket"];

describe("Nav component test suite", () => {
  it("Matches snapshot", () => {
    const { asFragment } = render(
      <BrowserRouter>
        <NavBar paths={paths} />
      </BrowserRouter>
    );
    expect(asFragment).toMatchSnapshot();
  });

  it("Renders correct number of listitems", () => {
    render(
      <BrowserRouter>
        <NavBar paths={paths} />
      </BrowserRouter>
    );

    const navItems = screen.getAllByRole("listitem");
    expect(navItems.length).toEqual(paths.length);
  });

  it("Renders NavLink components with expected paths", async () => {
    render(
      <BrowserRouter>
        <NavBar paths={paths} />
      </BrowserRouter>
    );

    const navLinks = await screen.findAllByRole("link");
    expect(navLinks.length).toEqual(paths.length);

    await navLinks.map((link, index) => {
      const currentPath = paths[index];
      const href = link.href;

      const expectedResult = href.slice(-href.length - currentPath.length);

      expect(link.href).toBe(expectedResult);
    });
  });
});
