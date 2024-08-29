import React from "react";
import { Card } from "antd";
import laptop from "../../tools/laptop.jpeg";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Meta } = Card;

const AdminProductCard = ({ product, handleRemove }) => {
  // destructure
  const { title, description, images, slug } = product;
    console.log('product', product);
  return (
    <Card
      cover={
        <img
          src={images && images.length > 0 ? images[0].url : laptop}
          style={{ height: "300px", objectFit: "cover" }}
          className="p-5"
          alt="avatar"
        />
      }
      actions={[
        <Link to={`/admin/product/${slug}`}>
          <EditOutlined className="text-warning" />
        </Link>,
        <DeleteOutlined
          onClick={() => handleRemove(slug, title)}
          className="text-danger"
        />,
      ]}
      className="mb-3"
    >
      <Meta
        title={title}
        description={`${description && description.substring(0, 40)}...`}
      />
    </Card>
  );
};

export default AdminProductCard;
