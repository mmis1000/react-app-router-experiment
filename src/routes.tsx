import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./Layout";
import { Index } from "./pages/Index";
import { List } from "./pages/List";
import { List1 } from "./pages/List1";
import { DEFAULT_APP_ROUTE_PARAM } from "./utils/route";

export const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Index />,
      },
      {
        path: "list",
        element: <List {...DEFAULT_APP_ROUTE_PARAM} />,
      },
      {
        path: "list1",
        element: <List1 {...DEFAULT_APP_ROUTE_PARAM} />,
      },
    ],
  },
]
export const router = createBrowserRouter(routes);