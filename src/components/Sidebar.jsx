import React from "react";
import Profile from "./Profile";
import styles from "../styles/Sidebar.module.scss";
import { BiLogOut } from "react-icons/bi";
import { useState } from "react";

const Sidebar = () => {
  const [isActive, setActive] = useState(false);

  const toggleClass = () => {
    setActive(!isActive);
  };

  console.log(isActive);

  return (
    <div className={styles.container}>
      <div className={styles.container__logo}>
        <img
          className={styles.container__image}
          src="https://cdn-icons-png.flaticon.com/512/2473/2473354.png"
          alt=""
        />
        <h2>Crypto</h2>
      </div>
      <div>
        <Profile />
        <div>Overview</div>
        <div>My Portfolio</div>
      </div>
      <div
        onClick={toggleClass}
        className={
          isActive ? "styles.buttons__logout__active" : "styles.buttons__logout"
        }
      >
        <BiLogOut />
        <h3>Logout</h3>
      </div>
    </div>
  );
};

export default Sidebar;
