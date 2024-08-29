import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createSub, getSubs, removeSub } from "../../../functions/sub";

import { getCategories } from "../../../functions/category";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSearch from "../../../components/forms/LocalSearch";

const SubCreate = () => {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [subs, setSubs] = useState([]);
  const [category, setCategory] = useState('');
  const [keyword, setKeyword] = useState("");
  const { user } = useSelector((state) => state);

  useEffect(() => {
    loadCategories();
    loadSubs();
  }, []);

  const loadCategories = async () => {
    const res = await getCategories();
    setCategories(res.data);
  };

  const loadSubs = async () => {
    const res = await getSubs();
    console.log('res subs', res);
    setSubs(res.data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!category){
      toast.error('Please Select a category')
      return;
    }
    createSub(name, category, user.token)
      .then((res) => {
        console.log('res', res);
        toast.success(`${res.data.name} is created`);
        loadSubs();
        setName("");
      })
      .catch((err) => {
        console.log('err', err);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  const handleRemove = async (slug, name) => {
    let answer = window.confirm(`Are you sure you want to Delete ${name}?`);
    if (answer) {
      try {
        const res = await removeSub(slug, user.token);
        toast.success(`${res.data.name} deleted successfully`);
        loadSubs();
      } catch (err) {
        if (err.response.status === 400) toast.error(err.response.data);
      }
    }
  };

  const handleSelect = (e) => {
    setCategory(e.target.value)   
  }

  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

  return (
    <div className="container mt-5">
      <h4 className="text-center">Create Sub Category</h4>
      <div className="form-group">
        <label for="category">Parent Category</label>
        <select
          name="category"
          id="category"
          className="form-control"
          onChange={handleSelect}
        >
          <option>Please Select</option>
          {categories.length &&
            categories.map((c) => (
              <option value={c._id} key={c._id}>
                {c.name}
              </option>
            ))}
        </select>
      </div>
      <CategoryForm name={name} handleSubmit={handleSubmit} setName={setName} />
      <LocalSearch keyword={keyword} setKeyword={setKeyword} />
      {subs.filter(searched(keyword)).map((category) => (
        <div key={category._id} className="alert alert-secondary">
          {category.name}{" "}
          <span
            className=" btn btn-sm float-right text-danger"
            onClick={() => handleRemove(category.slug, category.name)}
          >
            <DeleteOutlined />
          </span>{" "}
          <span className=" btn btn-sm float-right text-warning">
            <Link to={`/admin/sub/${category.slug}`}>
              <EditOutlined />
            </Link>
          </span>{" "}
        </div>
      ))}
    </div>
  );
};

export default SubCreate;
