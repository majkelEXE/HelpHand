import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';

import css from './Knowledge.module.css';
import Lesson from './Lesson';
import Quiz from './Quiz';

const Knowledge = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);

  const isMobile = useMediaQuery({ query: "(max-width: 600px)" });

  return isStarted ? (
    showQuiz ? (
      <Quiz />
    ) : (
      <Lesson goToQuiz={() => setShowQuiz(true)} />
    )
  ) : (
    <div
      className={`${
        isMobile ? css.mobileKnowledgeContainer : css.knowledgeContainer
      }`}
    >
      <h1>
        Tutaj dowiesz się o wiele więcej o zbiórkach i wolontariatach oraz o tym
        jak ważną rolę pełnią w społeczeństwie!
      </h1>
      <div className={`bigPrimaryButton`} onClick={() => setIsStarted(true)}>
        Zaczynamy!
      </div>
    </div>
  );
};

export default Knowledge;
