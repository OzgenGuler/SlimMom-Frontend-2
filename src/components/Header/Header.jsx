import styles from "./Header.module.css";
import logo from "../../assets/mobilLogo.png";
// Icons
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";
import { IoReturnDownBack } from "react-icons/io5";

import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { useEffect, useState } from "react";
import { fetchUser } from "../../redux/auth/operations";

const Header = () => {
  const dispatch = useDispatch();
  const { username, token } = useSelector((state) => state.auth);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTabletOrMobile = useMediaQuery({ maxWidth: 1279 });
  const [isMenuShow, setIsMenuShow] = useState(false);

  useEffect(() => {
    if (token) {
      dispatch(fetchUser());
    }
  }, [dispatch, token]);

  return (
    <div className={styles.HeaderContainer}>
      <div className={styles.Header}>
        <div
          className={styles.Logo}
          onClick={() =>
            token
              ? (window.location.href = "/diary")
              : (window.location.href = "/")
          }
        >
          <img src={logo} className={styles.LogoImg} about="SlimMom Logo" />
          <p className={styles.LogoTitle}>
            Slim<span className={styles.LogoTitleSpan}>Mom</span>
          </p>
        </div>
        <div className={styles.HeaderDivider}>
          {!isTabletOrMobile ? (
            token ? (
              <ul className={styles.NavList}>
                <li className={styles.NavItem}>
                  <a href="/diary" className={styles.NavLink}>
                    Diary
                  </a>
                </li>
                <li className={styles.NavItem}>
                  <a href="/calculator" className={styles.NavLink}>
                    Calculator
                  </a>
                </li>
              </ul>
            ) : (
              <ul className={styles.NavList}>
                <li className={styles.NavItem}>
                  <a href="/login" className={styles.NavLink}>
                    Log In
                  </a>
                </li>
                <li className={styles.NavItem}>
                  <a href="/register" className={styles.NavLink}>
                    Registration
                  </a>
                </li>
              </ul>
            )
          ) : null}

          {!isMobile && token ? (
            <>
              <ul className={styles.AuthList}>
                <li className={styles.AuthItem}>
                  <a href="#" className={styles.AuthLink}>
                    {username && username}
                  </a>
                </li>
                <hr className={styles.AuthHr} />
                <li className={styles.AuthItem}>
                  <a href="/logout" className={styles.AuthLink}>
                    Exit
                  </a>
                </li>
              </ul>
            </>
          ) : null}
        </div>
        {isTabletOrMobile && (
          <div className={styles.BurgerMenu}>
            {isMenuShow ? (
              <IoMdClose
                size={24}
                onClick={() => {
                  setIsMenuShow(false);
                }}
              />
            ) : (
              <RxHamburgerMenu
                size={24}
                onClick={() => {
                  setIsMenuShow(true);
                }}
              />
            )}
          </div>
        )}
      </div>
      {isMobile && token ? (
        <div className={styles.SubHeader}>
          <div className={styles.AuthNav}>
            <IoReturnDownBack size={20} className={styles.AuthBtn} />
            <ul className={styles.AuthList}>
              <li className={styles.AuthItem}>
                <a href="#" className={styles.AuthLink}>
                  {username && username}
                </a>
              </li>
              <hr className={styles.AuthHr} />
              <li className={styles.AuthItem}>
                <a href="/logout" className={styles.AuthLink}>
                  Exit
                </a>
              </li>
            </ul>
          </div>
        </div>
      ) : null}
      {isTabletOrMobile && isMenuShow ? (
        <div className={styles.HeaderModalMenu}>
          <ul className={styles.ModalMenuList}>
            {token ? (
              <>
                <li className={styles.ModalMenuItem}>
                  <a href="/diary" className={styles.ModalMenuLink}>
                    Diary
                  </a>
                </li>
                <li className={styles.ModalMenuItem}>
                  <a href="/calculator" className={styles.ModalMenuLink}>
                    Calculator
                  </a>
                </li>
              </>
            ) : (
              <>
                <li className={styles.ModalMenuItem}>
                  <a href="/login" className={styles.ModalMenuLink}>
                    Log In
                  </a>
                </li>
                <li className={styles.ModalMenuItem}>
                  <a href="/register" className={styles.ModalMenuLink}>
                    Registration
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default Header;
