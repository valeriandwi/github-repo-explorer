import { cleanup, render, screen } from "@testing-library/react";
import { describe, it, expect, vi, Mock, beforeEach } from "vitest";
import RepositoryList from "../components/repository-list";
import { useGetRepositoryPerUser } from "@/services/api/api-hooks/repositories";

vi.mock("@/services/api/api-hooks/repositories", () => ({
  useGetRepositoryPerUser: vi.fn(),
}));

vi.mock("@/assets/icons/starIcon", () => ({
  default: () => <span data-testid="star-icon">★</span>,
}));

vi.mock("@/components/not-found", () => ({
  default: ({ message }: { message: string }) => (
    <div data-testid="not-found">{message}</div>
  ),
}));

describe("RepositoryList Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  it("renders loading skeletons when loading", () => {
    (useGetRepositoryPerUser as Mock).mockReturnValue({
      isLoading: true,
      data: undefined,
      error: undefined,
    });

    render(<RepositoryList username="testuser" />);

    // Check if skeletons are rendered
    expect(screen.getAllByTestId("skeleton")).toHaveLength(3);
  });

  it("renders error message when there is an error", () => {
    (useGetRepositoryPerUser as Mock).mockReturnValue({
      isLoading: false,
      data: undefined,
      error: { message: "Failed to fetch repositories" },
    });

    render(<RepositoryList username="testuser" />);

    // Check if error message is displayed
    expect(screen.getByText("Failed to fetch repositories"));
  });

  it("renders 'Repositories Not Found' when data is empty", () => {
    (useGetRepositoryPerUser as Mock).mockReturnValue({
      isLoading: false,
      data: [],
      error: undefined,
    });

    render(<RepositoryList username="testuser" />);

    // Check if NotFound component is rendered
    expect(screen.getByTestId("not-found"));
    expect(screen.getByText("Repositories Not Found"));
  });

  it("renders repository list when data is available", () => {
    const mockData = [
      {
        id: 1,
        name: "repo1",
        stargazers_count: 10,
        description: "Description for repo1",
      },
      {
        id: 2,
        name: "repo2",
        stargazers_count: 5,
        description: "Description for repo2",
      },
    ];

    (useGetRepositoryPerUser as Mock).mockReturnValue({
      isLoading: false,
      data: mockData,
      error: undefined,
    });

    render(<RepositoryList username="testuser" />);

    // Check if repositories are rendered
    expect(screen.getByText("repo1"));
    expect(screen.getByText("Description for repo1"));
    expect(screen.getByText("10"));

    expect(screen.getByText("repo2"));
    expect(screen.getByText("Description for repo2"));
    expect(screen.getByText("5"));

    // Check if star icons are rendered
    expect(screen.getAllByTestId("star-icon")).toHaveLength(2);
  });

  it("renders count is 0 and description - if there's not found", () => {
    const mockData = [
      {
        id: 1,
        name: "repo1",
        stargazers_count: null,
        description: null,
      },
    ];

    (useGetRepositoryPerUser as Mock).mockReturnValue({
      isLoading: false,
      data: mockData,
      error: undefined,
    });

    render(<RepositoryList username="testuser" />);

    // Check if repositories are rendered
    expect(screen.getByText("repo1"));
    expect(screen.getByText("0"));
    expect(screen.getByText("-"));
  });
});
