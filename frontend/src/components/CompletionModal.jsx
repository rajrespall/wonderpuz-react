import '../styles/CompletionModal.css'

const CompletionModal = ({ onTryAgain, onQuit, completionTime }) => {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content pixel-card">
        <h2 className="pixel-text">Puzzle Completed! 🎉</h2>
        <p className="completion-time pixel-text">
          Time: {formatTime(completionTime)}
        </p>
        <div className="modal-buttons">
          <button className="pixel-button" onClick={onTryAgain}>
            Try Again
          </button>
          <button className="pixel-button" onClick={onQuit}>
            Quit
          </button>
        </div>
      </div>
    </div>
  )
}

export default CompletionModal