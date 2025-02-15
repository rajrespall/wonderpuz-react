import { useState } from 'react'
import Puzzle from './components/JigsawPuzzle'
import StartPage from './components/StartPage'
import { AudioProvider } from './context/AudioContext'
import './App.css'

function App() {
  const [gameStarted, setGameStarted] = useState(false)
  const [difficulty, setDifficulty] = useState('EASY')

  const handleStartGame = (selectedDifficulty) => {
    setDifficulty(selectedDifficulty)
    setGameStarted(true)
  }

  const handleQuit = () => {
    setGameStarted(false)
  }

  return (
    <AudioProvider>
      <div className="App">
        {!gameStarted ? (
          <StartPage onStartGame={handleStartGame} />
        ) : (
          <>
            <div className="game-info">
              <h1 className="pixel-text">WonderPuz</h1>
              <p className="pixel-text difficulty-display">Difficulty: {difficulty}</p>
            </div>
            <Puzzle 
              initialDifficulty={difficulty} 
              onQuit={handleQuit}
            />
          </>
        )}
      </div>
    </AudioProvider>
  )
}

export default App