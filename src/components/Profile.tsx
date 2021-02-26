import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengeContext'
import styles from '../styles/components/Profile.module.css'

export function Profile() {

  //context
  const { level } = useContext(ChallengesContext)



  return (
    <div className={styles.profileContainer}>
      <img src="https://github.com/bezerrarodrigo.png" alt="Rodrigo Bezerra" />
      <div>
        <strong>Rodrigo Bezerra</strong>
        <p>
          <img src="/icons/level.svg" alt="Level image" />
          Level {level}
        </p>
      </div>
    </div>
  )
}