import React, { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import styles from "../styles/Profile.module.scss";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import FirebaseContext from "../contexts/firebaseContext";

const Profile = () => {
  const user = auth.currentUser;

  const { name, pic, email, setName, setPic, setEmail, uid, setUid } =
    useContext(FirebaseContext);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setPic(user.photoURL);
        setEmail(user.email);
        setUid(user.uid);
        setName(user.displayName);
      } else {
      }
    }).bind(this);
  }, []);

  let navigate = useNavigate();

  return (
    <>
      {user ? (
        <div className={styles.container}>
          <div className={styles.container__img}>
            <img referrerPolicy="no-referrer" src={pic} alt="" />
          </div>
          <div className={styles.container__name}>
            <h1>{name}</h1>
            <h2>{email}</h2>
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
