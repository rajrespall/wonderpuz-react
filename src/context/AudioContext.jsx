import { createContext, useState, useContext } from 'react'
import { BACKGROUND_MUSIC } from '../constants/audioConfig'

const AudioContext = createContext()

export const AudioProvider = ({ children }) => {
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(BACKGROUND_MUSIC.volume)
  const [audio] = useState(new Audio(BACKGROUND_MUSIC.url))

  const toggleMute = () => {
    setIsMuted(!isMuted)
    audio.muted = !isMuted
  }

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume)
    audio.volume = newVolume
  }

  const startMusic = () => {
    audio.loop = true
    audio.volume = volume
    audio.muted = isMuted
    audio.play().catch(error => console.log('Audio playback failed:', error))
  }

  const stopMusic = () => {
    audio.pause()
    audio.currentTime = 0
  }

  return (
    <AudioContext.Provider value={{
      isMuted,
      volume,
      toggleMute,
      handleVolumeChange,
      startMusic,
      stopMusic
    }}>
      {children}
    </AudioContext.Provider>
  )
}

export const useAudio = () => useContext(AudioContext)