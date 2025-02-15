import { useAudio } from '../context/AudioContext'
import '../styles/Volume.css'

const VolumeSettings = () => {
  const { 
    isMuted, 
    musicVolume, 
    sfxVolume, 
    toggleMute, 
    handleMusicVolumeChange, 
    handleSfxVolumeChange 
  } = useAudio()

  return (
    <div className="volume-settings">
      <div className="volume-control">
        <label className="pixel-text">Music Volume</label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={musicVolume}
          onChange={(e) => handleMusicVolumeChange(parseFloat(e.target.value))}
          className="volume-slider"
        />
        <span className="pixel-text">{Math.round(musicVolume * 100)}%</span>
      </div>

      <div className="volume-control">
        <label className="pixel-text">Sound Effects</label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={sfxVolume}
          onChange={(e) => handleSfxVolumeChange(parseFloat(e.target.value))}
          className="volume-slider"
        />
        <span className="pixel-text">{Math.round(sfxVolume * 100)}%</span>
      </div>

      <button 
        className="pixel-button mute-button" 
        onClick={toggleMute}
      >
        {isMuted ? 'Unmute' : 'Mute All'}
      </button>
    </div>
  )
}

export default VolumeSettings