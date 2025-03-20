import { renderHook, act, waitFor } from "@testing-library/react";
import { fetcher } from "../fetcher";
import { useUserStore } from "@/services/stores/user.store";
import { beforeEach, describe, expect, it, Mock, vi } from "vitest";
import { useGetUsers } from "../api-hooks/user";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

vi.mock("../fetcher");
vi.mock("@/services/stores/user.store");

describe("useGetUsers", () => {
  const mockSetUserData = vi.fn();
  const createWrapper = () => {
    const queryClient = new QueryClient();
    return ({ children }: any) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (useUserStore as unknown as Mock).mockReturnValue({
      setUserData: mockSetUserData,
    });
  });

  it("should fetch and store user data successfully", async () => {
    const mockResponse = {
      items: [{ login: "testuser", id: 1 }],
    };

    (fetcher as Mock).mockResolvedValue(mockResponse);

    const { result } = renderHook(
      () => useGetUsers({ username: "test", per_page: 5 }),
      { wrapper: createWrapper() }
    );

    act(() => {
      result.current.mutate();
    });

    await waitFor(() => expect(result.current.isPending).toBe(false));
    expect(result.current.data).toEqual(mockResponse);
    expect(mockSetUserData).toHaveBeenCalledWith(mockResponse);
  });

  it("should use the default per_page value when not provided", async () => {
    const mockResponse = { items: [{ login: "testuser" }] };
    (fetcher as Mock).mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useGetUsers({ username: "test" }), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.mutate();
    });

    await waitFor(() => expect(result.current.isPending).toBe(false));

    expect(fetcher).toHaveBeenCalledWith({
      url: "https://api.github.com/search/users?q=test&per_page=5",
    });
    expect(result.current.data).toEqual(mockResponse);
    expect(mockSetUserData).toHaveBeenCalledWith(mockResponse);
  });

  it("should handle API error", async () => {
    const mockError = new Error("API request failed");
    (fetcher as Mock).mockRejectedValue(mockError);

    const { result } = renderHook(
      () => useGetUsers({ username: "invalid", per_page: 5 }),
      { wrapper: createWrapper() }
    );

    act(() => {
      result.current.mutate();
    });

    await waitFor(() => expect(result.current.isPending).toBe(false));
    expect(result.current.error).toEqual(mockError);
  });
});
