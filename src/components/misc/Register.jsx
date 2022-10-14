import React, { useContext } from "react";
import FirebaseContext from "../../contexts/firebaseContext";
import styles from "../../styles/Loginpage.module.scss";

const Register = () => {
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
          Sign Up with Google
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
          Sign In With Email
        </button>
      </div>
    </>
  );
};

export default Register;
