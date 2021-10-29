import usePomodoro from "../../Hooks/Context/usePomodoro";
import { Card, Button } from "tiny-ui";
import { FiPause, FiPlay } from "react-icons/fi";
import Countdown2 from "react-countdown";
import React from "react";
import { minutesToSeconds, saveTime } from "../../Helpers/utils";
import { FiStopCircle, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { useRef, useState } from "react";
import cls from "classnames";

export default function CountDown() {
  const [isMinimized, setMinimized] = useState(false);
  const { currentTask, stopTask } = usePomodoro();
  const seconds = minutesToSeconds(
    currentTask?.minutes * currentTask?.pomodoros
  );
  const deadline = new Date(Date.now() + 1000 * 60 * 60 * 0 + 1000 * seconds);
  const countDownRef = useRef(null);

  const renderer = ({ hours, minutes, seconds, completed }) => {
    return (
      <span style={{ fontSize: "16px" }} className="d-block mt-2">
        {hours}h {minutes}m {seconds}s
        <div className="center-y mt-1">
          {countDownRef.current?.isPaused() ? (
            <Button onClick={countDownRef.current?.start} size="sm">
              <FiPlay />
              Iniciar
            </Button>
          ) : (
            <Button onClick={countDownRef.current?.pause} size="sm">
              <FiPause />
              Pausar
            </Button>
          )}
        </div>
      </span>
    );
  };

  const toggleMinimizeTask = () => {
    setMinimized(!isMinimized);
  };

  const onTick = ({ minutes, seconds }) => {
    const totalSeconds = minutesToSeconds(minutes) + seconds;
    saveTime(totalSeconds);
  };

  return currentTask ? (
    <div
      className={cls("currentTask", { "currentTask-isMinimized": isMinimized })}
    >
      <Card
        active
        title={currentTask.title}
        extra={
          <div>
            <Button size="sm" btnType="ghost" onClick={stopTask}>
              <FiStopCircle className="me-1" />
              Finalizar
            </Button>
            <Button size="sm" btnType="ghost" onClick={toggleMinimizeTask}>
              {isMinimized ? (
                <>
                  <FiChevronUp className="me-1" />
                  Expandir
                </>
              ) : (
                <>
                  <FiChevronDown className="me-1" />
                  Minimizar
                </>
              )}
            </Button>
          </div>
        }
      >
        <Card.Content>
          {currentTask.content}
          <br />
          <Countdown2
            date={deadline}
            renderer={renderer}
            ref={countDownRef}
            onTick={onTick}
          />
        </Card.Content>
      </Card>
    </div>
  ) : null;
}
