import { describe, it, expect } from "vitest";
import { getRouteNames } from "../utils";
import { RouteNames } from "../enum";

describe("getRouteNames", () => {
  it("should return '/search' when the route is RouteNames.SEARCH", () => {
    expect(getRouteNames(RouteNames.SEARCH)).toBe("/search");
  });

  it("should return '/' for an unknown route", () => {
    expect(getRouteNames("unknown-route")).toBe("/");
  });
});
