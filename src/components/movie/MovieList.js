import React, { useEffect, useState } from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import MovieCard from "./MovieCard";
import { fetcher } from "../../config";
import useSWR from "swr";
//
// https://api.themoviedb.org/3/movie/now_playing?api_key=358842b64f10c83a19b47df6986c2b66
const MovieList = ({ type = "now_playing" }) => {
  // su dung thu vien SWR de fetch data ve
  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie/${type}?api_key=358842b64f10c83a19b47df6986c2b66`,
    fetcher
  );
  // console.log("🚀 ~ file: MovieList.js:11 ~ MovieList ~ data:", data);
  // useEffect de fetch du lieu vao movie
  // check data, neu co data thi se set movie = data.result
  const movies = data?.results || [];

  return (
    // list ra cac bo phim
    <div className="movie-list">
      <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
        {movies.length > 0 &&
          movies.map((item) => (
            <SwiperSlide key={item.id}>
              <MovieCard item={item}></MovieCard>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default MovieList;
