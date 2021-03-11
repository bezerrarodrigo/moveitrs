import { useContext } from "react";
import { ChallengesContext } from "../contexts/ChallengeContext";
import { CountdownContext } from "../contexts/CountdownContext";
import styles from "../styles/components/ChallengeBox.module.css";

export function ChallengeBox() {

  //context api
  const { activeChallenge, resetChallenge, completeChallenge } = useContext(ChallengesContext);

  const { resetCountdown } = useContext(CountdownContext)


  function handleChallengeSucceeded() {
    completeChallenge();
    resetCountdown();
  }

  function handleChallengeFailed() {
    resetChallenge();
    resetCountdown();
  }


  return (
    <div className={styles.challengeBoxContainer}>
      {activeChallenge ? (

        <div className={styles.challengeActive}>
          <header>Ganhe {activeChallenge.amount} xp</header>
          <main>
            <img src={`icons/${activeChallenge.type}.svg`} alt="level Up Active" />
            <strong>Novo desafio</strong>
            <p>{activeChallenge.description}</p>
          </main>
          <footer className={styles.activeChallengeButtons}>
            <button
              type="button"
              className={styles.challengeFailButton}
              onClick={handleChallengeFailed}>
              Falhei
              </button>
            <button
              type="button"
              onClick={handleChallengeSucceeded}
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
