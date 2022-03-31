import React from "react";
import {
  getByAltText,
  getByDisplayValue,
  render,
  screen,
} from "@testing-library/react";
import PokemonCard from "../components/PokemonCard";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import userEvent from "@testing-library/user-event";

describe("PokemonCard component", () => {
  it("doesn't render shop buttons if not in shop", () => {
    const onAddToCartMock = jest.fn();
    render(
      <MemoryRouter>
        <PokemonCard
          name={"charmander"}
          isShop={false}
          onAddToCart={(e) => onAddToCartMock(e)}
        />
      </MemoryRouter>
    );
    expect(screen.queryByText("+")).toBe(null);
    expect(screen.queryByText("-")).toBe(null);
    expect(screen.queryByText("Add to Cart")).toBe(null);
  });

  it("renders correct buttons if in shop", () => {
    const onAddToCartMock = jest.fn();
    render(
      <MemoryRouter>
        <PokemonCard
          name={"charmander"}
          isShop={true}
          onAddToCart={(e) => onAddToCartMock(e)}
        />
      </MemoryRouter>
    );
    expect(screen.getByText("+")).toBeInTheDocument();
    expect(screen.getByText("-")).toBeInTheDocument();
    expect(screen.getByText("Add to Cart")).toBeInTheDocument();
  });

  it("calls add to cart", () => {
    const onAddToCartMock = jest.fn();
    render(
      <MemoryRouter>
        <PokemonCard
          name={"charmander"}
          isShop={true}
          onAddToCart={(e) => onAddToCartMock(e)}
        />
      </MemoryRouter>
    );
    userEvent.click(screen.getByText("Add to Cart"));
    expect(onAddToCartMock).toHaveBeenCalledTimes(1);
  });

  it("allows changing input value", () => {
    const onAddToCartMock = jest.fn();
    render(
      <MemoryRouter>
        <PokemonCard
          name={"charmander"}
          isShop={true}
          onAddToCart={(e) => onAddToCartMock(e)}
        />
      </MemoryRouter>
    );
    const input = screen.getByRole("spinbutton");
    expect(parseInt(input.value)).toBe(0);
    userEvent.type(input, "123");
    expect(parseInt(input.value)).toBe(123);

  });
});
