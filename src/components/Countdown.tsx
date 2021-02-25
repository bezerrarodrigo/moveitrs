import { useEffect, useState } from 'react'
import styles from '../styles/components/Countdown.module.css'

export function Countdown() {

  //
  let countdownTimeOut: NodeJS.Timeout

  //state
  const [time, setTime] = useState(0.1 * 60); //tempo em segundos
  const [isActive, setIsActive] = useState(false); //contador parado ou contando
  const [hasFinished, setHasFinished] = useState(false)
  // arredonda o valor pra menos 24:59 -> 24
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  // 25 => '25' -> ['2' , '5']
  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

  function startCountdown() {
    // ativa o contador
    setIsActive(true);
  }

  function resetCountdown() {
    clearTimeout(countdownTimeOut)
    setIsActive(false);
    setTime(0.1 * 60)
  }

  // executo a função sempre que o valor de active mudar (array de dependências)
  useEffect(() => {
    if (isActive && time > 0) {
      // executa somente uma vez
      countdownTimeOut = setTimeout(() => {
        setTime(time - 1);
      }, 1000)
    } else if (isActive && time === 0) {
      setHasFinished(true);
      setIsActive(false);

    }
  }, [isActive, time]) // colocando o time como dependência o useEffect (setTimeOut) roda a cada segundo pois a variável time é alterada de acordo


  return (
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>

      {hasFinished ? (
        <button disabled className={styles.countDownButton}>
          Ciclo encerrado
        </button>
      ) : (
          <>
            {isActive ? (<button type="button" className={`${styles.countDownButton} ${styles.countDownButtonActive}`} onClick={resetCountdown}>
              Abandonar ciclo
            </button>) : (<button type="button" className={styles.countDownButton} onClick={startCountdown}>
              Iniciar ciclo
            </button>)}
          </>
        )}



    </div>
  )
}