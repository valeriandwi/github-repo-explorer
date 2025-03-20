import { describe, it, expect, vi, Mock } from "vitest";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

vi.mock("react-dom/client", () => ({
  createRoot: vi.fn(() => ({
    render: vi.fn(),
  })),
}));

describe("main.tsx", () => {
  it("should render the App component inside StrictMode", async () => {
    const mockRoot = {
      render: vi.fn(),
    };

    // Mock document.getElementById to return a div with the correct ID
    const rootElement = document.createElement("div");
    rootElement.id = "root";
    vi.spyOn(document, "getElementById").mockImplementation((id) =>
      id === "root" ? rootElement : null
    );

    (createRoot as unknown as Mock).mockReturnValue(mockRoot);

    // Dynamically import the main file to trigger the rendering
    await import("./main");

    // Assertions
    expect(document.getElementById).toHaveBeenCalledWith("root");
    expect(createRoot).toHaveBeenCalledWith(rootElement);
    expect(mockRoot.render).toHaveBeenCalled();

    // Ensure the rendered component is wrapped in StrictMode
    const renderedComponent = mockRoot.render.mock.calls[0][0];
    expect(renderedComponent.type).toBe(StrictMode);
  });
});
