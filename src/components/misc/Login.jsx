import React, { useContext } from "react";
import FirebaseContext from "../../contexts/firebaseContext";
import styles from "../../styles/Loginpage.module.scss";

function Login() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    handleCreateUserWithEmail,
    handleSignInWithGoogle,
  } = useContext(FirebaseContext);

  return (
    <>
      <div className={styles.google}>
        <button onClick={() => handleSignInWithGoogle()}>
          Login with Google
        </button>
      </div>
    </>
  );
}

export default Login;
