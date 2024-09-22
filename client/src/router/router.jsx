import { createBrowserRouter } from "react-router-dom";
import Home from "../views/home.jsx";
import Login from "../views/login.jsx";
import RootLayout from "../layouts/RootLayout.jsx";
import Register from "../views/adduser.jsx";
import ArticleDetail from "../views/ArticleDetail.jsx";
import UpdateArticle from "../views/updateArticle.jsx";
import AllArticle from "../views/AllArticles.jsx";
import CreateArticle from "../views/CreateArticle.jsx";
import UploadImage from "../views/UploadImage.jsx";
import AllCategories from "../views/AllCategories.jsx";
import ProtectedRoute from "../context/ProtectedRoute.jsx";

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: 'login',
        element: <Login />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: 'home',
            element: <AllArticle />,
          },
          {
            path: 'register',
            element: <Register />,
          },
          {
            path: 'cat',
            element: <AllCategories />,
          },
          {
            path: 'create',
            element: <CreateArticle />,
          },
          {
            path: 'update/articles/:id',
            element: <UpdateArticle />,
          },
          {
            path: 'update/photo/:id',
            element: <UploadImage />,
          },
        ]
      },
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'articles/:id',
        element: <ArticleDetail />,
      },
    ]
  }
]);

export default router;
