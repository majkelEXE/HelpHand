import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';

import css from './Panel.module.css';

const Panel = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ query: "(max-width: 600px)" });

  return (
    <div className={isMobile ? css.mobilePanelContainer : css.panelContainer}>
      <div
        onClick={() => {
          navigate("/#/managevolunteers");
        }}
      >
        <h1>Wolontariat</h1>
        <img src="./images/volunteer.png" alt="volunteer" />
      </div>
      <div
        onClick={() => {
          navigate("/#/managefundraises");
        }}
      >
        <h1>Zbiórki</h1>
        <img src="./images/collection.png" alt="collections" />
      </div>
    </div>
  );
};

export default Panel;
