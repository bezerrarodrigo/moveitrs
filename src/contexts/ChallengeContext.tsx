import { createContext, useState, ReactNode } from 'react';

export const ChallengesContext = createContext({});

type challengesProviderProps = {
    children: ReactNode;
}

export function ChallengesProvider({ children }: challengesProviderProps) {

    // informações que queremos armazenar
    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrentExperience] = useState(0);
    const [challengesComplete, setChallengesComplete] = useState(0);



    function levelUp() {
        setLevel(level + 1);
    }

    return (
        <ChallengesContext.Provider value={{ level: level, levelUp, currentExperience, challengesComplete }}>
            {children}
        </ChallengesContext.Provider>
    )
}