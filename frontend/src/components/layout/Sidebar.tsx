import { Dispatch, FC, SetStateAction } from 'react';
import { Link, useLocation } from 'react-router-dom';

import css from './Sidebar.module.css';

const Sidebar: FC<{ setShowSideBar: Dispatch<SetStateAction<boolean>> }> = ({
  setShowSideBar,
}) => {
  const location = useLocation();

  return (
    <div className={css.sidebar}>
      <Link
        to={"/"}
        className={`${css.link} ${location.pathname == "/" ? css.current : ""}`}
        onClick={() => setShowSideBar(false)}
      >
        Zbiórki
      </Link>
      <Link
        to={"/map"}
        className={`${css.link} ${
          location.pathname == "/map" ? css.current : ""
        }`}
        onClick={() => setShowSideBar(false)}
      >
        Mapa Zbiórek
      </Link>
      <Link
        to={"/voluntary"}
        className={`${css.link} ${
          location.pathname == "/voluntary" ? css.current : ""
        }`}
        onClick={() => setShowSideBar(false)}
      >
        Wolontariaty
      </Link>
    </div>
  );
};

export default Sidebar;
