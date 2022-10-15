import React from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import styles from "../styles/Profile.module.scss";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const user = auth.currentUser;

  let navigate = useNavigate();

  console.log(user);

  return (
    <>
      {user ? (
        <div className={styles.container}>
          <div className={styles.container__img}>
            <img src={user.photoURL} alt="" />
          </div>
          <div className={styles.container__name}>
            <h1>{user.displayName}</h1>
            <h2>{user.email}</h2>
          </div>
        </div>
      ) : (
        <div className={styles.nouser}>
          <button onClick={() => navigate("/")}>Login</button>
        </div>
      )}
    </>
  );
};

export default Profile;
