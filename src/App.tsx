import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import { HomeScreen } from "./Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { TableDetails } from "./TableDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeScreen />,
  },
  {
    path: "table/:tableId",
    element: <TableDetails />,
  },
]);

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <RouterProvider router={router} />
    </MantineProvider>
  );
}
