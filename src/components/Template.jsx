import React, { useEffect, useState } from "react";
import Stopwatch from "./Stopwatch";
import Modal from "react-modal";
import Stats from "./Stats";
import FinishModal from "./FinishModal";

export default function Template() {
  const [color, setColor] = useState();
  const [fakeColor, setFakeColor] = useState();
  const [point, setPoint] = useState(0);
  const [start, setStart] = useState(false);
  const [name, setName] = useState();
  const [lose, setLose] = useState(false);
  const [modalIsOpen, setIsOpen] = React.useState(true);

  var ReactElement = [];

  const colors = [
    "green",
    "yellow",
    "blue",
    "darkblue",
    "white",
    "red",
    "orange",
    "black",
    "purple",
  ];

  //Modal Style
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      textAlign: "center",
      width: "300px",
      background: "rgba(50, 57, 88, 0.8)",
      transform: "translate(-50%, -50%)",
    },
  };

  // create buttons for game
  for (let index = 1; index <= 9; index++) {
    ReactElement.push(
      React.createElement("input", {
        id: index,
        type: "button",
        onClick: () => handleClick(index),
      })
    );
    if (index % 3 === 0) {
      ReactElement.push(React.createElement("br"));
    }
  }

  // handle input value
  function handleChange(event) {
    if (event.target.value != null) {
      setName(event.target.value);
    }
  }

  function startGame() {
    localStorage.setItem("Name", name);
    setStart(true);
    setIsOpen(false);
  }

  function handleClick(index) {
    if (start === true) {
      if (color === document.getElementById(index).style.background) {
        setPoint(point + 1);
      } else {
        setLose(true);
        setStart(false);
      }
    }
  }

  var time;
  if (localStorage.getItem("Time")) {
    time = JSON.parse(localStorage.getItem("Time"));
  }

  useEffect(() => {
    if (localStorage.getItem("Name")) {
      localStorage.setItem("Start", start);

      var randomColor = Math.floor(Math.random() * 9);
      var colorName = colors[randomColor];

      setColor(colorName);
      setFakeColor(colors[Math.floor(Math.random() * 9)]);

      for (let index = 1; index <= 9; index++) {
        if (ReactElement.length > 0) {
          var randomNum = Math.floor(Math.random() * colors.length);
          document.getElementById(index).style.background = colors[randomNum];
          colors.splice(randomNum, 1);
        }
      }
    }
  }, [start, colors, ReactElement.length]);

  return (
    <div>
      <Stats point={point} />

      <Stopwatch point={point} lose={lose} />

      <div id="template">
        <section>
          <h1 style={{ textShadow: "3px 3px 3px " + fakeColor }}>{color}</h1>
          {ReactElement}
        </section>
      </div>

      <Modal isOpen={modalIsOpen} style={customStyles}>
        <h1 className="pick-color-title">Pick Color</h1>
        <div className="modal-form">
          <label>Name</label>
          <input id="name" type="text" onChange={handleChange} />
        </div>
        <div>
          <button id="mix-button" onClick={startGame} disabled={!name}>
            Mix The Colors{" "}
          </button>
        </div>
      </Modal>

      <FinishModal
        customStyles={customStyles}
        lose={lose}
        point={point}
        time={time}
      />
    </div>
  );
}
