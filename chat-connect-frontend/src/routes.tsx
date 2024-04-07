import ErrorPage from "./pages/Utility/errorPage";
import App from "./App";
import Home from "./pages/home";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/home",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
];

export default routes;
