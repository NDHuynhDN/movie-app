import React, { Fragment } from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import "swiper/scss";
import Banner from "./Banner/Banner";
import Main from "./layout/Main";
import HomePage from "./pages/HomePage";
import MoviePage from "./pages/MoviePage";
import MovieDetail from "./pages/MovieDetail";
const App = () => {
  return (
    <Fragment>
      <Routes>
        <Route element={<Main></Main>}>
          <Route
            path="/"
            element={
              <>
                <Banner></Banner>
                <HomePage></HomePage>
              </>
            }
          ></Route>
          <Route path="/movies" element={<MoviePage></MoviePage>}></Route>
          <Route path="/movie/:movieId" element={<MovieDetail></MovieDetail>}></Route>
        </Route>
      </Routes>
    </Fragment>
  );
};

export default App;
