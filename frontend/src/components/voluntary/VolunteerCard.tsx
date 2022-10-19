import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import volunteerModel from '../../models/Volunteer';
import css from './VolunteerCard.module.css';

const VolunteerCard: FC<{ volunteer: volunteerModel }> = ({ volunteer }) => {
  const navigate = useNavigate();

  return (
    <div
      className={css.card}
      onClick={() => navigate(`/volunteer/${volunteer.id}`)}
    >
      <div className={css.data}>
        <h1 className={css.role}>{volunteer.role}</h1>
        <h2 className={css.desc}>{volunteer.description}</h2>
        <div className={css.skills}>
          {volunteer.skills.slice(0, 3).map((s, i) => (
            <p key={i} className={css.skill}>
              - {s.name}
            </p>
          ))}
        </div>
      </div>
      <div className={css.imageContainer}>
        <img src={`/api${volunteer.image}`} alt="IMAGE" />
      </div>
    </div>
  );
};

export default VolunteerCard;
