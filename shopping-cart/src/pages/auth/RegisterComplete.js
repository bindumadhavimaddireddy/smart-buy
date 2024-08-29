import React, { useState, useEffect } from "react";
import {toast} from 'react-toastify';
import {auth} from '../../firebase';
import { signInWithEmailLink, updatePassword } from 'firebase/auth';
import { useDispatch } from "react-redux";
import { createOrUpdateUser } from "../../functions/auth";

const RegisterComplete = ({history}) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const { user } = useSelector((state) => state);

  useEffect(() => {
    setEmail(window.localStorage.getItem('emailForRegistration'))
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validation 

    if(!email || !password){
        toast.error('Email and Password is Required');
        return;
    }
    if(password.length < 6){
        toast.error('Password must be atleast 6 characters long');
        return;
    }
    try {
        const result = await signInWithEmailLink(auth, email, window.location.href)
        console.log('--result---', result);
        if(result.user.emailVerified){
            // remove user email from local storage
            window.localStorage.removeItem('emailForRegistration');

            // get user id token 
            let user = auth.currentUser
            await updatePassword(user, password);
            const idTokenResult = await user.getIdTokenResult();

            console.log('idTokenResult',idTokenResult);

            // redux store
            createOrUpdateUser(idTokenResult.token)
            .then((res) => {
              dispatch({
                type: "LOGGED_IN_USER",
                payload: {
                  name: res.data.name,
                  email: res.data.email,
                  token: idTokenResult.token,
                  role: res.data.role,
                  _id: res.data._id
                },
              });
            })
            .catch(err => toast.error(err.message));
            // redirect
            history.push('/');
        }
    }catch (err){
      console.log('--err---', err);
        toast.error(err.message);
    }
  };

  const completeRegistrationForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          className="form-control mb-3"
          value={email}
          disabled
        />
        <input
          type="password"
          className="form-control mb-3"
          value={password}
          placeholder="Password"
          autoFocus
          onChange={(event) => setPassword(event.target.value)}
        />
        <button type="submit" className="btn btn-raised">
          Complete Registration
        </button>
      </form>
    );
  };
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register Complete</h4>
          {completeRegistrationForm()}
        </div>
      </div>
    </div>
  );
};

export default RegisterComplete;
