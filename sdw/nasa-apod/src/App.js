import React, { useEffect, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import ViewerTemplate from "./components/ViewerTemplate";
import SpaceNavigator from "./components/SpaceNavigator";
import Viewer from "./components/Viewer";
import moment from "moment";
import * as api from "./lib/api";
const GlobalStyle = createGlobalStyle`
  body{
    margin: 0;
    background-color: #7f8c8d;
    box-sizing: border-box;
  }
  *{
    box-sizing : *;
  }
`;

const App = () => {
  const [loading, setLoading] = useState(false);
  const [maxDate, setMaxDate] = useState(null);
  const [date, setDate] = useState(null);
  const [url, setUrl] = useState(null);
  const [mediaType, setMediaType] = useState(null);

  const getAPOD = async date => {
    if (loading) return; //이미 요청중이라면 무시

    setLoading(true); //로딩 상태 시작

    try {
      console.log(date);
      const response = await api.getAPOD(date);
      const { date: retrivedDate, url, media_type: mediaType } = response.data;

      if (!maxDate) {
        setMaxDate({
          retrivedDate
        });
      }

      setDate(retrivedDate);
      setMediaType(mediaType);
      setUrl(url);
    } catch (e) {
      // 오류가 났을 경우
      console.log(e);
    }
    //로딩 상태 종료
    setLoading(false);
  };

  const handlePrev = () => {
    const prevDate = moment(date)
      .subtract(1, "days")
      .format("YYYY-MM-DD");
    console.log(prevDate);
    getAPOD(prevDate);
  };
  const handleNext = () => {
    if (date === maxDate) return;
    const nextDate = moment(date)
      .add(1, "days")
      .format("YYYY-MM-DD");
    console.log(nextDate);
    getAPOD(nextDate);
  };

  useEffect(() => {
    getAPOD(
      moment()
        .subtract(1, "days")
        .format("YYYY-MM-DD")
    );
  }, []);

  return (
    <>
      <GlobalStyle />
      <ViewerTemplate
        viewer={<Viewer url={url} mediaType={mediaType} loading={loading} />}
        spaceNavigator={
          <SpaceNavigator onPrev={handlePrev} onNext={handleNext} />
        }
      />
    </>
  );
};

export default App;
