import usePomodoro from "../../Hooks/Context/usePomodoro";
import { Card, Button } from "tiny-ui";
import { FiPause, FiPlay } from "react-icons/fi";
import Countdown2 from "react-countdown";
import React from "react";
import { minutesToSeconds, saveTime } from "../../Helpers/utils";

export default function CountDown() {
  const { currentTask, stopTask } = usePomodoro();
  const seconds = minutesToSeconds(
    currentTask?.minutes * currentTask?.pomodoros
  );
  const deadline = new Date(Date.now() + 1000 * 60 * 60 * 0 + 1000 * seconds);
  const countDownRef = React.useRef(null);

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

  const onTick = ({ minutes, seconds }) => {
    const totalSeconds = minutesToSeconds(minutes) + seconds;
    saveTime(totalSeconds);
  };

  return currentTask ? (
    <div className="currentTask">
      <Card
        active
        title={currentTask.title}
        extra={
          <Button size="sm" btnType="ghost" onClick={stopTask}>
            Finalizar
          </Button>
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
