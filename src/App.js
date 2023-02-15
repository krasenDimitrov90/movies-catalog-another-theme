import React from "react";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import { AuthContextProvider } from "./contexts/auth-context";
import AddMovie from "./components/MovieActions/AddMovie/AddMovie";
import EditMovie from "./components/MovieActions/EditMovie/EditMovie";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import MovieDetailsPage from "./pages/MovieDetailsPage/MovieDetailsPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import NotFound from "./components/NotFound/NotFound/NotFound";
import { LoaderProvider } from "./contexts/loader-context";


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      { path: '', element: <Navigate to={'/movies?page=1'} /> },
      // { path: '', element: <HomePage /> },
      { path: 'movies', element: <HomePage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
      { path: 'add-movie', element: <AddMovie /> },
      { path: 'movie/:movieId/details', element: <MovieDetailsPage /> },
      // { path: '404', element: <NotFound /> },
    ]
  },
  // { path: '*', element: <Navigate to={'/404'} /> },

]);


function App() {
  return (
    <LoaderProvider>
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </LoaderProvider>
  );
}

export default App;
