import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, Mock } from "vitest";
import UserList from "../components/user-list";
import { useUserStore } from "@/services/stores/user.store";

vi.mock("@/services/stores/user.store", () => ({
  useUserStore: vi.fn(),
}));

vi.mock("../repository-list", () => ({
  default: ({ username }: { username: string }) => (
    <div data-testid="repository-list">Repositories for {username}</div>
  ),
}));

describe("UserList Component", () => {
  const mockData = {
    items: [{ login: "user1" }, { login: "user2" }],
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders loading skeleton when isLoading is true", () => {
    (useUserStore as unknown as Mock).mockReturnValue({ data: undefined });

    render(<UserList isLoading={true} searchedUser="testuser" />);

    // Check if Skeleton is rendered
    expect(screen.getByTestId("skeleton"));
  });

  it("renders user list when data is available", () => {
    (useUserStore as unknown as Mock).mockReturnValue({ data: mockData });

    render(<UserList isLoading={false} searchedUser="testuser" />);

    // Check if user logins are rendered
    expect(screen.getByText("user1"));
    expect(screen.getByText("user2"));
  });
});
