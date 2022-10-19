import { FC, MouseEvent } from 'react';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';

import volunteerModel from '../../models/Volunteer';
import css from './VolunteerThumbnail.module.css';

const VolunteerThumbnail: FC<{
  volunteer: volunteerModel;
  deleteHandler: (e: MouseEvent<HTMLElement>, id: number) => void;
}> = ({ volunteer, deleteHandler }) => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ query: "(max-width: 600px)" });

  return (
    <div
      className={css.thumbnailContainer}
      onClick={() => navigate("/volunteer/" + volunteer.id)}
    >
      <div className={css.thumbnailData}>
        <h1>{volunteer.role}</h1>
        <h2>{volunteer.description}</h2>
      </div>

      {!isMobile && (
        <img src={`/api${volunteer.image}`} className={css.image} />
      )}

      <div
        className={css.thumbnailAction}
        onClick={(e) => deleteHandler(e, volunteer.id)}
      >
        <RiDeleteBin2Fill />
      </div>
    </div>
  );
};

export default VolunteerThumbnail;
