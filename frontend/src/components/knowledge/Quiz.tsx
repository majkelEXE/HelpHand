import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';

import css from './Quiz.module.css';
import Result from './Result';

const Quiz = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 600px)" });
  const [stage, setStage] = useState(0);
  const [points, setPoints] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const correctGuess = () => {
    setPoints((prevState) => prevState + 1);

    incrementStage();
  };

  const badGuess = () => {
    incrementStage();
  };

  const incrementStage = () => {
    if (stage < 8) {
      setStage((prevState) => prevState + 1);
    } else {
      setShowResult(true);
    }
  };

  const render = () => {
    switch (stage) {
      case 0:
        return (
          <div className={`${isMobile ? css.mobileQuestions : css.quesitons}`}>
            <h1>Jakie warunki musi spełniać wolontariat?</h1>
            <div className="primaryButton" onClick={badGuess}>
              Musi być dobrowolny
            </div>
            <div className="primaryButton" onClick={badGuess}>
              Musi być wykonywany świadomie oraz bez wynagrodzenia
            </div>
            <div className="primaryButton" onClick={correctGuess}>
              Musi być dobrowolny, wykonywany świadomie oraz bez wynogrodzenia
            </div>

            <div className="primaryButton" onClick={badGuess}>
              Musi być wykonywany świadomie oraz pod przymusem
            </div>
          </div>
        );
      case 1:
        return (
          <div className={`${isMobile ? css.mobileQuestions : css.quesitons}`}>
            <h1>Czym może być wynagrodzenie nie materialne?</h1>
            <div className="primaryButton" onClick={correctGuess}>
              Lepsza pozycja na rynku pracy
            </div>
            <div className="primaryButton" onClick={badGuess}>
              Pieniądze w innej walucie
            </div>
            <div className="primaryButton" onClick={badGuess}>
              Vouchery
            </div>

            <div className="primaryButton" onClick={badGuess}>
              Urządzenia elektroniczne
            </div>
          </div>
        );
      case 2:
        return (
          <div className={`${isMobile ? css.mobileQuestions : css.quesitons}`}>
            <h1>
              Która praca na rzecz innych <span>nie</span> jest wolontariatem?
            </h1>
            <div className="primaryButton" onClick={badGuess}>
              Pomoc w organizowaniu maratonu
            </div>
            <div className="primaryButton" onClick={badGuess}>
              Pomoc w schronisku
            </div>
            <div className="primaryButton" onClick={badGuess}>
              Pomoc w szkolenj bibliotece
            </div>
            <div className="primaryButton" onClick={correctGuess}>
              Pomoc własnej babci
            </div>
          </div>
        );
      case 3:
        return (
          <div className={`${isMobile ? css.mobileQuestions : css.quesitons}`}>
            <h1>Co jest zasadniczym pojęciem związanym z wolontariatem</h1>
            <div className="primaryButton" onClick={badGuess}>
              Czas
            </div>
            <div className="primaryButton" onClick={correctGuess}>
              Motywacja
            </div>
            <div className="primaryButton" onClick={badGuess}>
              Szybkość
            </div>
            <div className="primaryButton" onClick={badGuess}>
              Integracja
            </div>
          </div>
        );
      case 4:
        return (
          <div className={`${isMobile ? css.mobileQuestions : css.quesitons}`}>
            <h1>Który projekt jest oparty na wolontariacie?</h1>
            <div className="primaryButton" onClick={correctGuess}>
              Wikipedia
            </div>
            <div className="primaryButton" onClick={badGuess}>
              Photoshop
            </div>
            <div className="primaryButton" onClick={badGuess}>
              IntelliJ IDEA
            </div>
            <div className="primaryButton" onClick={badGuess}>
              Netflix
            </div>
          </div>
        );
      case 5:
        return (
          <div className={`${isMobile ? css.mobileQuestions : css.quesitons}`}>
            <h1>Czym jest zbiórka publiczna?</h1>
            <div className="primaryButton" onClick={badGuess}>
              Kolekcjonowanie danych przedmiotów
            </div>
            <div className="primaryButton" onClick={badGuess}>
              Tworzenie sondarza na dany temat
            </div>
            <div className="primaryButton" onClick={badGuess}>
              Gromadzenie osób w danym miejscu
            </div>
            <div className="primaryButton" onClick={correctGuess}>
              Zbieranie ofiar w gotówce lub w naturze
            </div>
          </div>
        );
      case 6:
        return (
          <div className={`${isMobile ? css.mobileQuestions : css.quesitons}`}>
            <h1>
              Kto <span>nie</span> może zorganizować zbiórki publicznej?
            </h1>
            <div className="primaryButton" onClick={badGuess}>
              Stowarzyszenie
            </div>
            <div className="primaryButton" onClick={badGuess}>
              Fundacja
            </div>
            <div className="primaryButton" onClick={correctGuess}>
              Pojedyńcza osoba fizyczna
            </div>
            <div className="primaryButton" onClick={badGuess}>
              Spółdzielne socjalne
            </div>
          </div>
        );
      case 7:
        return (
          <div className={`${isMobile ? css.mobileQuestions : css.quesitons}`}>
            <h1>Na jaki cel musi być prowadzona zbiórka publiczna?</h1>
            <div className="primaryButton" onClick={correctGuess}>
              Sfery zadań publicznych
            </div>
            <div className="primaryButton" onClick={badGuess}>
              Opłaty zaległych rachunków
            </div>
            <div className="primaryButton" onClick={badGuess}>
              Sfery zadań prywatnych
            </div>
            <div className="primaryButton" onClick={badGuess}>
              Zakup nowego auta
            </div>
          </div>
        );
      case 8:
        return (
          <div className={`${isMobile ? css.mobileQuestions : css.quesitons}`}>
            <h1>Co powinniśmy zrobić z przebiegiem zbiórki</h1>
            <div className="primaryButton" onClick={badGuess}>
              Poddać analizie aeorodynamicznej
            </div>
            <div className="primaryButton" onClick={badGuess}>
              Wysłać pocztą do najbliższej szkoły
            </div>
            <div className="primaryButton" onClick={badGuess}>
              Zapomnieć
            </div>
            <div className="primaryButton" onClick={correctGuess}>
              Sprawozdać
            </div>
          </div>
        );
      default:
        <h1>Coś poszło nie tak</h1>;
    }
  };

  return showResult ? (
    <Result points={points} />
  ) : (
    <div
      className={`${css.quizContainer} ${
        isMobile ? css.mobileQuizContainer : ""
      }`}
    >
      {render()}
      <div className={css.controls}>
        <div className={css.indicator}>
          {new Array(9).fill(0).map((x, i) => (
            <span key={i} className={stage == i ? css.current : ""}></span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
