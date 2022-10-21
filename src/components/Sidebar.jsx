import React from "react";
import Profile from "./Profile";
import styles from "../styles/Sidebar.module.scss";
import { BiLogOut } from "react-icons/bi";
import { HiOutlineX } from "react-icons/hi";
import { BsWallet2 } from "react-icons/bs";
import { FaThList } from "react-icons/fa";
import { useState, useContext } from "react";
import CoinContext from "../contexts/coinContext";

const Sidebar = () => {
  const { isSidebarOpen, setSidebarOpen } = useContext(CoinContext);

  return (
    <div
      className={`${styles.container} ${
        isSidebarOpen ? styles["container--open"] : styles["container--close"]
      } `}
    >
      <div
        className={`${styles.container__x} ${
          isSidebarOpen
            ? styles["container__x--open"]
            : styles["container__x--close"]
        } `}
        onClick={() => setSidebarOpen(false)}
      >
        <HiOutlineX onClick={() => setSidebarOpen(false)} />
      </div>
      <div className={styles.container__logo}>
        <img
          className={styles.container__image}
          src="https://cdn-icons-png.flaticon.com/512/2473/2473354.png"
          alt=""
        />
        <h2>Crypto</h2>
      </div>
      <div className={styles.menu}>
        <Profile />
        <div className={styles.menu__overview}>
          <FaThList className={styles.icon} />
          <h3>Overview</h3>
        </div>
        <div className={styles.menu__portfolio}>
          <BsWallet2 className={styles.icon} />
          <h3>My Portfolio</h3>
        </div>
      </div>
      <div className={styles.menu__logout}>
        <BiLogOut className={styles.icon} />
        <h3>Logout</h3>
      </div>
    </div>
  );
};

export default Sidebar;
