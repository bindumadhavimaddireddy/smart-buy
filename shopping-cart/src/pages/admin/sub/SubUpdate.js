import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getSub, updateSub } from "../../../functions/sub";
import { getCategories } from "../../../functions/category";
import CategoryForm from "../../../components/forms/CategoryForm";

const SubUpdate = ({ history, match }) => {
  const { user } = useSelector((state) => state);
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [parent, setParent] = useState("");


  let slug = match.params.slug;

  useEffect(() => {
    loadCategories();
    loadSub();
  }, []);

  const loadCategories = () =>
  getCategories().then((c) => setCategories(c.data));

  const loadSub = async () => {
    const res = await getSub(slug);
    setName(res.data.name);
    setParent(res.data.parent)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateSub(slug, name, parent, user.token)
      .then((res) => {
        toast.success(`${res.data.name} is Updated`);
        history.push("/admin/sub");
      })
      .catch((err) => {
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  const onCancel = () => {
    history.push("/admin/sub");
  }
 
  return (
    <div className="container mt-5">
      <h4 className="text-center">Update Sub</h4>
      <div className="form-group">
            <label>Parent category</label>
            <select
              name="category"
              className="form-control"
              onChange={(e) => setParent(e.target.value)}
            >
              <option>Please select</option>
              {categories.length > 0 &&
                categories.map((c) => (
                  <option key={c._id} value={c._id} selected={c._id === parent}>
                    {c.name}
                  </option>
                ))}
            </select>
        </div>
      <CategoryForm name={name} handleSubmit={handleSubmit} setName={setName} onCancel={onCancel}/>
      
    </div>
  );
};

export default SubUpdate;
