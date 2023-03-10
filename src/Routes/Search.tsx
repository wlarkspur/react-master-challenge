import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  getSearchMovie,
  getSearchTv,
  IGetMoviesResult,
  IGetSearch,
  IGetSearchTv,
  IGetTv,
  IMovie,
} from "../api";
import styled from "styled-components";
import { makeImagePath, makeSearchResult } from "../utils";
import Slider from "../Components/Slider";
import SliderSearch from "../Components/SliderSearch";
import { ISliderTv } from "../Components/SliderTv";
import { useEffect } from "react";
import SliderSearchTv from "../Components/SliderSearchTv";

const Wrapper = styled.div`
  background: black;
  height: 200vh;
`;
const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`;

const Banner = styled.div<{ bgphoto: string }>`
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 40px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.6)),
    url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center;
`;

const Title = styled.h2`
  font-size: 48px;
  margin-bottom: 20px;
`;

const Overview = styled.p`
  font-size: 1.1rem;
  width: 50%;
`;
const SliderArea = styled.div`
  display: flex;
  flex-direction: column;
`;
const ErrorMessage = styled.span`
  display: flex;
  position: fixed;
  justify-content: center;
  align-items: center;
  top: 300px;
  left: 200px;
  font-size: 20px;
`;
/* const WrapperResult = styled.div`
  display: flex;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  width: 100%;
  height: 46vh;
  background-color: transparent;
  margin-top: 30vh;
  position: absolute;
  padding: 3px;
  justify-content: space-between;
`;
const Result = styled.div<{ bgphoto: string }>`
  height: 80%;
  width: 60%;
  display: flex;
  flex-direction: column;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.6)),
    url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center;
`; */

function Search() {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");
  const {
    data: movieData,
    isLoading: isMovieLoading,
    refetch: movie_refetch,
  } = useQuery<IGetSearch>(["movies", "movieData"], () =>
    getSearchMovie(keyword!)
  );
  const {
    data: tvData,
    isLoading: isTvLoading,
    refetch: tv_refetch,
  } = useQuery<IGetSearchTv>(["tv", "tvData"], () => getSearchTv(keyword!));
  console.log("HERE is movie", movieData, keyword);
  console.log("HERE is tv", tvData, keyword);

  useEffect(() => {
    movie_refetch();
    tv_refetch();
  }, [keyword]);
  if (!keyword) {
    return <div>No keyword specified</div>;
  }

  if (isMovieLoading || isTvLoading) {
    return <Loader>is Loading</Loader>;
  }

  if (!movieData?.results[0]) {
    return <div>No movies found for {keyword}</div>;
  }
  return (
    <Wrapper>
      {isMovieLoading ? (
        <Loader>is Loading</Loader>
      ) : (
        movieData?.results[0] && (
          <Banner
            bgphoto={makeImagePath(movieData?.results[0].backdrop_path + "")}
          >
            <Title>{movieData?.results[0].title}</Title>
            <Overview>{movieData?.results[0].overview}</Overview>
          </Banner>
        )
      )}
      <SliderArea>
        <SliderSearch
          data={movieData as IGetSearch}
          title={`Search Movie Results: ${keyword}`}
          row={"row1"}
          media={"movies"}
          keyword={keyword!}
        ></SliderSearch>
        <SliderSearchTv
          data={tvData as IGetSearchTv}
          title={`Search Tv Results: ${keyword}`}
          row={"row2"}
          media={"tv"}
          keyword={keyword!}
        ></SliderSearchTv>
      </SliderArea>
    </Wrapper>
  );
}

export default Search;
