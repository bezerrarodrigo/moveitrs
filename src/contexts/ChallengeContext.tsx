import {createContext, useState, ReactNode, useEffect} from 'react';

// lib para gravar storage nos cookies do navegador
import Cookies from 'js-cookie';


// todos os desafios armazenados dentro deste array
import challenges from '../../challenges.json';
import {LevelUpModal} from "../components/LevelUpModal";

type challengesProviderProps = {
    children: ReactNode;
    level: number;
    currentExperience: number;
    challengesCompleted: number;
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
    closeModal: () => void;
}

// criando o context para ser compartilhado
export const ChallengesContext = createContext({} as challengesContextData);

// componente deverá ser usada no _app. para compartilhar seus dados com toda a aplicação
export function ChallengesProvider({children, ...rest}: challengesProviderProps) {

    // informações que queremos armazenar e disponibilizar para os demais componentes da aplicação
    const [level, setLevel] = useState(rest.level ?? 1);
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
    const [challengesComplete, setChallengesComplete] = useState(rest.challengesCompleted ?? 0);
    const [showModal, setShowModal] = useState(false)

    const [activeChallenge, setActiveChallenge] = useState(null);

    // calculo criado para gerar regra de pontuação para próximo nível
    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

    //api navegador - permitir notificações
    useEffect(() => {
        Notification.requestPermission();
    }, [])

    // local storage com cookies
    useEffect(() => {
        Cookies.set('level', String(level));
        Cookies.set('currentExperience', String(currentExperience));
        Cookies.set('challengesComplete', String(challengesComplete));
    }, [level, currentExperience, challengesComplete])


    // deve-se monstrar o Modal de aumento de level
    function levelUp() {
        setLevel(level + 1);
        setShowModal(true)
    }

    function startNewChallenge() {
        // console.log('New Challenge');
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex];

        setActiveChallenge(challenge);

        //api do navegador - audio de notificação
        // new Audio('/notification.mp3').play();

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

    function closeModal() {
        setShowModal(false);
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
            completeChallenge,
            closeModal
        }}>
            {/*o que estiver envolvido por este context terá acesso a todas as propriedades e funções*/}
            {children}
            {/*{showModal ? <LevelUpModal/> : null }*/}
            {showModal && <LevelUpModal/>}


        </ChallengesContext.Provider>
    )
}