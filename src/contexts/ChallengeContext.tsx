import {createContext, useState, ReactNode, useEffect} from 'react';

// todos os desafios armazenados dentro deste array
import challenges from '../../challenges.json';

type challengesProviderProps = {
    children: ReactNode;
}

type challenge = {
    // dados do json
    type: 'body' | 'eye'; // como tem somente dois valores usta isto ao invés de string
    description: string;
    amount: number;
}

type challengesContextData = {
    level: number;
    currentExperience: number,
    challengesComplete: number;
    activeChallenge: challenge;
    experienceToNextLevel: number;
    startNewChallenge: () => void;
    levelUp: () => void;
    resetChallenge: () => void;
    completeChallenge: () => void;
}

export const ChallengesContext = createContext({} as challengesContextData);

export function ChallengesProvider({children}: challengesProviderProps) {

    // informações que queremos armazenar
    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrentExperience] = useState(0);
    const [challengesComplete, setChallengesComplete] = useState(0);
    const [activeChallenge, setActiveChallenge] = useState(null);

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

    //api navegador - permitir notificações
    useEffect(() => {
        Notification.requestPermission();
    }, [])


    function levelUp() {
        setLevel(level + 1);
    }

    function startNewChallenge() {
        // console.log('New Challenge');
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex];

        setActiveChallenge(challenge);

        //api do navegador
        new Audio('/notification.mp3').play();

        // api do navegador
        if (Notification.permission === 'granted') {
            new Notification('Novo Desafio!', {
                body: `Valendo ${challenge.amount} xp.`
            })
        }

    }

    function resetChallenge() {
        setActiveChallenge(null)
    }

    function completeChallenge() {
        if (!activeChallenge) {
            return; // return void (vazio)
        }

        const {amount} = activeChallenge;
        let finalExperienceScore = currentExperience + amount;

        /**
         * Se o amount do nível completado for maior
         * que o necessário para upar de nível, upa de
         * nível e adicionar o restante de amount
         */
        if (finalExperienceScore >= experienceToNextLevel) {
            finalExperienceScore = finalExperienceScore - experienceToNextLevel;
            levelUp();
        }

        setCurrentExperience(finalExperienceScore);
        setActiveChallenge(null)
        setChallengesComplete(challengesComplete + 1);


    }

    return (
        <ChallengesContext.Provider value={{
            level: level,
            levelUp,
            currentExperience,
            challengesComplete,
            startNewChallenge,
            activeChallenge,
            resetChallenge,
            experienceToNextLevel,
            completeChallenge
        }}>
            {children}
        </ChallengesContext.Provider>
    )
}