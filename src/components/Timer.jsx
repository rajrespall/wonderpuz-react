import { useState, useEffect } from 'react'
import '../styles/Timer.css'

const Timer = ({ isRunning, onTimeUpdate }) => {
  const [time, setTime] = useState(0)

  useEffect(() => {
    let intervalId

    if (isRunning) {
      intervalId = setInterval(() => {
        setTime(prevTime => {
          const newTime = prevTime + 1
          // Move the parent update to the next tick to avoid render conflicts
          setTimeout(() => onTimeUpdate(newTime), 0)
          return newTime
        })
      }, 1000)
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
  }, [isRunning, onTimeUpdate])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="timer">
      <div className="timer-display pixel-text">
        <span>Time</span>
        <span>{formatTime(time)}</span>
      </div>
    </div>
  )
}

export default Timer