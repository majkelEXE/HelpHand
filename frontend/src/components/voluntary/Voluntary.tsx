import { useRecoilValue } from 'recoil';

import volunteersState from '../../atoms/volunteers';
import css from './Voluntary.module.css';
import VolunteerCard from './VolunteerCard';

const Voluntary = () => {
  const volunteers = useRecoilValue(volunteersState);

  return (
    <div className={css.voluntaryContainer}>
      {volunteers.map((v) => (
        <VolunteerCard key={v.id} volunteer={v} />
      ))}
    </div>
  );
};

export default Voluntary;
