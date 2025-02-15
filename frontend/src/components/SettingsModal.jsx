import { useAudio } from '../context/AudioContext'
import '../styles/SettingsModal.css'
import VolumeSettings from './VolumeSettings'

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
          <VolumeSettings />
        </div>
      </div>
    </div>
  )
}

export default SettingsModal