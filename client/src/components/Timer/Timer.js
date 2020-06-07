import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Timer from "react-compound-timer";
import {
  faPlayCircle,
  faPauseCircle,
  faDotCircle,
  faRedo,
} from "@fortawesome/free-solid-svg-icons";
import start from "../../audio/start.mp3";
import pause from "../../audio/pause.mp3";
import again from "../../audio/again.mp3";
import ovr from "../../audio/over.mp3";
import alarm from "../../audio/alarm.mp3";
import psdbrk from "../../audio/psdbrk.mp3";
import ToDoList from "../ToDoList/ToDoList";

import {
  TimerWrapper,
  TimeStyle,
  ButtonContainer,
  blnk182,
  blinkText,
  dontBlink,
  Button,
  ButtonWrapperHead,
} from "./TimerStyles";
import { Helmet } from "react-helmet";
import ReactTooltip from "react-tooltip";

const startMp3 = new Audio(start);
startMp3.volume = 0.3;
const pauseMp3 = new Audio(pause);
pauseMp3.volume = 0.4;
const againMp3 = new Audio(again);
againMp3.volume = 0.3;
const overMp3 = new Audio(ovr);
overMp3.volume = 0.2;
const alarmMp3 = new Audio(alarm);
alarmMp3.volume = 0.7;
const psdbrkMp3 = new Audio(psdbrk);
psdbrkMp3.volume = 0.6;
const psd = "PAUSED";
const init = "init";
const brk = "brk";
const work = "work";
const over = "over";
class TimerComp extends Component {
  render() {
    const {
      timeSetMins,
      timeSetBreak,
      currSess,
      handler,
      colorPal,
      showAbout,
      changeQuote,
      changePicture,
      resetTimer,
      addTasks,
      tasks,
      showToDo,
      removeTask,
      markTask,
      addSubTask,
      serverStatus,
      performUpdates,
    } = this.props;
    return (
      <TimerHOC
        timeSetMins={timeSetMins}
        timeSetBreak={timeSetBreak}
        currSess={currSess}
        handler={handler}
        colorPal={colorPal}
        showAbout={showAbout}
        changeQuote={changeQuote}
        changePicture={changePicture}
        resetTimer={resetTimer}
        addTasks={addTasks}
        tasks={tasks}
        showToDo={showToDo}
        removeTask={removeTask}
        markTask={markTask}
        addSubTask={addSubTask}
        serverStatus={serverStatus}
        performUpdates={performUpdates}
      />
    );
  }
}
class ClockUpDown extends Component {
  componentDidMount() {
    let { setTime, pause } = this.props.timer;
    let { timeSetMins, timeSetBreak } = this.props;
    setTime((timeSetMins + timeSetBreak) * 60000);
    setTimeout(() => {
      pause();
    }, 50);
    console.log("timer mounted");
    const { setCheckpoints } = this.props.timer;
    let { changeQuote, changePicture, handler } = this.props;
    let timeSetMinsMS = timeSetMins * 60000;
    let timeBrkSetMS = timeSetBreak * 60000;
    let x = timeSetMinsMS + timeBrkSetMS;

    let intVal = [];
    let n = 20;
    if (x % n === 0) {
      for (let i = 0; i < n; i++) {
        intVal.push(x - i * (x / n));
      }
    } else {
      let zp = n - (x % n);
      let pp = x / n;
      for (let i = 0; i < n; i++) {
        if (i >= zp) intVal.push(x - i * (pp + 1));
        else intVal.push(x - i * pp);
      }
    }
    setCheckpoints([
      {
        time: x - 20,
        callback: () => {
          changeQuote(1);
          changePicture(1);
        },
      },
      {
        time: intVal[19],
        callback: () => {
          changeQuote(1);
          changePicture(1);
        },
      },
      {
        time: intVal[18],
        callback: () => {
          changeQuote(1);
          changePicture(1);
        },
      },
      {
        time: intVal[17],
        callback: () => {
          changeQuote(1);
          changePicture(1);
        },
      },
      {
        time: intVal[16],
        callback: () => {
          changeQuote(1);
          changePicture(1);
        },
      },
      {
        time: intVal[15],
        callback: () => {
          changeQuote(1);
          changePicture(1);
        },
      },
      {
        time: intVal[14],
        callback: () => {
          changeQuote(1);
          changePicture(1);
        },
      },
      {
        time: intVal[13],
        callback: () => {
          changeQuote(1);
          changePicture(1);
        },
      },
      {
        time: intVal[12],
        callback: () => {
          changeQuote(1);
          changePicture(1);
        },
      },
      {
        time: intVal[11],
        callback: () => {
          changeQuote(1);
          changePicture(1);
        },
      },
      {
        time: intVal[10],
        callback: () => {
          changeQuote(1);
          changePicture(1);
        },
      },
      {
        time: intVal[9],
        callback: () => {
          changeQuote(1);
          changePicture(1);
        },
      },
      {
        time: intVal[8],
        callback: () => {
          changeQuote(1);
          changePicture(1);
        },
      },
      {
        time: intVal[7],
        callback: () => {
          changeQuote(1);
          changePicture(1);
        },
      },
      {
        time: intVal[6],
        callback: () => {
          changeQuote(1);
          changePicture(1);
        },
      },
      {
        time: intVal[5],
        callback: () => {
          changeQuote(1);
          changePicture(1);
        },
      },
      {
        time: intVal[4],
        callback: () => {
          changeQuote(1);
          changePicture(1);
        },
      },
      {
        time: intVal[3],
        callback: () => {
          changeQuote(1);
          changePicture(1);
        },
      },
      {
        time: intVal[2],
        callback: () => {
          changeQuote(1);
          changePicture(1);
        },
      },
      {
        time: intVal[1],
        callback: () => {
          changeQuote(1);
          changePicture(1);
        },
      },
      {
        time: intVal[0],
        callback: () => {
          changeQuote(1);
          changePicture(1);
        },
      },
    ]);
  }
  componentDidUpdate(prevProps, prevState) {}
  render() {
    let {
      start,
      reset,
      pause,
      getTimerState,
      getTime,
      setTime,
    } = this.props.timer;
    let {
      timeSetMins,
      timeSetBreak,
      currSess,
      handler,
      colorPal,
      resetTimer,
      addTasks,
      tasks,
      showToDo,
      removeTask,
      markTask,
      addSubTask,
      serverStatus,
      performUpdates,
    } = this.props;
    handler(this.props.timer);
    let timeSetms = timeSetMins * 60000;
    let timeBrkSetms = timeSetBreak * 60000;
    let timeCumms = timeSetms + timeBrkSetms;
    let threshold = timeSetms / 4;
    let timerState;
    let timeNow = Math.ceil(getTime() / 60000);
    let { textColor, borderColor, bgColor, bgMuted } = colorPal;
    let showNoneBlink = currSess === over ? true : false;
    let showPlay =
      (currSess === init || getTimerState() === psd || timeNow === timeCumms) &&
      !showNoneBlink
        ? true
        : false;
    let showPause =
      getTimerState() !== psd &&
      timeNow !== timeCumms &&
      !showNoneBlink &&
      !showPlay
        ? true
        : false;
    let showReset =
      getTimerState() === psd &&
      currSess !== brk &&
      currSess !== over &&
      currSess !== init;
    let title;
    if (showPlay) {
      if (showReset && currSess === work) {
        timerState = "press play to work";
        title = "Paused";
      } else if (currSess === brk) {
        setTimeout(() => {
          psdbrkMp3.play();
        }, 4000);
        timerState = "press play and relax.";
        title = "Paused";
      } else {
        timerState = "lets get started.";
      }
    } else if (showPause && !showPlay) {
      if (currSess === work) {
        alarmMp3.pause();
        alarmMp3.currentTime = 0;

        timerState = "working.";
        title = "Working";
      } else if (currSess === brk) {
        psdbrkMp3.pause();
        psdbrkMp3.currentTime = 0;

        timerState = "on a break.";
        title = "Break";
      }
    } else {
      setTimeout(() => {
        alarmMp3.play();
      }, 500);
      timerState = "session over.";
      title = "Session Over";
    }

    return (
      <div>
        <Helmet titleTemplate="%s | t'martyr" defaultTitle="t'martyr">
          <title>
            {currSess === init
              ? ""
              : currSess !== over
              ? title + ` | ` + timeNow + " min. to go"
              : "Session Over!"}
          </title>
        </Helmet>

        {showToDo ? (
          <ToDoList
            addTasks={addTasks}
            tasks={tasks}
            colorPal={colorPal}
            removeTask={removeTask}
            markTask={markTask}
            addSubTask={addSubTask}
            serverStatus={serverStatus}
            performUpdates={performUpdates}
          />
        ) : (
          <div>
            <TimeStyle css={blinkText} large color={textColor}>
              <Timer.Minutes />:<Timer.Seconds />
            </TimeStyle>
            <ButtonContainer key={timeSetBreak + timeSetMins}>
              {showPlay && (
                <AlertButt
                  icon={faPlayCircle}
                  handler={start}
                  color={textColor}
                  size={"2x"}
                  bgColor={bgMuted}
                  message={
                    currSess === init
                      ? `Start a session of ${timeSetMins} min. w/ break of ${timeSetBreak} min.`
                      : currSess === brk
                      ? `Continue break`
                      : `Continue session`
                  }
                />
              )}
              {showPause && (
                <AlertButt
                  icon={faPauseCircle}
                  handler={pause}
                  color={textColor}
                  size={"2x"}
                  bgColor={bgMuted}
                  message={`Pause work session`}
                />
              )}
              {showReset && (
                <AlertButt
                  icon={faDotCircle}
                  handler={reset}
                  color={textColor}
                  size={"2x"}
                  bgColor={bgMuted}
                  message={`Reset work session`}
                />
              )}
              {showNoneBlink && (
                <Button
                  data-tip="Redo session"
                  data-place="bottom"
                  data-delay-show="250"
                  effect="solid"
                  data-text-color={textColor}
                  data-background-color={bgMuted}
                  onClick={() => {
                    resetTimer(this.props.timer);
                    overMp3.play();
                  }}
                >
                  <FontAwesomeIcon
                    size={"2x"}
                    icon={faRedo}
                    color={textColor}
                  />
                </Button>
              )}
            </ButtonContainer>
            <TimeStyle color={textColor}>{timerState}</TimeStyle>
          </div>
        )}
      </div>
    );
  }
}

const withTimer = (timerProps) => (WrappedComponent) => (
  wrappedComponentProps
) => (
  <Timer {...timerProps}>
    {(timerRenderProps) => (
      <WrappedComponent
        {...wrappedComponentProps}
        timer={timerRenderProps}
      ></WrappedComponent>
    )}
  </Timer>
);
const TimerHOC = withTimer({
  initialValue: 0,
  startImmediately: "false",
  direction: "backward",
  onStart: () => startMp3.play(),
  onStop: () => overMp3.play(),
  onReset: () => againMp3.play(),
  onPause: () => pauseMp3.play(),
  formatValue: (value) => `${value < 10 ? `0${value}` : `${value}`}`,
  lastUnit: "m",
  timeToUpdate: 998,
})(ClockUpDown);

const AlertButt = (props) => {
  const { icon, handler, message, color, size, bgColor } = props;
  return (
    <Button
      data-tip={message}
      data-place="bottom"
      data-delay-show="250"
      data-text-color={color}
      data-background-color={bgColor}
      color={color}
      effect="solid"
      onClick={() => {
        handler();
      }}
    >
      {" "}
      <ReactTooltip />
      <FontAwesomeIcon size={size} icon={icon} color={color} />
    </Button>
  );
};
export default TimerComp;
