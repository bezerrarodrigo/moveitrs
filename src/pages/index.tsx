import Head from 'next/head'


import { CompleteChallenge } from "../components/CompleteChallenges";
import { ChallengeBox } from "../components/ChallengeBox";
import { Countdown } from "../components/Countdown";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";


import styles from '../styles/pages/Home.module.css';
import { CountdownProvider } from '../contexts/CountdownContext';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Início | move.it</title>
      </Head>
      <ExperienceBar />

      {/* Importando neste lugar e não no _app.js pois não será
      compartilhado com todas as telas.
       */}
      <CountdownProvider>
        <section>
          <div>
            <Profile />
            <CompleteChallenge />
            <Countdown />
          </div>
          <div>
            <ChallengeBox />
          </div>
        </section>
      </CountdownProvider>
    </div>
  )
}
