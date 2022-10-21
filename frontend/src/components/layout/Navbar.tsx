import { Dispatch, FC, SetStateAction } from 'react';
import { RiMenuFill } from 'react-icons/ri';
import { useMediaQuery } from 'react-responsive';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';

import modalComponentState from '../../atoms/modalComponent';
import showModalState from '../../atoms/showModal';
import tokenState from '../../atoms/token';
import Logo from './Logo';
import css from './Navbar.module.css';

const Navbar: FC<{ setShowSideBar: Dispatch<SetStateAction<boolean>> }> = ({
  setShowSideBar,
}) => {
  //localStorage.setItem("current_user", "AAA");
  const token = useRecoilValue(tokenState);
  const resetToken = useResetRecoilState(tokenState);
  const setModalComponent = useSetRecoilState(modalComponentState);
  const setShowModal = useSetRecoilState(showModalState);
  const navigate = useNavigate();

  const isMobile = useMediaQuery({ query: "(max-width: 600px)" });

  return (
    <div className={css.navbarContainer}>
      <div className={css.menu}>
        <RiMenuFill onClick={() => setShowSideBar((prevState) => !prevState)} />
      </div>

      <div className={css.logo} onClick={() => navigate("/")}>
        {!isMobile && (
          <h1>
            <span>Help</span>Hand
          </h1>
        )}

        <Logo />
      </div>

      <div className={css.accountContainer}>
        {!token ? (
          <>
            <div
              className={"secondaryButton"}
              onClick={() => {
                setModalComponent("register");
                setShowModal(true);
              }}
            >
              Zarejestruj
            </div>
            <div
              className={"primaryButton"}
              onClick={() => {
                setModalComponent("login");
                setShowModal(true);
              }}
            >
              Zaloguj
            </div>
          </>
        ) : (
          <>
            <Link to={"/"} className={"secondaryButton"} onClick={resetToken}>
              Wyloguj
            </Link>
            <Link to={"/panel"} className={"primaryButton"}>
              Panel
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
