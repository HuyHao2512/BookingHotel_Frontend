import React, { useState, useEffect } from "react";
import styled from "styled-components";

const LoadingScreen = () => {
  return (
    <StyledWrapper>
      <div className="loader-container">
        <div className="ball-wrapper">
          <div className="ball blue" />
          <div className="ball red" />
          <div className="ball yellow" />
          <div className="ball green" />
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.9),
    rgba(59, 130, 246, 0.6)
  );
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  z-index: 1000;

  .loader-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .ball-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
    position: relative;
  }

  .ball {
    --size: 20px;
    width: var(--size);
    height: var(--size);
    border-radius: 50%;
    margin: 0 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    animation: bounceSmooth 1.8s infinite ease-in-out;

    &:hover {
      transform: scale(1.2);
    }
  }

  .blue {
    background: linear-gradient(45deg, rgb(247, 248, 249), rgb(189, 191, 192));
    animation-delay: 0s;
  }

  .red {
    background: linear-gradient(45deg, #ea4436, #ef5350);
    animation-delay: 0.45s;
  }

  .yellow {
    background: linear-gradient(45deg, #fbbd06, #fdd835);
    animation-delay: 0.9s;
  }

  .green {
    background: linear-gradient(45deg, #34a952, #66bb6a);
    animation-delay: 1.35s;
  }

  @keyframes bounceSmooth {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(30px);
      opacity: 0.8;
    }
  }
`;

export default LoadingScreen;
