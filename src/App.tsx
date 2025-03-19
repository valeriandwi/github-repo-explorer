import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { PUBLIC_ROUTES } from "@/routes/routeList";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider } from "antd";
import { theme } from "./styles/theme";

const router = createBrowserRouter(PUBLIC_ROUTES);
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider theme={theme}>
        <RouterProvider router={router} />
      </ConfigProvider>
    </QueryClientProvider>
  );
}

export default App;
