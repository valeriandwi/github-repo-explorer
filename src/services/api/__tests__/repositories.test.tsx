import { renderHook, waitFor } from "@testing-library/react";
import { useGetRepositoryPerUser } from "../api-hooks/repositories";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GITHUB_API_URL } from "@/constants/constants";
import { describe, expect, it, Mock, vi } from "vitest";
import { fetcher } from "../fetcher";
vi.mock("../fetcher");

const createWrapper = () => {
  const queryClient = new QueryClient();
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("useGetRepositoryPerUser", () => {
  it("should fetch repositories for a given username", async () => {
    const mockData = [
      { id: 1, name: "repo1" },
      { id: 2, name: "repo2" },
    ];
    (fetcher as Mock).mockResolvedValueOnce(mockData);

    const { result } = renderHook(
      () => useGetRepositoryPerUser({ username: "testuser" }),
      { wrapper: createWrapper() }
    );

    await waitFor(() => !result.current.isLoading);

    expect(fetcher).toHaveBeenCalledWith({
      url: `${GITHUB_API_URL}/users/testuser/repos`,
    });
    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBeNull();
  });

  it("should handle errors when fetching repositories", async () => {
    const mockError = new Error("Failed to fetch");
    (fetcher as Mock).mockRejectedValueOnce(mockError);

    const { result } = renderHook(
      () => useGetRepositoryPerUser({ username: "testuser" }),
      { wrapper: createWrapper() }
    );

    await waitFor(() => !result.current.isLoading);

    expect(fetcher).toHaveBeenCalledWith({
      url: `${GITHUB_API_URL}/users/testuser/repos`,
    });
    expect(result.current.data).toBeUndefined();
  });

  it("should not fetch data if username is not provided", async () => {
    const { result } = renderHook(
      () => useGetRepositoryPerUser({ username: "" }),
      {
        wrapper: createWrapper(),
      }
    );

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toBeNull();
  });
});
