import React from "react";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";

import "@testing-library/jest-dom";
import "@testing-library/dom";

import Dropdown from "../widgets/Dropdown";

// arrange act assert
const handleSortProductsBy = jest.fn;

const props = {
  options: ["name: a-z", "price: low to high", "price: high to low"],
  handleSortProductsBy,
};

const user = userEvent.setup();

describe("Dropdown Component unit tests", () => {
  it("Renders Dropdown", () => {
    const { asFragment } = render(<Dropdown {...props}></Dropdown>);
    expect(asFragment).toMatchSnapshot();
  });

  it("On mount, renders first item of options prop as primary item", () => {
    render(<Dropdown {...props} />);
    const listItems = screen.getAllByRole("button");

    expect(listItems.length).toEqual(1);
    expect(listItems[0].textContent.trim()).toBe(props.options[0]);
  });

  it("Renders expected list items on dropdown toggle", async () => {
    render(<Dropdown {...props} />);
    const toggleDropdown = screen.getByRole("button");

    await user.click(toggleDropdown);
    const listItems = await screen.findAllByRole("button");

    expect(listItems.length).toEqual(props.options.length + 1);
  });

  it("On click, renders dropdown option as primary list item", async () => {
    render(<Dropdown {...props} />);
    const toggleDropdown = screen.getByRole("button");

    await user.click(toggleDropdown);
    const dropdownOpen = await screen.findAllByRole("button");

    const option = props.options.map((item, index) => index + 1)[
      Math.floor(Math.random() * props.options.length)
    ];

    const elementFromDropdown = dropdownOpen[option];

    await user.click(dropdownOpen[option]);
    const dropdownClose = await screen.findAllByRole("button");

    expect(dropdownClose.length).toEqual(1);
    expect(dropdownClose[0].textContent.trim()).toBe(
      elementFromDropdown.textContent
    );
  });
});

// [1] trim() used throughout as textContent returns with whitespace at the end
