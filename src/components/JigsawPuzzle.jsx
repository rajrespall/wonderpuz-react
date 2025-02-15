import { JigsawPuzzle } from 'react-jigsaw-puzzle/lib'
import 'react-jigsaw-puzzle/lib/jigsaw-puzzle.css'
import { useState, useEffect, useCallback } from 'react'
import { DIFFICULTY_LEVELS, PUZZLE_IMAGES } from '../constants/puzzleConfig'
import CompletionModal from './CompletionModal'
import Timer from './Timer'
import SolvedImage from './SolvedImage'
import { useAudio } from '../context/AudioContext'

const Puzzle = ({ initialDifficulty, onQuit }) => {
  const [complete, setComplete] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [time, setTime] = useState(0)
  const [key, setKey] = useState(0)
  const [currentImage, setCurrentImage] = useState(() => 
    PUZZLE_IMAGES[Math.floor(Math.random() * PUZZLE_IMAGES.length)]
  )
  const { playSound } = useAudio()

  useEffect(() => {
    const img = new Image()
    img.src = currentImage.url
    img.onload = () => setImageLoaded(true)
    img.onerror = () => console.error('Error loading image:', currentImage.url)
    setImageLoaded(false)
  }, [currentImage])

  const handleComplete = useCallback(() => {
    playSound('PUZZLE_COMPLETE')
    setTimeout(() => {
      setComplete(true)
    }, 500)
  }, [playSound])

  const handleTryAgain = () => {
    setComplete(false)
    setTime(0)
    setCurrentImage(PUZZLE_IMAGES[Math.floor(Math.random() * PUZZLE_IMAGES.length)])
    setKey(prev => prev + 1)
  }

  // Add puzzle interaction handlers
  const handlePiecePickup = () => {
    playSound('PIECE_PICKUP')
  }

  const handlePieceDrop = () => {
    playSound('PIECE_DROP')
  }

  const handlePieceConnect = () => {
    playSound('PIECE_CONNECT')
  }

  return (
    <div className="puzzle-game-layout">
      <div className="puzzle-container">
        <div className="puzzle-header">
          <Timer 
            isRunning={imageLoaded && !complete} 
            onTimeUpdate={setTime}
          />
        </div>
        
        {imageLoaded ? (
          <div className="puzzle-wrapper"
            onMouseDown={handlePiecePickup}
            onMouseUp={handlePieceDrop}
          >
            <JigsawPuzzle
              key={key}
              imageSrc={currentImage.url}
              rows={DIFFICULTY_LEVELS[initialDifficulty].rows}
              columns={DIFFICULTY_LEVELS[initialDifficulty].columns}
              onSolved={handleComplete}
              onPieceConnect={handlePieceConnect}
            />
          </div>
        ) : (
          <div className="loading">Loading puzzle...</div>
        )}
      </div>

      <div className="guide-section">
        {imageLoaded && (
          <SolvedImage 
            imageUrl={currentImage.url} 
            difficulty={initialDifficulty}
          />
        )}
        <button 
          className="pixel-button quit-button" 
          onClick={onQuit}
        >
          Quit Game
        </button>
      </div>
      
      {complete && (
        <CompletionModal
          onTryAgain={handleTryAgain}
          onQuit={onQuit}
          completionTime={time}
        />
      )}
    </div>
  )
}

export default Puzzle