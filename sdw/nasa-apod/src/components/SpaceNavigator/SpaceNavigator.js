import React from "react";
import styled from "styled-components";
import LeftIcon from "react-icons/lib/md/chevron-left";
import RightIcon from "react-icons/lib/md/chevron-right";

const Circle = styled.div``;

const End = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  display: flex;
  align-items: center;
  color: white;

  &.right {
    right: 1rem;
  }

  ${Circle} {
    width: 3rem;
    height: 3rem;
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    cursor: pointer;
    &:hover {
      background: rgba(0, 0, 0, 0.25);
    }
    &:active {
      background: rgba(0, 0, 0, 0.5);
    }
    svg {
      font-size: 2rem;
    }
  }
`;

const SpaceNavigator = ({ onPrev, onNext }) => {
  return (
    <div className="space-navigator">
      <End className="left end" left>
        <Circle className="circle" onClick={onNext}>
          <LeftIcon />
        </Circle>
      </End>
      <End className="right end" right>
        <Circle className="circle" onClick={onPrev}>
          <RightIcon />
        </Circle>
      </End>
    </div>
  );
};

export default SpaceNavigator;
