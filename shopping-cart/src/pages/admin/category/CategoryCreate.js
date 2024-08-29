import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  createCategory,
  getCategories,
  removeCategory,
} from "../../../functions/category";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSearch from "../../../components/forms/LocalSearch";

const CategoryCreate = () => {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [keyword, setKeyword] = useState("");
  const { user } = useSelector((state) => state);

  useEffect(() => {
    loadCategories();
  }, []);

  const handleRemove = async (slug, name) => {
    let answer = window.confirm(`Are you sure you want to Delete ${name}?`);
    if (answer) {
      try {
        const res = await removeCategory(slug, user.token);
        toast.success(`${res.data.name} deleted successfully`);
        setName("");
        loadCategories();
      } catch (err) {
        console.log('err', err);
        if (err.response.status === 400) toast.error(err.response.data);
      }
    }
  };
  const loadCategories = async () => {
    const res = await getCategories();
    setCategories(res.data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("name", name);
    createCategory(name, user.token)
      .then((res) => {
        toast.success(`${res.data.name} is created`);
        loadCategories();
      })
      .catch((err) => {
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword)
  return (
    <div>
      <h4>Create Category</h4>
      <CategoryForm name={name} handleSubmit={handleSubmit} setName={setName} />
      <LocalSearch keyword={keyword} setKeyword={setKeyword}/>
      {categories.filter(searched(keyword)).map((category) => (
        <div key={category._id} className="alert alert-secondary">
          {category.name}{" "}
          <span
            className=" btn btn-sm float-right text-danger"
            onClick={() => handleRemove(category.slug, category.name)}
          >
            <DeleteOutlined />
          </span>{" "}
          <span className=" btn btn-sm float-right text-warning">
            <Link to={`/admin/category/${category.slug}`}>
              <EditOutlined />
            </Link>
          </span>{" "}
        </div>
      ))}
    </div>
  );
};

export default CategoryCreate;
