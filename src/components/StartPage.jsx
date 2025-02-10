import { useState } from 'react'
import { DIFFICULTY_LEVELS } from '../constants/puzzleConfig'
import SettingsModal from './SettingsModal'
import '../styles/StartPage.css'
import { useAudio } from '../context/AudioContext'

const StartPage = ({ onStartGame }) => {
  const [difficulty, setDifficulty] = useState('EASY')
  const [showSettings, setShowSettings] = useState(false)
  const { startMusic } = useAudio()

  const handleSubmit = (e) => {
    e.preventDefault()
    startMusic()
    onStartGame(difficulty)
  }

  return (
    <div className="start-page">
      <h1 className="pixel-text">WonderPuz</h1>
      <div className="pixel-card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="difficulty" className="pixel-text">Select Difficulty:</label>
            <select
              id="difficulty"
              className="pixel-input"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              {Object.keys(DIFFICULTY_LEVELS).map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>
          <div className="button-group">
            <button type="submit" className="pixel-button">
              Start Game
            </button>
            <button 
              type="button" 
              className="pixel-button settings-button"
              onClick={() => setShowSettings(true)}
            >
              Settings
            </button>
          </div>
        </form>
      </div>
      {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
    </div>
  )
}

export default StartPage