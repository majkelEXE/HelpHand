import { FC, PropsWithChildren, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useRecoilValue } from 'recoil';

import modalComponentState from '../../atoms/modalComponent';
import showModalState from '../../atoms/showModal';
import Login from '../account/Login';
import Register from '../account/Register';
import ErrorSummary from './ErrorSummary';
import css from './Layout.module.css';
import Modal from './Modal';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout: FC<PropsWithChildren> = ({ children }) => {
  const [showSideBar, setShowSideBar] = useState(false);
  const showModal = useRecoilValue(showModalState);
  const modalComponent = useRecoilValue(modalComponentState);
console.log(process.env.REACT_APP_MAPTILER_API_KEY)

  const renderModalComponent = () => {
    switch (modalComponent) {
      case "login":
        return <Login />;
      case "register":
        return <Register />;
      case "errorSummary":
        return <ErrorSummary />;
      default:
        return <div></div>;
    }
  };

  return (
    <>
      <Navbar setShowSideBar={setShowSideBar} />
      <div className={css.content}>
        <CSSTransition
          in={showSideBar}
          timeout={300}
          classNames={{
            enter: css.enter,
            enterActive: css.enterActive,
            exit: css.exit,
            exitActive: css.exitActive,
          }}
          unmountOnExit
        >
          <Sidebar setShowSideBar={setShowSideBar} />
        </CSSTransition>
        <div>{children}</div>
      </div>
      {showModal && <Modal>{renderModalComponent()}</Modal>}
    </>
  );
};

export default Layout;
