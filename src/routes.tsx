import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./Layout";
import { Index } from "./pages/Index";
import { List } from "./pages/List";
import { List1 } from "./pages/List1";
import { PageWrap } from "./pages/PageWrap";

export const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <PageWrap />,
        children: [
          {
            path: "",
            element: <Index />,
          },
          {
            path: "list",
            element: <List/>,
          },
        ]
      },
      {
        path: "list1",
        element: <List1 />,
      },
    ],
  },
]
export const router = createBrowserRouter(routes);