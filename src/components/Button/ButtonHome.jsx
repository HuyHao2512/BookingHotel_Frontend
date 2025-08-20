import React from "react";
import styled from "styled-components";

const ButtonHome = () => {
  return (
    <StyledWrapper>
      <a className="btn" href="/">
        Trở về trang chủ
      </a>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .btn {
    display: inline-block;
    padding: 0.9rem 1.8rem;
    font-size: 16px;
    font-weight: 700;
    color: black;
    border-radius: 8px;
    border: 3px solid rgba(20, 105, 232, 1);
    cursor: pointer;
    position: relative;
    background-color: white;
    text-decoration: none;
    overflow: hidden;
    z-index: 1;
  }

  .btn::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(20, 105, 232, 1);
    transform: translateX(-100%);
    transition: all 0.3s;
    z-index: -1;
  }

  .btn:hover::before {
    transform: translateX(0);
  }
`;

export default ButtonHome;
