import { FC } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';

import css from './Result.module.css';

const Result: FC<{ points: number }> = ({ points }) => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ query: "(max-width: 600px)" });

  return (
    <div
      className={`${
        isMobile ? css.mobileResultContainer : css.resultContainer
      }`}
    >
      <h1>Gratulacje!</h1>
      <h2>Twój wynik to {((points / 9) * 100).toFixed()}%</h2>
      <div className="bigPrimaryButton" onClick={() => navigate("/")}>
        Super!
      </div>
    </div>
  );
};

export default Result;
