import { JigsawPuzzle } from 'react-jigsaw-puzzle/lib'
import 'react-jigsaw-puzzle/lib/jigsaw-puzzle.css'
import { useState, useEffect } from 'react'
import { DIFFICULTY_LEVELS, PUZZLE_IMAGES } from '../constants/puzzleConfig'
import CompletionModal from './CompletionModal'
import Timer from './Timer'
import SolvedImage from './SolvedImage'

const Puzzle = ({ initialDifficulty, onQuit }) => {
  const [complete, setComplete] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [time, setTime] = useState(0)
  // Add key state to force puzzle re-render
  const [key, setKey] = useState(0)
  const [currentImage, setCurrentImage] = useState(() => 
    PUZZLE_IMAGES[Math.floor(Math.random() * PUZZLE_IMAGES.length)]
  )

  useEffect(() => {
    const img = new Image()
    img.src = currentImage.url
    img.onload = () => setImageLoaded(true)
    img.onerror = () => console.error('Error loading image:', currentImage.url)
    setImageLoaded(false)
  }, [currentImage])

  const handleComplete = () => {
    setTimeout(() => {
      setComplete(true)
    }, 500)
  }

  const handleTryAgain = () => {
    setComplete(false)
    setTime(0)
    // Get new random image
    setCurrentImage(PUZZLE_IMAGES[Math.floor(Math.random() * PUZZLE_IMAGES.length)])
    // Increment key to force puzzle re-render
    setKey(prev => prev + 1)
  }

  return (
    <div className="puzzle-game-layout">
      <div className="puzzle-container">
        <Timer 
          isRunning={imageLoaded && !complete} 
          onTimeUpdate={setTime}
        />
        
        {imageLoaded ? (
          <div className="puzzle-wrapper">
            <JigsawPuzzle
              key={key}
              imageSrc={currentImage.url}
              rows={DIFFICULTY_LEVELS[initialDifficulty].rows}
              columns={DIFFICULTY_LEVELS[initialDifficulty].columns}
              onSolved={handleComplete}
            />
          </div>
        ) : (
          <div className="loading">Loading puzzle...</div>
        )}
      </div>

      {imageLoaded && (
        <SolvedImage 
          imageUrl={currentImage.url} 
          difficulty={initialDifficulty}
        />
      )}
      
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