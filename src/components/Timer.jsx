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
          onTimeUpdate(newTime)
          return newTime
        })
      }, 1000)
    }

    return () => clearInterval(intervalId)
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