import { useEffect, useState } from 'react'
import { idText } from 'typescript';
import styles from '../styles/components/Countdown.module.css'

export function Countdown() {

  //state
  const [time, setTime] = useState(25 * 60); //tempo em segundos
  const [active, setActive] = useState(false); //contador parado ou contando

  // arredonda o valor pra menos 24:59 -> 24
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  // 25 => '25' -> ['2' , '5']
  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

  function startCountdown() {
    // ativa o contador
    setActive(true);

  }

  // executo a função sempre que o valor de active mudar (array de dependências)
  useEffect(() => {
    if (active && time > 0) {
      // executa somente uma vez
      setTimeout(() => {
        setTime(time - 1);
      }, 1000)
    }
  }, [active, time]) // colocando o time como dependência o useEffect (setTimeOut) roda a cada segundo


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
      <button type="button" className={styles.countDownButton} onClick={startCountdown}>
        Iniciar um ciclo
      </button>
    </div>
  )
}