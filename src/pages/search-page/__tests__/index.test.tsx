import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import SearchPage from "../index";

vi.mock("@/layouts/MainLayout", () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="main-layout">{children}</div>
  ),
}));

vi.mock("@/features/search-form", () => ({
  default: () => <div data-testid="search-form">Search Form</div>,
}));

describe("SearchPage Component", () => {
  it("renders the MainLayout and SearchForm components", () => {
    render(<SearchPage />);

    // Check if MainLayout is rendered
    expect(screen.getByTestId("main-layout"));

    // Check if SearchForm is rendered
    expect(screen.getByTestId("search-form"));
  });
});
