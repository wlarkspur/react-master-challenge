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
  const keyword = new URLSearchParams(location.search).get("keyword") + "";
  const { data: movie, isLoading } = useQuery<IGetSearch>(
    ["movies", keyword],
    () => getSearchMovie(keyword || "")
  );
  console.log("HERE is movie", movie);
  const { data: searchMovie } = useQuery<IGetSearchTv>(["movie", keyword], () =>
    getSearchMovie(keyword || "")
  );

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>is Loading</Loader>
      ) : (
        <Banner bgphoto={makeImagePath(movie?.results[0].backdrop_path + "")}>
          <Title>{movie?.results[0].title}</Title>
          <Overview>{movie?.results[0].overview}</Overview>
        </Banner>
      )}
      <SliderArea>
        <SliderSearch
          data={movie as IGetSearch}
          title={`Search Results: ${keyword + ""}`}
          row={"row1"}
          media={"movies"}
          keyword={keyword}
        ></SliderSearch>
      </SliderArea>
    </Wrapper>
  );
}

export default Search;
