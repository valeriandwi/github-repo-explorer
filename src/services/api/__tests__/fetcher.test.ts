import { describe, it, expect, vi, afterEach } from "vitest";
import { fetcher } from "../fetcher";

const mockFetch = vi.fn();

global.fetch = mockFetch;

describe("fetcher", () => {
  const mockUrl = "https://api.github.com/repos";
  const mockHeaders = { "Content-Type": "application/json" };
  const mockResponse = { data: "test data" };

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("should fetch data successfully", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await fetcher({ url: mockUrl, headers: mockHeaders });

    expect(mockFetch).toHaveBeenCalledWith(mockUrl, {
      headers: {
        Authorization: expect.stringContaining("Bearer"),
        ...mockHeaders,
      },
    });
    expect(result).toEqual(mockResponse);
  });

  it("should throw an error if response is not ok", async () => {
    const mockErrorMessage = { message: "Not Found" };
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      json: async () => mockErrorMessage,
    });

    await expect(
      fetcher({ url: mockUrl, headers: mockHeaders })
    ).rejects.toThrow("Error: 404 Not Found");

    expect(mockFetch).toHaveBeenCalledWith(mockUrl, {
      headers: {
        Authorization: expect.stringContaining("Bearer"),
        ...mockHeaders,
      },
    });
  });

  it("should throw an error if fetch fails", async () => {
    const mockError = new Error("Network Error");
    mockFetch.mockRejectedValueOnce(mockError);

    await expect(
      fetcher({ url: mockUrl, headers: mockHeaders })
    ).rejects.toThrow("Network Error");

    expect(mockFetch).toHaveBeenCalledWith(mockUrl, {
      headers: {
        Authorization: expect.stringContaining("Bearer"),
        ...mockHeaders,
      },
    });
  });
});
