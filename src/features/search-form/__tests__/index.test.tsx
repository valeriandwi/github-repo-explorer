import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
} from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import SearchForm from "../index";
import { useUserStore } from "@/services/stores/user.store";
import { useGetUsers } from "@/services/api/api-hooks/user";

vi.mock("@/services/stores/user.store", () => ({
  useUserStore: vi.fn(),
}));

vi.mock("@/services/api/api-hooks/user", () => ({
  useGetUsers: vi.fn(),
}));

vi.mock("../components/search-form", () => ({
  default: ({ onSearchButtonClick, isLoading }: any) => (
    <div>
      <input
        data-testid="search-input"
        onChange={(e) => onSearchButtonClick(e.target.value)}
        disabled={isLoading}
      />
      <button
        data-testid="search-button"
        onClick={onSearchButtonClick}
        disabled={isLoading}
      >
        Search
      </button>
    </div>
  ),
}));

vi.mock("../components/user-list", () => ({
  default: ({ searchedUser }: any) => (
    <div data-testid="user-list">User List for {searchedUser}</div>
  ),
}));

vi.mock("@/components/not-found", () => ({
  default: ({ message }: { message: string }) => (
    <div data-testid="not-found">{message}</div>
  ),
}));

describe("SearchForm Component", () => {
  const mockMutate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    cleanup();
    (useUserStore as any).mockReturnValue({
      data: { items: [{ login: "testuser" }] },
      searchValue: "testuser",
    });

    (useGetUsers as any).mockReturnValue({
      mutate: mockMutate,
      isPending: false,
      error: null,
    });
  });

  it("renders the search form and user list", () => {
    render(<SearchForm />);

    // Check if search input and button are rendered
    expect(screen.getByTestId("search-input"));
    expect(screen.getByTestId("search-button"));

    // Check if user list is rendered
    expect(screen.getByTestId("user-list"));
  });

  it("calls mutate function on search button click", async () => {
    render(<SearchForm />);

    const searchButton = screen.getByTestId("search-button");
    fireEvent.click(searchButton);

    // Check if mutate is called
    await waitFor(() => expect(mockMutate).toHaveBeenCalled());
  });

  it("renders error message when there is an error", () => {
    (useGetUsers as any).mockReturnValue({
      mutate: mockMutate,
      isPending: false,
      error: { message: "An error occurred" },
    });

    render(<SearchForm />);

    // Check if error message is displayed
    expect(screen.getByText("An error occurred"));
  });

  it("renders NotFound component when no users are found", () => {
    (useUserStore as any).mockReturnValue({
      data: { items: [] },
      searchValue: "testuser",
    });

    render(<SearchForm />);

    // Check if NotFound component is rendered
    expect(screen.getByTestId("not-found"));
  });
});
