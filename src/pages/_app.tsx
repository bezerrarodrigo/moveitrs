import '../styles/global.css'

// context
import { ChallengesProvider } from '../contexts/ChallengeContext'

function MyApp({ Component, pageProps }) {


  return (
    <ChallengesProvider>

      {/* todos os componentes dentro do Provider terão acesso aos dados do contexto ChallengesContext */}
      <Component {...pageProps} />


    </ChallengesProvider>

  )
}

export default MyApp
