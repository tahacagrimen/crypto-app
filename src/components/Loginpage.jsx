import React, { useContext } from "react";
import styles from "../styles/Loginpage.module.scss";
import FirebaseContext from "../contexts/firebaseContext";

const Loginpage = () => {
  const { user, setUser } = useContext(FirebaseContext);

  return <div className={styles.container}>Loginpage</div>;
};

export default Loginpage;
