import React, { useContext } from "react";
import FirebaseContext from "../../contexts/firebaseContext";
import styles from "../../styles/Loginpage.module.scss";

function Login() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    handleSignInWithEmail,
    handleSignInWithGoogle,
  } = useContext(FirebaseContext);

  return <div></div>;
}

export default Login;
