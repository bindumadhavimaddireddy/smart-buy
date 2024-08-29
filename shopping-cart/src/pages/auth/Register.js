import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {toast} from 'react-toastify';
// import {auth} from '../../firebase';
import { getAuth, sendSignInLinkToEmail } from "firebase/auth";

const Register = ({history}) => {
  const [email, setEmail] = useState("");

  const { user } = useSelector((state) => state);

  useEffect(() => {
    if (user && user.token) {
      history.push("/");
    }
  }, [user, history]);

  const handleSubmit = async (e) => {

    e.preventDefault();

    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true
    }

    console.log('email', email);
    const auth = getAuth();

    try {
      await sendSignInLinkToEmail(auth, email, config);
      toast.success(`Email is sent to ${email}. Click the link to complete the registration`);
      window.localStorage.setItem('emailForRegistration', email)
      setEmail('');
    } catch(e) {
      console.log('--error--', e)
    }

  };

  const registerForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          className="form-control"
          placeholder="Your Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          autoFocus
        />
        <button type="submit" className="btn btn-raised">
          Register
        </button>
      </form>
    );
  };
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register</h4>
          {registerForm()}
        </div>
      </div>
    </div>
  );
};

export default Register;
