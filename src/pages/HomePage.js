import React, { Fragment } from "react";
import MovieList from "../components/movie/MovieList";

const HomePage = () => {
  return (
    <Fragment>
      <section className="movie-layout page-container pb-10">
        <h2 className="capitalize text-white mb-5 text-2xl font-bold ">
          Now playing
        </h2>
        <MovieList></MovieList>
      </section>
      <section className="movie-layout page-container pb-10">
        <h2 className="capitalize text-white mb-5 text-2xl font-bold ">
          Top rating
        </h2>
        <MovieList type="top_rated"></MovieList>
      </section>
      <section className="movie-layout page-container pb-10">
        <h2 className="capitalize text-white mb-5 text-2xl font-bold ">
          Trending
        </h2>
        <MovieList type="popular"></MovieList>
      </section>
    </Fragment>
  );
};

export default HomePage;
