import { FC, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

import css from './Lesson.module.css';

const Lesson: FC<{ goToQuiz: () => void }> = ({ goToQuiz }) => {
  const isMobile = useMediaQuery({ query: "(max-width: 600px)" });
  const [stage, setStage] = useState(0);

  const render = () => {
    switch (stage) {
      case 0:
        return (
          <h1>
            <span>Wolontariusz</span> to osoba pracująca na zasadzie
            wolontariatu. Według ustawy o działalności pożytku publicznego i o
            wolontariacie wolontariuszem jest ten, kto <span>dobrowolnie</span>{" "}
            i <span>świadomie</span> oraz <span>bez wynagrodzenia</span>{" "}
            angażuje się w pracę na rzecz osób, organizacji pozarządowych, a
            także rozmaitych instytucji działających w różnych obszarach
            społecznych. Instytucje te nie mogą korzystać z pracy wolontariuszy
            przy prowadzonej działalności gospodarczej, czego wprost zakazuje
            ustawa.
          </h1>
        );
      case 1:
        return (
          <h1>
            Określenie bezpłatna nie oznacza bezinteresowna, lecz{" "}
            <span>bez wynagrodzenia materialnego.</span> W rzeczywistości
            wolontariusz uzyskuje liczne korzyści niematerialne: satysfakcję,
            spełnienie swoich motywacji (poczucie sensu, uznanie ze strony
            innych, podwyższenie samooceny itd.), zyskuje nowych przyjaciół i
            znajomych, zdobywa wiedzę, doświadczenie i nowe umiejętności, a w
            związku z tym i <span>lepszą pozycję na rynku pracy.</span>
          </h1>
        );
      case 2:
        return (
          <h1>
            Określenie wykraczająca poza{" "}
            <span>związki rodzinno-koleżeńsko-przyjacielskie</span> oznacza, że
            nie każda praca na rzecz innych jest wolontariatem. Np. pomoc
            własnej babci wolontariatem nie jest, natomiast pomoc starszej
            osobie w pobliskim hospicjum czy domu pomocy społecznej – jest.
          </h1>
        );
      case 3:
        return (
          <h1>
            U początku swojego istnienia wolontariat nie miał ram
            instytucjonalnych, z czasem zaistniał w organizacjach{" "}
            <span>kościelnych, samopomocowych</span>, a wreszcie pozarządowych.
            Zasadniczym pojęciem związanym z wolontariatem jest motywacja. Aby
            dana praca wolontaryjna była pomyślna, zazwyczaj konieczne jest, aby
            zarówno sam wolontariusz, jak i organizacja z nim współpracująca
            były świadome jego <span>motywacji</span>.
          </h1>
        );
      case 4:
        return (
          <h1>
            Wraz z upowszechnianiem się dostępu do mediów cyfrowych oraz nowych
            technologii telekomunikacyjnych i teleinformatycznych, a w
            szczególności dostępu do komputerów osobistych i Internetu,
            wolontariat stał się jedną z cech ruchu{" "}
            <span>wolnego oprogramowania i ruchu wolnej kultury</span>. Do
            najbardziej znanych przykładów projektów opartych na wolontariacie
            należą: <span>Debian, LibreOffice i Wikipedia</span>. Nowe media
            umożliwiają też podejmowanie odmiennych form dobrowolnej pracy na
            rzecz innych, określanych mianem wolontariatu wirtualnego.
          </h1>
        );
      case 5:
        return (
          <h1>
            Zbiórką publiczną jest{" "}
            <span>zbieranie ofiar w gotówce lub w naturze</span> w miejscu
            publicznym na określony, zgodny z prawem cel pozostający w sferze
            zadań publicznych
          </h1>
        );
      case 6:
        return (
          <h1>
            Kto może zorganizować zbiórkę publiczną? przede wszystkim zbiórki
            mogą prowadzić organizacje pozarządowe{" "}
            <span>
              (fundacja, stowarzyszenie, stowarzyszenie zwykłe, klub sportowy,
              ale też związek zawodowy, organizacje pracodawców, spółdzielnie
              socjalne)
            </span>
            , tzw. organizacje kościelne i wyznaniowe, komitety społeczne
            powołane w celu przeprowadzenia zbiórki publicznej.
          </h1>
        );
      case 7:
        return (
          <h1>
            Na jakie cele może być prowadzona zbiórka publiczna? cel zbiórki
            musi być ze <span>sfery zadań publicznych</span>, można też zbierać
            pieniądze i dary na cele religijne.
          </h1>
        );
      case 8:
        return (
          <h1>
            Przebieg zbiórek, jak również sposób wydatkowania środków, które
            pozyskaliśmy w trakcie zbiórki (także rozdysponowania darów),{" "}
            <span>powinien być sprawozdany.</span>
          </h1>
        );
      default:
        <h1>Coś poszło nie tak</h1>;
    }
  };

  const decrementStage = () => {
    if (stage > 0) {
      setStage((prevState) => prevState - 1);
    }
  };

  const incrementStage = () => {
    if (stage < 8) {
      setStage((prevState) => prevState + 1);
    } else {
      goToQuiz();
    }
  };

  return (
    <div
      className={`${css.classContainer} ${
        isMobile ? css.mobileClassContainer : ""
      }`}
    >
      {render()}
      <div className={css.controls}>
        <div className={css.indicator}>
          {new Array(9).fill(0).map((x, i) => (
            <span key={i} className={stage == i ? css.current : ""}></span>
          ))}
        </div>
        <div className={css.actions}>
          <div className="secondaryButton" onClick={decrementStage}>
            Powrót
          </div>
          <div className="primaryButton" onClick={incrementStage}>
            Dalej
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lesson;
