import { describe, it, expect } from "vitest";
import { PUBLIC_ROUTES } from "../routeList";
import { RouteNames } from "../enum";
import { getRouteNames } from "../utils";
import SearchPage from "@/pages/search-page";

describe("PUBLIC_ROUTES", () => {
  it("should contain the correct number of routes", () => {
    expect(PUBLIC_ROUTES).toHaveLength(2);
  });

  it("should have the correct path and element for the search route", () => {
    const searchRoute = PUBLIC_ROUTES.find(
      (route) => route.path === getRouteNames(RouteNames.SEARCH)
    );
    expect(searchRoute).toBeDefined();
    expect(searchRoute?.element).toEqual(<SearchPage />);
  });

  it("should have the correct path and element for the root route", () => {
    const rootRoute = PUBLIC_ROUTES.find((route) => route.path === "/");
    expect(rootRoute).toBeDefined();
    expect(rootRoute?.element).toEqual(<SearchPage />);
  });
});
