import Head from 'next/head'
import {GetServerSideProps} from 'next';


import {CompleteChallenge} from "../components/CompleteChallenges";
import {ChallengeBox} from "../components/ChallengeBox";
import {Countdown} from "../components/Countdown";
import {ExperienceBar} from "../components/ExperienceBar";
import {Profile} from "../components/Profile";


import styles from '../styles/pages/Home.module.css';
import {CountdownProvider} from '../contexts/CountdownContext';
import {ChallengesProvider} from "../contexts/ChallengeContext";


type HomeProps = {
    level: number;
    currentExperience: number;
    challengesComplete: number;
}

export default function Home(props: HomeProps) {

    console.log(props);


    return (
        <ChallengesProvider level={props.level} currentExperience={props.currentExperience}
                            challengesCompleted={props.challengesComplete}>
            <div className={styles.container}>
                <Head>
                    <title>Início | move.it</title>
                </Head>
                <ExperienceBar/>

                {/* Importando neste lugar e não no _app.js pois não será
      compartilhado com todas as telas.
       */}
                <CountdownProvider>
                    <section>
                        <div>
                            <Profile/>
                            <CompleteChallenge/>
                            <Countdown/>
                        </div>
                        <div>
                            <ChallengeBox/>
                        </div>
                    </section>
                </CountdownProvider>
            </div>
        </ChallengesProvider>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

    // obter todos os cookies da aplicação
    const {level, currentExperience, challengesComplete} = ctx.req.cookies;

    return {
        props: {
            level: Number(level),
            currentExperience: Number(currentExperience),
            challengesComplete: Number(challengesComplete)
        }
    }
}


