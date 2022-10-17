import { Dispatch, FC, SetStateAction } from 'react';
import { Link } from 'react-router-dom';

import css from './Sidebar.module.css';

const Sidebar: FC<{ setShowSideBar: Dispatch<SetStateAction<boolean>> }> = ({
  setShowSideBar,
}) => {
  return (
    <div className={css.sidebar}>
      <Link to={"/"} className={css.link} onClick={() => setShowSideBar(false)}>
        Zbiórki
      </Link>
      <Link
        to={"/map"}
        className={css.link}
        onClick={() => setShowSideBar(false)}
      >
        Mapa Zbiórek
      </Link>
      <Link
        to={"/voluntary"}
        className={css.link}
        onClick={() => setShowSideBar(false)}
      >
        Wolontariaty
      </Link>
    </div>
  );
};

export default Sidebar;
