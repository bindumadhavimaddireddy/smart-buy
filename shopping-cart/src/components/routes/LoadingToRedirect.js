import React, {useState, useEffect} from "react";
import {  useHistory } from "react-router-dom";


const LoadingToRedirect = ({ children, ...rest }) => {
 const [count, setCount] = useState(5);
 let history = useHistory();

 useEffect(() => {
    const interval = setInterval(() => {
        setCount(currentCount  => --currentCount);
    }, 1000);

    // REDIRECT WHEN COUNT=0
    !count && history.push('/')

    // clean up
    return () => clearInterval(interval);
 }, [count])
    return <div className="container p-5 center"><p>Redirecting you in {count} seconds</p></div>
};

export default LoadingToRedirect;
