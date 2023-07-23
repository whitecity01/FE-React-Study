import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Input from "./Input";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Button = styled.button`
  margin: 5px;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #45a049;
  }
`;

const TimerDisplay = styled.h1`
  font-size: 32px;
`;

const Timer = () => {
  const [hours, hourTime] = useState(0);
  const [minutes, minTime] = useState(0);
  const [seconds, secTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [display, setDisplay] = useState(false);
  const hourRef = useRef(null);
  const minuteRef = useRef(null);
  const secondRef = useRef(null);

  const setStyle = {
    display: display ? "none" : "block",
  };
  const disStyle = {
    display: display ? "block" : "none",
  };

  useEffect(() => {
    let timer;

    if (isRunning) {
      timer = setInterval(() => {
        if (seconds > 0) {
          secTime(seconds - 1);
        } else {
          if (minutes > 0) {
            minTime(minutes - 1);
            secTime(59);
          } else {
            if (hours > 0) {
              secTime(59);
              minTime(59);
              hourTime(hours - 1);
            }
          }
        }
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [minutes, seconds, hours, isRunning]);

  const onClickStart = () => {
    try {
      const hTime = hourRef.current.value;
      const mTime = minuteRef.current.value;
      const sTime = secondRef.current.value;
      if (mTime > 59 || sTime > 59 || hTime > 99) {
        throw new Error("올바른 범위의 수를 입력하세요");
      }
      if (!hTime || !mTime || !sTime) {
        throw new Error("시간,분,초를 모두 입력하세요");
      }
      if (hTime < 0 || mTime < 0 || sTime < 0) {
        throw new Error("양수를 입력하세요");
      }
      hourTime(hTime);
      minTime(mTime);
      secTime(sTime);
      setIsRunning(true);
      setDisplay(true);
    } catch (err) {
      alert(err.message);
    }
  };

  const onClickPause = () => {
    hourRef.current.value = hours;
    minuteRef.current.value = minutes;
    secondRef.current.value = seconds;
    setIsRunning(false);
  };

  const onClickReset = () => {
    hourRef.current.value = 0;
    minuteRef.current.value = 0;
    secondRef.current.value = 0;
    setIsRunning(false);
    setDisplay(false);
  };

  return (
    <Container>
      <Input
        setStyle={setStyle}
        hourRef={hourRef}
        minuteRef={minuteRef}
        secondRef={secondRef}
      />
      <div>
        <TimerDisplay style={disStyle}>
          {hours < 10 ? `0${hours}` : hours} :
          {minutes < 10 ? `0${minutes}` : minutes} :
          {seconds < 10 ? `0${seconds}` : seconds}
        </TimerDisplay>
      </div>
      <div>
        <Button onClick={onClickStart}>시작</Button>
        <Button onClick={onClickPause}>일시정지</Button>
        <Button onClick={onClickReset}>초기화</Button>
      </div>
    </Container>
  );
};

export default Timer;
