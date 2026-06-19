import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Main from "./pages/Main";
import Question from "./pages/Question/Question";
import QuizSetup from "./components/QuizSetup/QuizSetup";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Main />,
      },
      {
        path: ":questionId",
        element: <Question />,
      },
      {
        path: "/quiz",
        element: <QuizSetup />,
      },
    ],
  },
]);
