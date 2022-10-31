import React from "react";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";

import "@testing-library/jest-dom";
import "@testing-library/dom";

import Dropdown from "../widgets/Dropdown";

// arrange act assert
const handleSetSort = jest.fn;
const handleSortProductsBy = jest.fn;

const props = {
  children: ["name: a-z", "price: low to high", "price: high to low"],
  handleSetSort,
  handleSortProductsBy,
};

const user = userEvent.setup();

describe("Dropdown Component unit tests", () => {
  it("Renders Dropdown", () => {
    const { asFragment } = render(<Dropdown {...props}></Dropdown>);
    expect(asFragment).toMatchSnapshot();
  });

  it("Renders only primary list item on mount", () => {
    render(<Dropdown {...props} />);
    const listItems = screen.getAllByRole("listitem");

    expect(listItems.length).toEqual(1);

    listItems.map(
      (listItem, index) =>
        expect(listItem.textContent.trim()).toBe(props.children[index]) // [1]
    );
  });

  it("Renders expected list items on dropdown toggle", async () => {
    render(<Dropdown {...props} />);
    const toggleDropdown = screen.getByRole("listitem");

    await user.click(toggleDropdown);
    const listItems = await screen.findAllByRole("listitem");

    expect(listItems.length).toEqual(props.children.length + 1);
  });

  it("On click, renders dropdown option as primary list item", async () => {
    render(<Dropdown {...props} />);
    const toggleDropdown = screen.getByRole("listitem");

    await user.click(toggleDropdown);
    const dropdownOptionsOpen = await screen.findAllByRole("listitem");

    const optionFromDropdown = await dropdownOptionsOpen[
      Math.floor(Math.random() * dropdownOptionsOpen.length)
    ];

    await user.click(optionFromDropdown);
    const dropdownOptionsClosed = await screen.findAllByRole("listitem");

    expect(dropdownOptionsClosed.length).toEqual(1);
    expect(dropdownOptionsClosed[0].textContent.trim()).toBe(
      optionFromDropdown.textContent
    );
  });
});

// [1] returns textContent with whitespace at the end
