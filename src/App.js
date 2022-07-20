import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [openTimer, setOpenTimer] = useState(false) // timer開關
  const [seconds, setSeconds] = useState(0) // 設定初始秒數
  const [savedSec, setSaveSec] = useState([]) // 儲存秒數array
  const [timerSwitch, setTimerSwitch] = useState(false) // 設置開始停止開關

  // 計時
  useEffect(() => {
    let turn

    if (timerSwitch) {
      turn = setInterval(() => {
        const newSecond = seconds + 1
        setSeconds(newSecond)
      }, 1000)
    }

    return () => {
      clearInterval(turn)
    }
  }, [seconds, timerSwitch])

  return (
    <>
      <div
        className="timer_button"
        onClick={() => {
          setOpenTimer(!openTimer)
        }}
      >
        Timer
      </div>
      <div className={openTimer ? 'show_timer' : 'display_none'}>
        <div className="time_area">
          {new Date(seconds * 1000).toISOString().substring(11, 19)}
        </div>
        <div className="operating_area">
          <div
            className="start"
            onClick={() => {
              setTimerSwitch(!timerSwitch)
            }}
          >
            <button>{timerSwitch ? 'pause' : 'start'}</button>
          </div>
          <div
            className="split"
            onClick={() => {
              if (timerSwitch) {
                const newSecList = [...savedSec]
                newSecList.push(seconds)
                setSaveSec(newSecList)
              }
            }}
          >
            <button className={timerSwitch ? 'split' : 'unsplit'}>split</button>
          </div>
          <div
            className="reset"
            onClick={() => {
              setTimerSwitch(timerSwitch)
              setSeconds(0)
              setSaveSec([])
            }}
          >
            <button>reset</button>
          </div>
        </div>
      </div>
      <div className={openTimer ? 'display_area' : 'display_none'}>
        <div className="title">
          <div className="time">time</div>
          <div className="cumulative_time">cumulative time</div>
        </div>
        {savedSec.map((v, i) => {
          const newTime = savedSec
          for (let a = 0; a <= newTime.length; a++) {
            if (newTime[i] !== undefined) {
              return (
                <>
                  <div key={i} className="time_display_area">
                    <div className="time">
                      {new Date((i !== 0 ? v - newTime[i - 1] : v) * 1000)
                        .toISOString()
                        .substring(11, 19)}
                    </div>
                    <div className="cumulative_time">
                      {new Date(v * 1000).toISOString().substring(11, 19)}
                    </div>
                  </div>
                </>
              )
            }
          }
        })}
      </div>
    </>
  )
}

export default App
