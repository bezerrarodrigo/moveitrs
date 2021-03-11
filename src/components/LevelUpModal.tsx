import styles from '../styles/components/LevelUpModal.module.css'
import {useContext} from "react";
import {ChallengesContext} from "../contexts/ChallengeContext";

export function LevelUpModal() {

    const {level ,closeModal} = useContext(ChallengesContext)

    return (
        <div className={styles.overlay}>
            <div className={styles.levelUpContainer}>
                <header><span>{level}</span></header>
                <strong>Parabéns!</strong>
                <p>Você alcançou um novo level.</p>
                <button type="button" onClick={closeModal}>
                    <img src="/icons/close.svg" alt="Fechar Modal"/>
                </button>
            </div>
        </div>
    )
}