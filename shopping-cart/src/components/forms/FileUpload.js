import React from "react";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Avatar, Badge } from "antd";

const FileUpload = ({ values, setValues, setLoading }) => {
  const { user } = useSelector((state) => ({ ...state }));

  const fileUploadAndResize = (e) => {
    // console.log(e.target.files);
    // resize
    let files = e.target.files; // 3
    let allUploadedFiles = values.images;

    if (files) {
      setLoading(true);
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          "JPEG",
          100,
          0,
          (uri) => {
            // console.log(uri);
            axios
              .post(
                `${process.env.REACT_APP_API}/uploadimages`,
                { image: uri },
                {
                  headers: {
                    authtoken: user ? user.token : "",
                  },
                }
              )
              .then((res) => {
                console.log("IMAGE UPLOAD RES DATA", res);
                setLoading(false);
                allUploadedFiles.push(res.data);

                setValues({ ...values, images: allUploadedFiles });
                toast.success("Upload Image successfully");
              })
              .catch((err) => {
                setLoading(false);
                console.log("CLOUDINARY UPLOAD ERR", err);
                toast.error("Error in Uploading the image");
              });
          },
          "base64"
        );
      }
    }
    // send back to server to upload to cloudinary
    // set url to images[] in the parent component state - ProductCreate
  };

  const handleRemove = (public_id) => {
    setLoading(true);
    axios.post(`${process.env.REACT_APP_API}/removeimage`, {public_id}, {
        headers: {
            authtoken: user ? user.token : '',
        }
    }).then(res => {
        setLoading(false);
        const {images} = values;
        let filteredImages = images.filter(item => item.public_id!== public_id);
        setValues({...values, images: filteredImages});
    }).catch(err => {
        console.log('err', err);
        setLoading(false);
    })
  }

  return (
    <>
      <div className="row">
        {values.images.length > 0 &&
          values.images.map((image) => (
            <Badge count="X" onClick={() => handleRemove(image.public_id)} style={{cursor: "pointer"}}>
              <Avatar
                key={image.public_id}
                src={image.url}
                size={100}
                shape="square"
                className="ml-3"
              />
            </Badge>
          ))}
      </div>
      <div className="row">
        <label className="btn btn-primary">
          Choose File
          <input
            type="file"
            multiple
            hidden
            accept="images/*"
            onChange={fileUploadAndResize}
          />
        </label>
      </div>
    </>
  );
};

export default FileUpload;
