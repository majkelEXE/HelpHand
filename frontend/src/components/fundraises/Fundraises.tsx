import { useRecoilValue } from 'recoil';

import fundraisesState from '../../atoms/fundraises';
import FundraiseCard from './FundraiseCard';
import css from './Fundraises.module.css';

const Fundraises = () => {
  const fundraises = useRecoilValue(fundraisesState);

  return (
    <div className={css.fundraisesContainer}>
      {fundraises.map((f) => (
        <FundraiseCard fundraise={f} key={f.id} />
      ))}
    </div>
  );
};

export default Fundraises;
