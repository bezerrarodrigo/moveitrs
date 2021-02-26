import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengeContext'
import styles from '../styles/components/CompleteChallenges.module.css'

export function CompleteChallenge() {

  const { challengesComplete } = useContext(ChallengesContext)


  return (
    <div className={styles.completeChallengesContainer}>
      <span>Desafios completos</span>
      <span>{challengesComplete}</span>
    </div>
  )
}