import React, { useContext } from "react";
import FirebaseContext from "../../contexts/firebaseContext";
import styles from "../../styles/Loginpage.module.scss";

const Register = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    handleSignInWithEmail,
    handleSignInWithGoogle,
  } = useContext(FirebaseContext);

  return (
    <div>
      {" "}
      <div className={styles.google}>
        <button onClick={() => handleSignInWithGoogle()}>
          Sign In With Google
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
          type="text"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={() => handleSignInWithEmail()}>
          Sign In With Email
        </button>
      </div>
    </div>
  );
};

export default Register;
