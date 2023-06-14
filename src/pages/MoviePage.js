import React, { useEffect, useState } from "react";
import { fetcher } from "../config";
import useSWR from "swr";
import { Outlet } from "react-router-dom";
import MovieList from "../components/movie/MovieList";
import MovieCard from "../components/movie/MovieCard";
import useDebounce from "../hooks/useDebounce";
import ReactPaginate from "react-paginate";

// const pageCount = 5;

const itemsPerPage = 20;

const MoviePage = () => {
  const [itemOffset, setItemOffset] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  const [nextPage, setNextPage] = useState(1);
  const [filter, setFilter] = useState("");
  // console.log(filter);

  // const handFilterChange = (e) => {
  //   setFilter(e.target.value);
  // };

  const [url, setUrl] = useState(
    // `https://api.themoviedb.org/3/search/movie?api_key=358842b64f10c83a19b47df6986c2b66&query=${filter}&page=${nextPage}`
    `https://api.themoviedb.org/3/movie/popular?api_key=358842b64f10c83a19b47df6986c2b66&page=${nextPage}`
  );
  const { data, error } = useSWR(url, fetcher);
  // console.log(data);
  const loading = !data && !error;

  const handFetchDataInput = (e) => {
    setUrl(
      `https://api.themoviedb.org/3/search/movie?api_key=358842b64f10c83a19b47df6986c2b66&query=${filter}&page=${nextPage}`
    );
  };
  useEffect(() => {
    if (filter === "") {
      setUrl(
        `https://api.themoviedb.org/3/movie/popular?api_key=358842b64f10c83a19b47df6986c2b66&page=${nextPage}`
      );
    } else {
      handFetchDataInput();
    }
    // handFetchDataInput();
  }, [nextPage]);

  //use React-pagination
  useEffect(() => {
    if (!data || !data.total_results) return;
    setPageCount(Math.ceil(data.total_results / itemsPerPage));
  }, [data, itemOffset]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.total_results;
    setItemOffset(newOffset);
    setNextPage(event.selected + 1);
  };

  const movies = data?.results || [];

  return (
    <div className="py-5">
      <div className="flex mb-5">
        <div className="flex-1 ">
          <input
            type="text"
            className="w-full p-3 bg-slate-700 outline-none text-primary rounded-l-md"
            placeholder="Type here to search . . ."
            // defaultValue={filter}
            onChange={(e) => setFilter(e.target.value)}
            required
          />
        </div>
        <button className="px-5 py-3 bg-primary text-white rounded-r-md ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
            onClick={handFetchDataInput}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
      </div>
      {loading && (
        <div className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent border-t-4 mx-auto animate-spin"></div>
      )}
      <div className="grid grid-cols-4 gap-3">
        {!loading &&
          movies.length > 0 &&
          movies.map((item) => (
            <MovieCard key={item.id} item={item}></MovieCard>
          ))}
      </div>

      <div className="mt-10">
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          className="pagination"
        />
      </div>
      {/* 
        pageCount = 5
        {new Array(pageCount).fill(0).map((item, index) => (
          <span>
            {index + 1}
          </span>
        ))}
        => 1 2 3 4 5
        */}
    </div>
  );
};

export default MoviePage;
