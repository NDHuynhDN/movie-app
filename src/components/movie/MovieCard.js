import React from "react";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ item }) => {
  // destructuring props item chua cac truong du lieu data.
  const { title, vote_average, release_date, poster_path, id } = item;
  const navigate = useNavigate();
  return (
    <div className="movie-card flex flex-col text-white rounded-lg bg-slate-800 p-3 h-full overflow-hidden ">
      <div className="w-full h-[250px] overflow-hidden rounded-lg mb-3">
        <img
          src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
          className="rounded-lg w-full h-[250px] object-cover select-none hover:scale-105 transition-all"
          alt=""
        />
      </div>
      <div className="flex flex-col flex-1">
        <h3
          className="
        font-bold mb-3 text-xl"
        >
          {title}
        </h3>
        <div className="flex item-center justify-between text-sm opacity-50 mb-5">
          <span>{new Date(release_date).getFullYear()}</span>
          <span className="flex items-center justify-center">
            {vote_average}
            <svg
              width="20"
              height="20"
              viewBox="1 1 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.3072 7.21989C10.9493 5.61921 11.2704 4.81886 11.7919 4.70794C11.9291 4.67877 12.0708 4.67877 12.208 4.70794C12.7295 4.81886 13.0506 5.61921 13.6927 7.21989C14.0578 8.13017 14.2404 8.58531 14.582 8.89488C14.6778 8.98171 14.7818 9.05904 14.8926 9.12579C15.2874 9.36377 15.7803 9.40791 16.7661 9.4962C18.4348 9.64565 19.2692 9.72037 19.524 10.1961C19.5768 10.2946 19.6127 10.4013 19.6302 10.5117C19.7146 11.0447 19.1012 11.6028 17.8744 12.7189L17.5338 13.0289C16.9602 13.5507 16.6735 13.8116 16.5076 14.1372C16.4081 14.3325 16.3414 14.5428 16.3101 14.7598C16.258 15.1215 16.342 15.5 16.5099 16.257L16.5699 16.5274C16.8711 17.885 17.0217 18.5637 16.8337 18.8974C16.6649 19.1971 16.3538 19.3889 16.0102 19.4053C15.6277 19.4236 15.0887 18.9844 14.0107 18.106C13.3005 17.5273 12.9454 17.2379 12.5512 17.1249C12.191 17.0216 11.8089 17.0216 11.4487 17.1249C11.0545 17.2379 10.6994 17.5273 9.98917 18.106C8.91119 18.9844 8.37221 19.4236 7.98968 19.4053C7.64609 19.3889 7.33504 19.1971 7.16617 18.8974C6.97818 18.5637 7.12878 17.885 7.42997 16.5274L7.48998 16.257C7.65794 15.5 7.74191 15.1215 7.6898 14.7598C7.65854 14.5428 7.59182 14.3325 7.49232 14.1372C7.32645 13.8116 7.03968 13.5507 6.46613 13.0289L6.12546 12.7189C4.89867 11.6028 4.28527 11.0447 4.36975 10.5117C4.38724 10.4013 4.42312 10.2946 4.47589 10.1961C4.73069 9.72037 5.56507 9.64565 7.23384 9.4962C8.21962 9.40791 8.71251 9.36377 9.10735 9.12579C9.2181 9.05904 9.32211 8.98171 9.41793 8.89488C9.75954 8.58531 9.94211 8.13017 10.3072 7.21989Z"
                fill="#ffff00"
                stroke="#ffff00"
              />
            </svg>
          </span>
        </div>
        <button
          onClick={() => navigate(`/movie/${id}`)}
          className="py-2 px-4 rounded-lg capitalize bg-primary flex items-center
          justify-center gap-x-2 w-full mt-auto"
        >
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
};

export default MovieCard;
