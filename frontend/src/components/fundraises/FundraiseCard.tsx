import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import fundraiseModel from '../../models/Fundraise';
import css from './FundraiseCard.module.css';

const FundraiseCard: FC<{ fundraise: fundraiseModel }> = ({ fundraise }) => {
  const navigate = useNavigate();

  return (
    <div
      className={css.card}
      onClick={() => navigate(`/fundraise/${fundraise.id}`)}
    >
      <div className={css.data}>
        <h1 className={css.name}>{fundraise.name}</h1>
        <h2 className={css.desc}>{fundraise.description}</h2>
        <h3 className={css.address}>{fundraise.location.name}</h3>
      </div>
      <div className={css.imageContainer}>
        <img src={`/api${fundraise.image}`} alt="IMAGE" />
      </div>
    </div>
  );
};

export default FundraiseCard;
