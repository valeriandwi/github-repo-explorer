import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { PUBLIC_ROUTES } from "@/routes/routeList";

const router = createBrowserRouter(PUBLIC_ROUTES);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
