// Write your code here
import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {isTimeRunning: false, timeLimit: 25, seconds: 0}

  componentWillUnmount() {
    this.clearTimer()
  }

  clearTimer = () => {
    clearInterval(this.intervalId)
  }

  onClickReset = () => {
    this.setState({isTimeRunning: false, timeLimit: 25, seconds: 0})
    this.clearTimer()
  }

  onDecreaseLimit = () => {
    const {timeLimit} = this.state
    if (timeLimit > 1) {
      this.setState(prevState => ({timeLimit: prevState.timeLimit - 1}))
    }
  }

  onIncreaseLimit = () => {
    this.setState(prevState => ({timeLimit: prevState.timeLimit + 1}))
  }

  startTimerCountDown = () => {
    const {seconds, timeLimit} = this.state
    const isTimeCompleted = seconds === timeLimit * 60
    if (isTimeCompleted) {
      this.setState({isTimeRunning: false, seconds: 0})
      this.clearTimer()
    } else {
      this.setState(prevState => ({
        seconds: prevState.seconds + 1,
      }))
    }
  }

  onChangeStatus = () => {
    const {isTimeRunning, seconds, timeLimit} = this.state
    this.setState(prevState => ({isTimeRunning: !prevState.isTimeRunning}))
    const isTimeCompleted = seconds === timeLimit * 60
    if (isTimeCompleted) {
      this.setState({isTimeRunning: false})
      this.clearTimer()
    }
    if (isTimeRunning) {
      this.clearTimer()
      this.setState({isTimeRunning: false})
    } else {
      this.intervalId = setInterval(() => {
        this.startTimerCountDown()
      }, 1000)
    }
  }

  convertTimeFormat = () => {
    const {timeLimit, seconds} = this.state
    const timeSeconds = timeLimit * 60 - seconds
    const minutes = Math.floor(timeSeconds / 60)
    const second = Math.floor(timeSeconds % 60)
    const minutesString = minutes > 9 ? minutes : `0${minutes}`
    const secondString = second > 9 ? second : `0${second}`

    return `${minutesString}:${secondString}`
  }

  render() {
    const {timeLimit, isTimeRunning} = this.state
    const timeStatus = isTimeRunning ? 'Pause' : 'Start'
    const runningStatus = isTimeRunning ? 'Running' : 'Paused'
    const imgUrl = isTimeRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const altText = isTimeRunning ? 'pause icon' : 'play icon'
    return (
      <div className="app-container">
        <h1 className="heading">Digital Timer</h1>
        <div className="timer-container">
          <div className="image-container">
            <div className="timer-running-container">
              <h1 className="timer-heading">{this.convertTimeFormat()}</h1>
              <p className="timer-status">{runningStatus}</p>
            </div>
          </div>
          <div className="timer-count-container">
            <div className="pause-reset-container">
              <button
                className="button"
                type="button"
                onClick={this.onChangeStatus}
              >
                <img
                  src={imgUrl}
                  alt={altText}
                  className="button-image"
                  onClick={this.onChangeStatus}
                />
                {timeStatus}
              </button>
              <button
                className="button"
                type="button"
                onClick={this.onClickReset}
              >
                <img
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  alt="reset icon"
                  className="button-image"
                  onClick={this.onClickReset}
                />
                Reset
              </button>
            </div>
            <p className="set-time">Set Timer limit</p>
            <div className="button-container">
              <button
                className="button-set-limit"
                type="button"
                onClick={this.onDecreaseLimit}
              >
                -
              </button>
              <p className="count">{timeLimit}</p>
              <button
                className="button-set-limit"
                type="button"
                onClick={this.onIncreaseLimit}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
