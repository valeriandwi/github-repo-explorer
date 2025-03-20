import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import MainLayout from "../index";

describe("MainLayout Component", () => {
  it("renders children inside the layout", () => {
    const childText = "Test Child Content";
    const screen = render(
      <MainLayout>
        <div>{childText}</div>
      </MainLayout>
    );

    expect(screen.getByText(childText));
  });
});
