import { useState } from "react";
import { Rate, Input, Button, List, Avatar, message } from "antd";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as userService from "../../services/user.service";
import { useParams } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
const Review = () => {
  const { id } = useParams();
  const [user, setUser] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const queryClient = useQueryClient();

  // Mutation gửi đánh giá
  const reviewMutation = useMutation({
    mutationFn: (data) => userService.review(data),
    onSuccess: () => {
      message.success("Đánh giá thành công");
      queryClient.invalidateQueries(["reviews"]); // Refetch danh sách review
    },
    onError: () => {
      message.error("Đăng đánh giá thất bại");
    },
  });
  const {
    data: reviews, // Đảm bảo luôn có giá trị mặc định là mảng rỗng
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["reviews"],
    queryFn: () => userService.getReviews(id),
  });
  const handleReview = () => {
    if (!user || !rating || !comment) {
      message.warning("Vui lòng nhập đầy đủ thông tin");
      return;
    }
    reviewMutation.mutate({ user, rating, comment, property: id });
    setUser("");
    setRating(0);
    setComment("");
  };
  if (isError) {
    return <p>Lỗi: {error.message}</p>;
  }
  if (!reviews) {
    return <p>Không có đánh giá</p>;
  }

  return (
    <div style={{ maxWidth: 600, padding: 20 }}>
      <h2>Đánh giá</h2>

      {isLoading ? (
        <p>Đang tải</p>
      ) : (
        <List
          dataSource={reviews.data} // Đảm bảo luôn là mảng
          renderItem={(review) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar>{review.user.charAt(0)}</Avatar>}
                title={review.user}
                pagination={{ pageSize: 5 }}
                description={
                  <>
                    <Rate disabled defaultValue={review.rating} />
                    <p>{review.comment}</p>
                    <p className="text-black-400 text-sm font-bold">
                      {formatDistanceToNow(new Date(review.createdAt), {
                        addSuffix: true,
                        locale: vi,
                      })}
                    </p>
                  </>
                }
              />
            </List.Item>
          )}
        />
      )}

      <div style={{ marginTop: 20 }}>
        <h3>Thêm đánh giá</h3>
        <Input
          placeholder="Tên của bạn"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          style={{ marginBottom: 10 }}
        />
        <Rate
          value={rating}
          onChange={(value) => setRating(value)}
          style={{ marginBottom: 10 }}
        />
        <Input.TextArea
          rows={3}
          placeholder="Nhận xét của bạn"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          style={{ marginBottom: 10 }}
        />
        <Button
          type="primary"
          onClick={handleReview}
          loading={reviewMutation.isLoading}
        >
          Gửi đánh giá
        </Button>
      </div>
    </div>
  );
};

export default Review;
