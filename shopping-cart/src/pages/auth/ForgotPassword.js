import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../firebase";
import { sendPasswordResetEmail } from 'firebase/auth';

const ForgotPassword = ({ history }) => {
  const { user } = useSelector((state) => state);

  useEffect(() => {
    if (user && user.token) {
      history.push("/");
    }
  }, [user]);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const config = {
      url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT, // redirected to this page after password reset success
      handleCodeInApp: true,
    };
    await sendPasswordResetEmail(auth, email, config)
      .then(() => {
        setEmail("");
        setLoading(false);
        toast.success(`Reset Password link sent to ${email}`);
      })
      .catch((err) => {
        toast.error(err.message);
        setLoading(false);
      });
  };

  return (
    <div className="container col-md-6 offset-md-3 p-5">
      {loading ? (
        <h4 className="text-dnger">Loading ....</h4>
      ) : (
        <h4>Forgot Password</h4>
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          className="form-control mb-3"
          placeholder="Your Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          autoFocus
        />
        <button className="btn btn-raised" disabled={!email} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
