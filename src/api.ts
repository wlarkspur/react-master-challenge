import { Url, UrlObject } from "url";

const BASE_PATH = "https://api.themoviedb.org/3";
const API_KEY = process.env.REACT_APP_API_KEY;
const REGION_KR = "kr-KR";
export interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
}
interface ITv {
  id: number;
  backdrop_path: string;
  poster_path: string;
  original_name: string;
  overview: string;
}
interface IDetails {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
}
interface IGenres {
  id: number;
  name: string;
}
export interface IGetMoviesResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
  movieId: string;
}

export interface IGetTv {
  page: number;
  results: ITv[];
  total_pages: number;
  total_results: number;
}

export interface IGetDetails {
  backdrop_path: string;
  belongs_to_collection: IDetails;
  genres: IGenres[];
  homepages: string;
  id: string;
  overview: string;
  poster_path: string;
  release_date: string;
  runtime: number;
  title: string;
  tagline: string;
  vote_average: number;
}
export interface IGetDetailsTv {
  backdrop_path: string;
  created_by: [
    {
      id: number;
      name: string;
      profile_path: string;
    }
  ];
  genres: IGenres[];
  homepages: string;
  id: string;
  first_air_date: string;
  last_air_date: string;
  overview: string;
  name: string;
  number_of_episodes: number;
  number_of_seasons: number;
  poster_path: string;
  episode_run_time: [number];
  tagline: string;
  vote_average: number;
}

export interface IGetSearch {
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}
export interface IGetSearchTv {
  page: number;
  results: ITv[];
  total_pages: number;
  total_results: number;
}

//Movies - NowPlaying
export function getMovies() {
  return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}
//https://api.themoviedb.org/3/movie/popular?api_key=30a18278aa32c27de99875e2b7b41efe&language=kr-KR&page=1
// Movies - popular
export function getPopular() {
  return fetch(`${BASE_PATH}/movie/popular?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}

export function getTopRated() {
  return fetch(`${BASE_PATH}/movie/top_rated?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}

export const getUpcoming = async () => {
  const response = await fetch(
    `${BASE_PATH}/movie/upcoming?api_key=${API_KEY}`
  );
  const json = await response.json();

  return json;
};

// Tv shows

export const getOnAir = async () => {
  const response = await fetch(`${BASE_PATH}/tv/on_the_air?api_key=${API_KEY}`);
  const json = await response.json();
  return json;
};
export const getAiring = async () => {
  const response = await fetch(
    `${BASE_PATH}/tv/airing_today?api_key=${API_KEY}`
  );
  const json = await response.json();
  return json;
};
export const getTopRatedTv = async () => {
  const response = await fetch(`${BASE_PATH}/tv/top_rated?api_key=${API_KEY}`);
  const json = await response.json();
  return json;
};

// ----------------------------------------------------------------------

export const getDetails = async (movieId: number | undefined) => {
  if (!movieId) {
    return null;
  }
  const reponse = await fetch(
    `${BASE_PATH}/movie/${movieId}?api_key=${API_KEY}`
  );
  const json = reponse.json();
  return json;
};
export const getDetailsTv = async (tvId: number | undefined) => {
  if (!tvId) {
    return null;
  }
  const reponse = await fetch(`${BASE_PATH}/tv/${tvId}?api_key=${API_KEY}`);
  const json = reponse.json();
  return json;
};

export const getSearchMovie = async (keyword: string) => {
  const response = await fetch(
    `${BASE_PATH}/search/movie?api_key=${API_KEY}&query=${keyword}&page=1`
  );
  const json = await response.json();
  return json;
};
export const getSearchTv = async (keyword: string) => {
  const response = await fetch(
    `${BASE_PATH}/search/tv?api_key=${API_KEY}&query=${keyword}&page=1`
  );
  const json = await response.json();
  return json;
};
