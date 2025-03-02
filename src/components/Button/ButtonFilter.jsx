import React from "react";
import { useState } from "react";
import { Menu } from "antd";
import {
  FilterOutlined,
  ArrowDownOutlined,
  ArrowUpOutlined,
  StarFilled,
  StarOutlined,
} from "@ant-design/icons";
const items = [
  {
    label: "Sắp xếp",
    key: "SubMenu",
    icon: <FilterOutlined />,
    children: [
      {
        type: "group",
        label: "Lọc theo giá",
        children: [
          {
            label: "Giá tăng dần",
            key: "setting:1",
            icon: <ArrowUpOutlined />,
          },
          {
            label: "Giá giảm dần",
            key: "setting:2",
            icon: <ArrowDownOutlined />,
          },
        ],
      },
      {
        type: "group",
        label: "Lọc theo đánh giá",
        children: [
          {
            label: "Đánh giá cao",
            key: "setting:3",
            icon: <StarOutlined />,
          },
          {
            label: "Đánh giá thấp",
            key: "setting:4",
            icon: <StarFilled />,
          },
        ],
      },
    ],
  },
];
function ButtonFilter() {
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortBy, setSortBy] = useState("rate");
  const [current, setCurrent] = useState("mail");
  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);

    let newSortBy;
    let newSortOrder;

    // Determine sortBy and sortOrder based on the selected menu item
    if (e.key === "setting:1" || e.key === "setting:2") {
      newSortBy = "price"; // Sort by price
      newSortOrder = e.key === "setting:1" ? "asc" : "desc"; // Ascending or descending
    } else if (e.key === "setting:3" || e.key === "setting:4") {
      newSortBy = "rate"; // Sort by rate
      newSortOrder = e.key === "setting:3" ? "asc" : "desc"; // A-Z or Z-A
    }

    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
    setCurrentPage(1); // Reset to the first page when sorting changes
  };
  return (
    <div className="mb-2">
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
      />
    </div>
  );
}

export default ButtonFilter;
