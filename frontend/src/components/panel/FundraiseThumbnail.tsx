import { FC, MouseEvent } from 'react';
import { RiDeleteBin2Fill, RiEdit2Fill } from 'react-icons/ri';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';

import fundraiseModel from '../../models/Fundraise';
import css from './FundraiseThumbnail.module.css';

const FundraiseThumbnail: FC<{
  fundraise: fundraiseModel;
  deleteHandler: (e: MouseEvent<HTMLElement>, id: number) => void;
  editHandler: (e: MouseEvent<HTMLElement>, id: number) => void;
}> = ({ fundraise, deleteHandler, editHandler }) => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ query: "(max-width: 600px)" });
  return (
    <div
      className={css.thumbnailContainer}
      onClick={() => navigate("/fundraise/" + fundraise.id)}
    >
      <div className={css.thumbnailData}>
        <h1>{fundraise.name}</h1>
        <h2>{fundraise.description}</h2>
        <h3>{fundraise.location.name}</h3>
      </div>

      {!isMobile && (
        <img src={`/api${fundraise.image}`} className={css.image} />
      )}
      <div className={css.thumbnailAction}>
        <div onClick={(e) => editHandler(e, fundraise.id)}>
          <RiEdit2Fill />
        </div>
        <div onClick={(e) => deleteHandler(e, fundraise.id)}>
          <RiDeleteBin2Fill />
        </div>
      </div>
    </div>
  );
};

export default FundraiseThumbnail;
