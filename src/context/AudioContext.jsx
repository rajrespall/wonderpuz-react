import { createContext, useState, useContext, useCallback } from 'react'
import { BACKGROUND_MUSIC } from '../constants/audioConfig'
import { SOUND_EFFECTS } from '../constants/soundConfig'

const AudioContext = createContext()

export const AudioProvider = ({ children }) => {
  const [isMuted, setIsMuted] = useState(false)
  const [musicVolume, setMusicVolume] = useState(BACKGROUND_MUSIC.volume)
  const [sfxVolume, setSfxVolume] = useState(0.5)
  const [audio] = useState(new Audio(BACKGROUND_MUSIC.url))
  const [sounds] = useState(
    Object.entries(SOUND_EFFECTS).reduce((acc, [key, config]) => {
      const sound = new Audio(config.url)
      sound.volume = config.volume
      return { ...acc, [key]: sound }
    }, {})
  )

  const playSound = useCallback((soundName) => {
    if (!isMuted && sounds[soundName]) {
      const sound = sounds[soundName]
      sound.currentTime = 0
      sound.volume = sfxVolume * SOUND_EFFECTS[soundName].volume
      sound.play().catch(error => console.log('Sound playback failed:', error))
    }
  }, [isMuted, sounds, sfxVolume])

  const toggleMute = () => {
    setIsMuted(!isMuted)
    audio.muted = !isMuted
  }

  const handleMusicVolumeChange = (newVolume) => {
    setMusicVolume(newVolume)
    audio.volume = newVolume
  }

  const handleSfxVolumeChange = (newVolume) => {
    setSfxVolume(newVolume)
    Object.entries(sounds).forEach(([key, sound]) => {
      sound.volume = newVolume * SOUND_EFFECTS[key].volume
    })
  }

  const startMusic = () => {
    audio.loop = true
    audio.volume = musicVolume
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
      musicVolume,
      sfxVolume,
      toggleMute,
      handleMusicVolumeChange,
      handleSfxVolumeChange,
      startMusic,
      stopMusic,
      playSound
    }}>
      {children}
    </AudioContext.Provider>
  )
}

export const useAudio = () => useContext(AudioContext)