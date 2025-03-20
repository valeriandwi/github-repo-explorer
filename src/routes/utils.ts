import { RouteNames } from "./enum";

export const getRouteNames = (route: string): string => {
  switch (route) {
    case RouteNames.SEARCH:
      return "/search";
    default:
      return "/";
  }
};
