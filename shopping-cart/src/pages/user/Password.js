import React, { useState } from "react";
import { toast } from "react-toastify";
import UserNav from "../../components/nav/UserNav";
import { auth } from "../../firebase";

const Password = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await auth.currentUser
      .updatePassword(password)
      .then(() => {
        setLoading(false);
        setPassword("");
        toast.success("Changed Password Successfully");
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.message);
      });
  };

  const passwordUpdateForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>New Password</label>
          <input
            type="password"
            onChange={(event) => setPassword(event.target.value)}
            className="form-control"
            placeholder="Enter new Password"
            disabled={loading}
            value={password}
          />
          <button
            className="btn btn-primary"
            type="submit"
            disabled={!password || password.length < 6 || loading}
          >
            Submit
          </button>
        </div>
      </form>
    );
  };
  return (
    <div className="container-fluid">
      <div className="col">
        {loading ? (
          <h4 className="text-danger">Loading...</h4>
        ) : (
          <h4>Password Update</h4>
        )}
        {passwordUpdateForm()}
      </div>
    </div>
  );
};

export default Password;
