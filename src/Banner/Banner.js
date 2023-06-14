import React from "react";
import useSWR from "swr";
import { fetcher } from "../config";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper";

const Banner = () => {
  // su dung thu vien SWR de fetch data ve
  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=358842b64f10c83a19b47df6986c2b66`,
    fetcher
  );
  // useEffect de fetch du lieu vao movie
  // check data, neu co data thi se set movie = data.result
  const movies = data?.results || [];
  return (
    <section className="banner h-[600px] page-container mb-10">
      <Swiper
        className="transition-all"
        slidesPerView={"auto"}
        autoplay={{
          delay: 5000,
          disableOnInteraction: true,
        }}
        pagination={{
          clickable: false,
        }}
        modules={[Autoplay, Pagination]}
      >
        {movies.length > 0 &&
          movies.map((item) => (
            <SwiperSlide key={item.id}>
              <BannerItem item={item}></BannerItem>
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
};
function BannerItem({ item }) {
  const { title, poster_path } = item;

  return (
    <div className="w-full h-full rounded-lg relative">
      {/* tạo lớp phủ lên banner */}
      <div
        className="overlay absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.4)] to-[rgba(0,0,0,0.5)]
          rounded-lg bg-opacity-10 "
      ></div>
      <img
        src={`https://image.tmdb.org/t/p/original/${poster_path}`}
        alt=""
        className="w-full h-full object-cover rounded-lg"
      />
      <div className="content absolute left-5 bottom-5 w-full ">
        <h2 className="text-white font-bold text-3xl mb-3">{title}</h2>
        <div className="flex item-center gap-x-3 text-white mb-5">
          <span className=" border border-white rounded-md py-2 px-4">
            Adventure
          </span>
          <span className=" border border-white rounded-md py-2 px-4">
            Action
          </span>
          <span className=" border border-white rounded-md py-2 px-4">
            Trainer
          </span>
        </div>
        <button className="py-3 px-5 rounded-lg bg-primary font-medium text-white flex items-center gap-x-2">
          Watch now
          <svg
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21ZM10.7828 7.99043L16.4265 11.1258C17.1123 11.5068 17.1123 12.4932 16.4265 12.8742L10.7828 16.0096C9.98293 16.4539 9 15.8756 9 14.9606V9.03942C9 8.12444 9.98293 7.54607 10.7828 7.99043Z"
              fill="#fff"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Banner;
