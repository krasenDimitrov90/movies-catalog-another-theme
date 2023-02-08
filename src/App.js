import React from "react";
import Navigation from "./components/Navigation/Navigation";
import AddMoviePage from "./pages/AddMoviePage/AddMoviePage";
import EditMoviePage from "./pages/EditMoviePage/EditMoviePage";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import MovieDetailsPage from "./pages/MovieDetailsPage/MoviePage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";



function App() {
  return (
    <>
      <Navigation />
      <HomePage />
      <RegisterPage />
      <LoginPage />
      <EditMoviePage />
      <MovieDetailsPage />
      <AddMoviePage />
    </>
  );
}

export default App;
