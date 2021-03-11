import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengesContext } from "./ChallengeContext";

type CountdownContextData = {
    minutes: number;
    seconds: number;
    hasFinished: boolean,
    isActive: boolean;
    resetCountdown: () => void;
    startCountdown: () => void;
}

export const CountdownContext = createContext({} as CountdownContextData);

type countdownProviderProps = {
    children: ReactNode;
}

export function CountdownProvider({ children }: countdownProviderProps) {

    // clearTimeout
    let countdownTimeOut: NodeJS.Timeout

    // context api
    const { startNewChallenge } = useContext(ChallengesContext);

    //state
    const [time, setTime] = useState(25 * 60); //tempo em segundos
    const [isActive, setIsActive] = useState(false); //contador parado ou contando
    const [hasFinished, setHasFinished] = useState(false)

    // arredonda o valor pra menos 24:59 -> 24
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    function startCountdown() {
        // ativa o contador
        setIsActive(true);
    }

    function resetCountdown() {
        clearTimeout(countdownTimeOut)
        setIsActive(false);
        setTime(25 * 60);
        setHasFinished(false);
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
            startNewChallenge();

        }
    }, [isActive, time]) // colocando o time como dependência o useEffect (setTimeOut) roda a cada segundo pois a variável time é alterada de acordo


    return (
        <CountdownContext.Provider value={{ minutes, seconds, hasFinished, isActive, resetCountdown, startCountdown }}>
            {children}
        </CountdownContext.Provider>
    )
}