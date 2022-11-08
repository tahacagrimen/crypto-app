import React from "react";
import Profile from "./Profile";
import styles from "../styles/Sidebar.module.scss";
import { BiLogOut } from "react-icons/bi";
import { HiOutlineX } from "react-icons/hi";
import { BsWallet2 } from "react-icons/bs";
import { FaThList } from "react-icons/fa";
import { useState, useContext } from "react";
import CoinContext from "../contexts/coinContext";
import FirebaseContext from "../contexts/firebaseContext";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { GoPrimitiveDot } from "react-icons/go";

const Sidebar = () => {
  const { isSidebarOpen, setSidebarOpen } = useContext(CoinContext);

  const { handleLogout } = useContext(FirebaseContext);

  const { pathname } = useLocation();

  let navigate = useNavigate();

  const handleNavigateOverview = () => {
    if (pathname !== "/overview") {
      navigate("/overview");
    }
  };

  const handleNavigatePortfolio = () => {
    if (pathname !== "/portfolio") {
      navigate("/portfolio");
    }
  };

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
      <div
        onClick={() => handleNavigateOverview()}
        className={styles.container__logo}
      >
        <svg
          width="36"
          height="20"
          viewBox="0 0 36 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.3431 0C10.3124 0 8.36487 0.8067 6.92893 2.24264L2.24264 6.92893C0.8067 8.36487 0 10.3124 0 12.3431C0 16.5719 3.42809 20 7.65687 20C9.6876 20 11.6351 19.1933 13.0711 17.7573L16.3126 14.5158C16.3126 14.5157 16.3127 14.5159 16.3126 14.5158L25.7573 5.07107C26.4431 4.38527 27.3733 4 28.3431 4C29.9669 4 31.3435 5.05827 31.8207 6.52271L34.8015 3.54197C33.4417 1.41223 31.0573 0 28.3431 0C26.3124 0 24.3649 0.8067 22.9289 2.24264L10.2427 14.9289C9.55687 15.6147 8.62673 16 7.65687 16C5.63723 16 4 14.3628 4 12.3431C4 11.3733 4.38527 10.4431 5.07107 9.75733L9.75733 5.07107C10.4431 4.38527 11.3733 4 12.3431 4C13.9669 4 15.3435 5.05832 15.8207 6.52281L18.8015 3.54205C17.4417 1.41227 15.0574 0 12.3431 0Z"
            fill="#6154F0"
          />
          <path
            d="M10.0439 14.9289C9.35807 15.6147 8.42793 16 7.45807 16C5.83453 16 4.45807 14.942 3.98067 13.4778L1 16.4585C2.35987 18.5879 4.74406 20 7.45807 20C9.4888 20 11.4363 19.1933 12.8723 17.7573L25.5585 5.07107C26.2443 4.38527 27.1745 4 28.1443 4C30.164 4 31.8012 5.63723 31.8012 7.65687C31.8012 8.62673 31.4159 9.55687 30.7301 10.2427L26.0439 14.9289C25.3581 15.6147 24.4279 16 23.4581 16C21.8344 16 20.4579 14.9418 19.9805 13.4775L16.9999 16.4582C18.3597 18.5879 20.7439 20 23.4581 20C25.4888 20 27.4363 19.1933 28.8723 17.7573L33.5585 13.0711C34.9945 11.6351 35.8012 9.6876 35.8012 7.65687C35.8012 3.42809 32.3731 0 28.1443 0C26.1136 0 24.1661 0.8067 22.7301 2.24264L10.0439 14.9289Z"
            fill="#6154F0"
          />
        </svg>
        <h2>Crypto Tracker</h2>
      </div>
      <div className={styles.menu}>
        <Profile />
        <div
          onClick={() => handleNavigateOverview()}
          className={styles.menu__overview}
        >
          <FaThList
            className={`${
              pathname === "/overview" ? styles["activeicon"] : styles["icon"]
            }`}
          />
          <h3
            className={`${
              pathname === "/overview" ? styles["activeh3"] : styles["h3"]
            }`}
          >
            Overview
          </h3>
          <GoPrimitiveDot
            className={`${
              pathname === "/overview" ? styles["activeicon2"] : styles["icon2"]
            }`}
          />
        </div>
        <div
          className={styles.menu__portfolio}
          onClick={() => handleNavigatePortfolio()}
        >
          <BsWallet2 className={styles.icon} />
          <h3>My Portfolio</h3>
          <GoPrimitiveDot className={styles.icon2} />
        </div>
      </div>
      <div className={styles.menu__logout} onClick={() => handleLogout()}>
        <BiLogOut className={styles.icon} />
        <h3>Logout</h3>
      </div>
    </div>
  );
};

export default Sidebar;
