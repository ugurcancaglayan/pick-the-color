import React, { useEffect, useState } from "react";

export default function Stopwatch({ point, lose }) {
  const [time, setTime] = useState(0);
  const [start, setStart] = useState(false);
  const [ms, setMs] = useState(0);
  const [sec, setSec] = useState(0);
  const [min, setMin] = useState(0);

  if (point > 0 && start === false) {
    setStart(true);
  }

  useEffect(() => {
    let interval = null;

    if (start === true) {
      setStart(JSON.parse(localStorage.getItem("Start")));

      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);

      localStorage.setItem("Time", time);
    }

    if (lose === true) {
      setMin(("0" + Math.floor((time / 60000) % 60)).slice(-2));
      setSec(("0" + Math.floor((time / 1000) % 60)).slice(-2));
      setMs(("0" + ((time / 10) % 100)).slice(-2));
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [min, sec, ms, start, time, lose]);

  return (
    <div id="stopwatch">
      <p>
        <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
        <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
        <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
      </p>
    </div>
  );
}
