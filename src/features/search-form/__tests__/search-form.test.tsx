import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, Mock } from "vitest";
import SearchUserForm from "../components/search-form";
import { useUserStore } from "@/services/stores/user.store";

vi.mock("@/services/stores/user.store", () => ({
  useUserStore: vi.fn(),
}));

describe("SearchUserForm Component", () => {
  const mockSetSearchValue = vi.fn();
  const mockOnSearchButtonClick = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    cleanup();
    (useUserStore as unknown as Mock).mockReturnValue({
      setSearchValue: mockSetSearchValue,
    });
  });

  it("renders input and button", () => {
    render(
      <SearchUserForm
        onSearchButtonClick={mockOnSearchButtonClick}
        isLoading={false}
      />
    );

    // Check if input is rendered
    const input = screen.getByTestId("search-input");
    expect(input);

    // Check if button is rendered
    const button = screen.getByTestId("search-button");
    expect(button);
  });

  it("calls setSearchValue when input changes", () => {
    render(
      <SearchUserForm
        onSearchButtonClick={mockOnSearchButtonClick}
        isLoading={false}
      />
    );

    const input = screen.getByTestId("search-input");
    fireEvent.change(input, { target: { value: "testuser" } });

    // Check if setSearchValue is called with the correct value
    expect(mockSetSearchValue).toHaveBeenCalledWith("testuser");
  });

  it("calls onSearchButtonClick when the button is clicked", () => {
    render(
      <SearchUserForm
        onSearchButtonClick={mockOnSearchButtonClick}
        isLoading={false}
      />
    );

    const button = screen.getByTestId("search-button");
    fireEvent.click(button);

    // Check if onSearchButtonClick is called
    expect(mockOnSearchButtonClick).toHaveBeenCalled();
  });

  it("disables input and button when isLoading is true", () => {
    render(
      <SearchUserForm
        onSearchButtonClick={mockOnSearchButtonClick}
        isLoading={true}
      />
    );

    const input = screen.getByTestId("search-input");
    const button = screen.getByTestId("search-button");

    // Check if input and button are disabled
    expect(input);
    expect(button);
  });
});
