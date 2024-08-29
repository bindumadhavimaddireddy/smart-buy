import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createProduct } from "../../../functions/product";
import { getCategories, getCategorySubs } from "../../../functions/category";
import ProductCreateForm from "../../../components/forms/ProductCreateForm";
import FileUpload from "../../../components/forms/FileUpload";
import { LoadingOutlined } from "@ant-design/icons";


const initialState = {
  title: "Mackbook pro2",
  description: "mackbook from apple",
  price: 400,
  categories: [],
  category: "",
  subs: [],
  shipping: "No",
  quantity: 40,
  images: [],
  colors: ["Black", "Brown", "Silver", "White", "Blue"],
  brands: ["Apple", "Microsoft", "Samsung", "Lenovo", "ASUS", "LG", "SONY", "SAMSUNG", "VIVO", "OPPO", "REDME"],
  color: "",
  brand: "",
};

const ProductCreate = () => {
  const [values, setValues] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [subOptions, setSubOptions]= useState([]);
  // redux
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    loadSubs();
  }, [values.category])

  const loadSubs = async() => {
    const {category} = values;
    if(category){
      const res = await getCategorySubs(category);
      setValues({...values, subs: []})
      setSubOptions(res.data);
      return;
    }
    setValues({...values, subs: []})
    setSubOptions([]);
  }

  const loadCategories = async () => {
    const res = await getCategories();
    setValues({...values, categories: res.data})
  };

  const handleValidations = () => {
    if(!values.category){
      toast.error('Please select category')
      return false;
    }
    if(!values.shipping){
      toast.error('Please select Shipping')
      return false;
    }
    if(!values.brand){
      toast.error('Please select brand')
      return false;
    }
    if(!values.color){
      toast.error('Please select color')
      return false;
    }
    if(!values.subs.length){
      toast.error('Please select Atleast one Sub Categories')
      return false;
    }
    return true;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!handleValidations()){
      return;
    }
    console.log('values', values);
  
    try {
      const res = await createProduct(values, user.token);
      console.log(res);
      toast.success(`${res.data.title} Created Successfully`);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.err);
    }
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    console.log(e.target.name, " ----- ", e.target.value);
  };

  return (
    <div className="container mt-5">
      {loading ? (
            <LoadingOutlined className="text-danger h1" />
          ) : (
            <h4 className="text-center ">Product create</h4>
          )}
      <div className="p-3">
        <FileUpload values={values} setValues={setValues} setLoading={setLoading}/>
      </div>
      <ProductCreateForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        setValues={setValues}
        values={values}
        subOptions={subOptions}
      />
    </div>
  );
};

export default ProductCreate;
