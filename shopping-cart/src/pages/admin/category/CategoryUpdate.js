import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getCategory, updateCategory } from "../../../functions/category";
import CategoryForm from "../../../components/forms/CategoryForm";

const CategoryUpdate = ({ history, match }) => {
  const { user } = useSelector((state) => state);
  const [name, setName] = useState("");


  let slug = match.params.slug;

  useEffect(() => {
    loadCategory();
  }, []);

  const loadCategory = async () => {
    const res = await getCategory(slug);
    setName(res.data.name);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateCategory(slug, name, user.token)
      .then((res) => {
        toast.success(`${res.data.name} is Updated`);
        history.push("/admin/category");
      })
      .catch((err) => {
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

 const onCancel = () => {
  history.push("/admin/category");
 }

  return (
    <div>
      <h4>Update Category</h4>
      <CategoryForm name={name} handleSubmit={handleSubmit} setName={setName} onCancel={onCancel}/>
    </div>
  );
};

export default CategoryUpdate;
