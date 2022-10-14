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
          Sign In with Google
        </button>
      </div>
      <div className={styles.emailsign}>
        <h1>Email</h1>
        <input
          type="text"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <h1>Password</h1>
        <input
          type="password"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className={styles.signbutton}
          onClick={() => handleCreateUserWithEmail()}
        >
          Login
        </button>
      </div>
    </>
  );
}

export default Login;
