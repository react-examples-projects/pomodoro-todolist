import usePomodoro from "../../Hooks/Context/usePomodoro";
import { Card, Button } from "tiny-ui";
import { FiPause, FiPlay } from "react-icons/fi";
import Countdown2 from "react-countdown";
import React from "react";
import {
  minutesToSeconds,
  saveTime,
  getTextSubstring,
} from "../../Helpers/utils";
import { FiStopCircle } from "react-icons/fi";
import { useRef } from "react";
import alert from "../../../Assets/alert.mp3";
import TextLimit from "../TextLimit";
import MinimizeButton from "./MinimizeButton";

export default function CountDown() {
  let isMinimized = false;
  const { currentTask, stopTask } = usePomodoro();
  const seconds = minutesToSeconds(
    currentTask?.minutes * currentTask?.pomodoros
  );
  const title = getTextSubstring(currentTask?.title, 20);

  const deadline = new Date(Date.now() + 1000 * 60 * 60 * 0 + 1000 * seconds);
  const countDownRef = useRef(null);
  const countDownNodeRef = useRef(null);
  const countDownCardContentNode = useRef(null);

  const renderer = ({ hours, minutes, seconds, completed }) => {
    return (
      <span style={{ fontSize: "16px" }} className="d-block">
        {completed && <audio src={alert} className="d-none" autoPlay />}
        <span className="pomodoro-time">
          {hours}h {minutes}m {seconds}s
        </span>

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
    // es necesario para que el componente no se resetee el estado
    countDownNodeRef.current?.classList.toggle("currentTask-isMinimized");
    countDownCardContentNode.current?.classList.toggle("d-none");
    isMinimized = !isMinimized;
  };

  const onTick = ({ minutes, seconds }) => {
    const totalSeconds = minutesToSeconds(minutes) + seconds;
    saveTime(totalSeconds);
  };

  return currentTask ? (
    <div ref={countDownNodeRef} className="currentTask">
      <Card
        active
        title={title}
        extra={
          <div>
            <Button size="sm" btnType="ghost" onClick={stopTask}>
              <FiStopCircle className="me-1" />
              Finalizar
            </Button>
            <MinimizeButton onClick={toggleMinimizeTask} />
          </div>
        }
      >
        <Card.Content style={{ padding: ".5rem" }}>
          <div ref={countDownCardContentNode}>
            <TextLimit limit={70} text={currentTask.content} />
          </div>

          <br />
          <Countdown2
            date={deadline}
            renderer={renderer}
            ref={countDownRef}
            onTick={onTick}
            autoStart={true}
          />
        </Card.Content>
      </Card>
    </div>
  ) : null;
}
