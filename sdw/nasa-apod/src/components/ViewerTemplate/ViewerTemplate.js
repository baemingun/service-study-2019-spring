import React from "react";
import styled from "styled-components";

const Header = styled.header``;
const ViewerWrapper = styled.div``;

const Viewer_template = styled.div`
  ${Header} {
    background: #2c3e50;
    height: 4rem;
    color: white;
    padding: 1rem;

    display: flex;
    align-items: center;

    font-size: 2rem;
    font-weight: 600;
    @include media("<tablet") {
      font-size: 1.25rem;
    }
  }
  ${ViewerWrapper} {
    position: relative;
    width: 100%;
    height: calc(100vh - 6rem);
  }
`;

const ViewerTemplate = ({ viewer, spaceNavigator }) => {
  return (
    <Viewer_template className="viewer-template">
      <Header>Astromy Picture of the Day</Header>
      <ViewerWrapper className="viewer-wrapper">
        {viewer}
        <div className="space-navigator-wrapper">{spaceNavigator}</div>
      </ViewerWrapper>
    </Viewer_template>
  );
};

export default ViewerTemplate;
