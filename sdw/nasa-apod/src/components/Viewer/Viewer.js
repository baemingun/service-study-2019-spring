import React from "react";
import styled from "styled-components";
import { ChasingDots } from "better-react-spinkit";

const SpaceImg = styled.img``;
const SpaceVideo = styled.iframe``;
const View = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  ${SpaceImg} {
    display: block;
    width: auto;
    max-width: calc(100% - 10rem);
    max-height: calc(100% - 10rem);
    cursor: pointer;
    transition: all 0.3s ease-in;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
    &:hover {
      box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3),
        0 15px 12px rgba(0, 0, 0, 0.22);
    }
  }
  ${SpaceVideo} {
    background: black;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    width: calc(100% - 10rem);
    height: calc(100% - 10rem);
  }
`;

const Viewer = ({ mediaType, url, loading }) => {
  if (loading) {
    // 로딩중일때 로더 보여주기
    return (
      <View className="viewer">
        <ChasingDots color="white" size={60} />
      </View>
    );
  }
  if (!url) return null;

  return (
    <View className="viewer">
      {mediaType === "image" ? (
        <SpaceImg onClick={() => window.open(url)} src={url} alt="space" />
      ) : (
        <SpaceVideo
          title="space-video"
          src={url}
          frameBorder="0"
          gesture="media"
          allow="encrypted-media"
          allowFullScreen
        />
      )}
    </View>
  );
};

export default Viewer;
