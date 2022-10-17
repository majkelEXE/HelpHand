import { useRecoilValue } from 'recoil';

import errorSummaryState from '../../atoms/errorSummary';
import css from './ErrorSummary.module.css';

const ErrorSummary = () => {
  const errorSummary = useRecoilValue(errorSummaryState);

  return (
    <div className={css.errorSummaryContainer}>
      {errorSummary.map((e) => (
        <p>{e}</p>
      ))}
    </div>
  );
};

export default ErrorSummary;
