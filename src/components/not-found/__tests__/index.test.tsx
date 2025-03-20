import NotFound from "..";
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";

describe("NotFound Component", () => {
  it("should render the NotFoundIcon", () => {
    const screen = render(<NotFound />);
    const icon = screen.getByTestId("not-found-icon");
    expect(icon);
  });

  it("should render the message when provided", () => {
    const message = "Page not found";
    const screen = render(<NotFound message={message} />);
    const textElement = screen.getByText(message);
    expect(textElement);
  });

  it("should render without crashing when no message is provided", () => {
    const screen = render(<NotFound />);
    const textElement = screen.queryByText(/.+/);
    expect(textElement).not.toBeNull();
  });
});
