import SearchPage from "@/pages/search-page";
import { RouteNames } from "./enum";
import { getRouteNames } from "./utils";

export const PUBLIC_ROUTES = [
  {
    path: getRouteNames(RouteNames.SEARCH),
    element: <SearchPage />,
  },
];
