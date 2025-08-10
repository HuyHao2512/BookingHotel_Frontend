import { useMutation } from "@tanstack/react-query";
import { message } from "antd";
import React, { useState } from "react";
import styled from "styled-components";
import * as userService from "../../services/user.service";

const ButtonLike = ({ propertyId, initialLiked = false }) => {
  const [isLiked, setIsLiked] = useState(initialLiked);
  const userId = localStorage.getItem("userId");

  const likeMutation = useMutation({
    mutationFn: (data) => likeProperty(data),
    onSuccess: () => {
      setIsLiked(true);
      message.success("Đã thêm vào danh sách yêu thích");
    },
    onError: () => {
      message.error("Có lỗi khi thêm yêu thích");
    },
  });

  const dislikeMutation = useMutation({
    mutationFn: ({ userId, propertyId }) =>
      userService.dislikeProperties(userId, propertyId),
    onSuccess: () => {
      setIsLiked(false);
      message.info("Đã xóa khỏi danh sách yêu thích");
    },
    onError: () => {
      message.error("Có lỗi khi xóa yêu thích");
    },
  });
  const handleLike = async () => {
    if (isLiked) {
      dislikeMutation.mutate({ userId, propertyId });
    } else {
      likeMutation.mutate({ user: userId, propertyId: propertyId });
    }
  };

  return (
    <StyledWrapper isLiked={isLiked} onClick={handleLike}>
      <div className="heart-container" title="Like">
        <input
          type="checkbox"
          className="checkbox"
          id="Give-It-An-Id"
          checked={isLiked}
          onChange={() => {}}
        />
        <div className="svg-container">
          <svg
            viewBox="0 0 24 24"
            className="svg-outline"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid meet"
          >
            <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z"></path>
          </svg>
          <svg
            viewBox="0 0 24 24"
            className="svg-filled"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid meet"
          >
            <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z"></path>
          </svg>
          <svg
            className="svg-celebrate"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid meet"
          >
            <polygon points="6,6 8,8" />
            <polygon points="6,12 8,12" />
            <polygon points="8,18 10,16" />
            <polygon points="16,6 14,8" />
            <polygon points="16,12 14,12" />
            <polygon points="14,18 12,16" />
          </svg>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .heart-container {
    --heart-color: rgb(255, 91, 137); /* Màu hồng */
    position: relative;
    width: 30px;
    height: 25px;
    transition: 0.3s;
  }

  .heart-container .checkbox {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0;
    z-index: 20;
    cursor: pointer;
  }

  .heart-container .svg-container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }

  .heart-container .svg-outline {
    fill: none; /* Không tô màu nền */
    stroke: ${({ isLiked }) =>
      isLiked
        ? "var(--heart-color)"
        : "#ccc"}; /* Viền hồng khi thích, xám khi không */
    stroke-width: 2px;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .heart-container .svg-filled {
    fill: var(--heart-color); /* Màu hồng khi đã thích */
    stroke: none; /* Không có viền */
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: ${({ isLiked }) => (isLiked ? "block" : "none")};
    animation: keyframes-svg-filled 0.5s ease-in-out;
  }

  .heart-container .svg-celebrate {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    animation: keyframes-svg-celebrate 0.5s ease-in-out;
    animation-fill-mode: forwards;
    display: ${({ isLiked }) => (isLiked ? "block" : "none")};
    stroke: var(--heart-color);
    fill: none;
    stroke-width: 1px;
  }

  @keyframes keyframes-svg-filled {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }

  @keyframes keyframes-svg-celebrate {
    0% {
      transform: scale(0);
    }
    50% {
      opacity: 1;
    }
    100% {
      transform: scale(1.2);
      opacity: 0;
    }
  }
`;

export default ButtonLike;
