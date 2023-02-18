import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { getAiring, getOnAir, getTopRatedTv, IGetTv } from "../api";
import Slider from "../Components/Slider";
import SliderTv from "../Components/SliderTv";
import { makeImagePath } from "../utils";

const Wrapper = styled.div`
  background: black;
  height: 200vh;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
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
function Tv() {
  const { data: onAir, isLoading } = useQuery<IGetTv>(
    ["tv", "onAir"],
    getOnAir
  );
  const { data: airing } = useQuery<IGetTv>(["tv2", "airing"], getAiring);
  const { data: topTv } = useQuery<IGetTv>(["tv3", "topTv"], getTopRatedTv);
  console.log(onAir);
  return (
    <Wrapper>
      {isLoading ? (
        <Loader>is Loading...</Loader>
      ) : (
        <Banner
          bgphoto={makeImagePath(
            onAir && onAir?.results[1].backdrop_path
              ? onAir?.results[1].backdrop_path
              : ""
          )}
        >
          <Title>{onAir?.results[1].original_name}</Title>
          <Overview>{onAir?.results[1].overview}</Overview>
        </Banner>
      )}
      <SliderArea>
        <SliderTv
          data={onAir as IGetTv}
          title={"Latest"}
          row={"row1"}
          media={"tv"}
        ></SliderTv>
        <SliderTv
          data={airing as IGetTv}
          title={"Tv Airing Today"}
          row={"row2"}
          media={"tv"}
        ></SliderTv>
        <SliderTv
          data={topTv as IGetTv}
          title={"Top Rated"}
          row={"row3"}
          media={"tv"}
        ></SliderTv>
      </SliderArea>
    </Wrapper>
  );
}

export default Tv;
