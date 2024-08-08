import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Navbar } from "../components/Navbar";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import { Provider } from "react-redux";
import { store } from "../GlobalRedux/store";

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
  usePathname() {
    return "/portfolio";
  },
}));

describe("Navbar", () => {
  it("renders the navbar", () => {
    render(
      <Provider store={store}>
        <Navbar />
      </Provider>
    );

    const navbar = screen.getByRole("navigation");
    expect(navbar).toBeInTheDocument();
  });
});
