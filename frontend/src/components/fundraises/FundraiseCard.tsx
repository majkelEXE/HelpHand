import { FC } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';

import fundraiseModel from '../../models/Fundraise';
import css from './FundraiseCard.module.css';

const FundraiseCard: FC<{ fundraise: fundraiseModel }> = ({ fundraise }) => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ query: "(max-width: 600px)" });

  return (
    <div
      className={css.card}
      onClick={() => navigate(`/#/fundraise/${fundraise.id}`)}
    >
      <div className={css.data}>
        <h1 className={css.name}>{fundraise.name}</h1>
        <h2 className={css.desc}>{fundraise.description}</h2>
        <h3 className={css.address}>{fundraise.location.name}</h3>
      </div>
      {!isMobile && (
        <div className={css.imageContainer}>
          <img
            src={
              process.env.REACT_APP_RUNNING == "DEV"
                ? `/api${fundraise.image}`
                : fundraise.image
            }
            alt="IMAGE"
          />
        </div>
      )}
    </div>
  );
};

export default FundraiseCard;
