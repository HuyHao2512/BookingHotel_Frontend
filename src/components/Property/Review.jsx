import { useState } from "react";
import { Rate, Input, Button, List, Avatar } from "antd";

const Review = () => {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: "Nguyễn Văn A",
      rating: 5,
      comment: "Khách sạn rất tốt, phục vụ chuyên nghiệp!",
    },
    {
      id: 2,
      name: "Trần Thị B",
      rating: 4,
      comment: "Phòng sạch sẽ, rộng rãi nhưng hơi ồn.",
    },
  ]);

  const [newReview, setNewReview] = useState({
    name: "",
    rating: 0,
    comment: "",
  });

  const handleAddReview = () => {
    if (!newReview.name || newReview.rating === 0 || !newReview.comment) return;

    setReviews([...reviews, { id: Date.now(), ...newReview }]);
    setNewReview({ name: "", rating: 0, comment: "" });
  };

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
      : 0;

  return (
    <div style={{ maxWidth: 600, padding: 20 }}>
      <List
        dataSource={reviews}
        renderItem={(review) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar>{review.name.charAt(0)}</Avatar>}
              title={review.name}
              description={
                <>
                  <Rate disabled defaultValue={review.rating} />
                  <p>{review.comment}</p>
                </>
              }
            />
          </List.Item>
        )}
      />

      <div style={{ marginTop: 20 }}>
        <h3>Thêm đánh giá</h3>
        <Input
          placeholder="Tên của bạn"
          value={newReview.name}
          onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
          style={{ marginBottom: 10 }}
        />
        <Rate
          value={newReview.rating}
          onChange={(value) => setNewReview({ ...newReview, rating: value })}
          style={{ marginBottom: 10 }}
        />
        <Input.TextArea
          rows={3}
          placeholder="Nhận xét của bạn"
          value={newReview.comment}
          onChange={(e) =>
            setNewReview({ ...newReview, comment: e.target.value })
          }
          style={{ marginBottom: 10 }}
        />
        <Button type="primary" onClick={handleAddReview}>
          Gửi đánh giá
        </Button>
      </div>
    </div>
  );
};

export default Review;
