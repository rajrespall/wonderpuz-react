import { useAudio } from '../context/AudioContext'
import '../styles/SettingsModal.css'

const SettingsModal = ({ onClose }) => {
  const { isMuted, volume, toggleMute, handleVolumeChange } = useAudio()

  return (
    <div className="modal-overlay">
      <div className="modal-content pixel-card">
        <button className="close-button pixel-button" onClick={onClose}>
          ✕
        </button>
        <h2 className="pixel-text">Settings</h2>
        <div className="settings-content">
          <div className="setting-item">
            <label className="pixel-text">Music:</label>
            <button 
              className="pixel-button"
              onClick={toggleMute}
            >
              {isMuted ? '🔇' : '🔊'}
            </button>
          </div>
          <div className="setting-item">
            <label className="pixel-text">Volume:</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
              className="volume-slider"
              disabled={isMuted}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsModal