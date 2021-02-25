import { useContext } from "react";
import { ChallengesContext } from "../contexts/ChallengeContext";
import styles from "../styles/components/ChallengeBox.module.css";

export function ChallengeBox() {

  //context api
  const contextData = useContext(ChallengesContext);
  console.log(contextData);


  const hasActiveChallenge = true;

  return (
    <div className={styles.challengeBoxContainer}>
      {hasActiveChallenge ? (

        <div className={styles.challengeActive}>
          <header>Ganhe 400 xp</header>
          <main>
            <img src="icons/body.svg" alt="level Up Active" />
            <strong>Novo desafio</strong>
            <p>Levante e faça uma caminhada de 3 minutos.</p>
          </main>
          <footer className={styles.activeChallengeButtons}>
            <button
              type="button"
              className={styles.challengeFailButton}>
              Falhei
              </button>
            <button
              type="button"
              className={styles.challengeSuccessButton}>
              Completei
              </button>
          </footer>
        </div>
      ) : (
          <div className={styles.challengeNotActive}>
            <strong>Finalize um ciclo para receber um desafio</strong>
            <p>
              <img src="./icons/level-up.svg" alt="Level Up" />
            Avance de levels completando desafios.
          </p>
          </div>
        )}
    </div>
  );
}
