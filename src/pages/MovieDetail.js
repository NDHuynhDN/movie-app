import React, { Fragment } from "react";
import { useParams } from "react-router-dom";
import { apiKey, fetcher } from "../config";
import useSWR from "swr";
import { SwiperSlide, Swiper } from "swiper/react";
import MovieCard from "../components/movie/MovieCard";

const MovieDetail = () => {
  // https://api.themoviedb.org/3/movie/{movie_id}?api_key=

  const { movieId } = useParams();

  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`,
    fetcher
  );
  if (!data) return null;
  const { backdrop_path, poster_path, title, genres, overview } = data;
  return (
    <div className="pb-10">
      <div className="w-full h-[500px] relative">
        <div className="absolute inset-0 bg-black bg-opacity-75 rounded-md"></div>
        <div
          className="w-full h-full bg-cover bg-no-repeat rounded-md"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${backdrop_path})`,
          }}
        ></div>
      </div>
      <div className="w-full h-[300px] max-w-[800px] mx-auto -mt-[150px] relative z-10 pb-5 rounded-md  overflow-hidden">
        <img
          src={`https://image.tmdb.org/t/p/original/${poster_path}`}
          alt=""
          className="w-full h-[300px] object-cover hover:scale-110 transition-all "
        />
      </div>
      <h1 className="text-center text-3xl font-bold text-white my-5">
        {title}
      </h1>
      {genres.length > 0 && (
        <div className="flex items-center gap-x-3 mb-10 justify-center">
          {genres.map((item) => (
            <span
              key={item.id}
              className="py-2 px-4 border-primary text-primary border rounded-md hover:-translate-y-1 transition-all"
            >
              {item.name}
            </span>
          ))}
        </div>
      )}
      <p className=" text-center mx-auto leading-relaxed max-w-[600px]">
        {overview}
      </p>
      <MovieCredits></MovieCredits>
      <MovieVideos></MovieVideos>
      <MovieSimilar></MovieSimilar>
    </div>
  );
};
function MovieCredits() {
  const { movieId } = useParams();
  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`,
    fetcher
  );
  // check data tra ve
  if (!data) return null;
  // data tra ve 1 mang object gom {id, cast: Array(59),...} => destructuring data
  const { cast } = data; // data.cast
  if (!cast || cast.length <= 0) return null;

  return (
    <>
      <h2 className="text-center text-3xl my-5">Cast</h2>
      <div className="grid grid-cols-4 gap-5">
        {cast.slice(0, 4).map((item) => (
          <div className="cast-item" key={item.id}>
            {/* anh cua dien vien */}
            <img
              src={`https://image.tmdb.org/t/p/original/${item.profile_path}`}
              alt=""
              className="w-full h-[350px] object-cover rounded-md hover:scale-105 transition-all"
            />
            {/* ten dien vien*/}
            <h3 className="text-xl font-medium text-center italic mt-2">
              {item.name}
            </h3>
          </div>
        ))}
      </div>
    </>
  );
}
function MovieVideos() {
  const { movieId } = useParams();

  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`,
    fetcher
  );
  if (!data) return null;
  const { results } = data;
  if (!results || results.length <= 0) return null;
  return (
    <div className="py-10">
      <div className="flex flex-col gap-5">
        {results.slice(0, 2).map((item) => (
          <div className="" key={item.id}>
            <h3 className="text-xl font-medium px-4 py-2 bg-primary inline-block">
              {item.name}
            </h3>
            <div className="w-full aspect-video">
              <iframe
                width="727"
                height="409"
                src={`https://www.youtube.com/embed/${item.key}`}
                // frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full object-fill"
              ></iframe>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
function MovieSimilar() {
  // su dung ham useParams de lay ra id cua bo phim
  const { movieId } = useParams();

  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${apiKey}`,
    fetcher
  );
  if (!data) return null;
  const { results } = data;
  if (!results || results.length <= 0) return null;
  return (
    <div className="">
      <h2 className="text-3xl text-white font-medium mb-4">Similar Movie</h2>
      <div className="movie-list">
        <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
          {results.length > 0 &&
            results.map((item) => (
              <SwiperSlide key={item.id}>
                <MovieCard item={item}></MovieCard>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
}

export default MovieDetail;
//
