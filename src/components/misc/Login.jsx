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
          Login with{" "}
          <img
            src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-google-sva-scholarship-20.png"
            alt=""
          />
        </button>
      </div>
    </>
  );
}

export default Login;
