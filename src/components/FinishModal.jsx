import React, { useEffect, useState } from "react";
import Modal from "react-modal";

export default function FinishModal({ customStyles, lose, point, time }) {
  const [ms, setMs] = useState(0);
  const [sec, setSec] = useState(0);
  const [min, setMin] = useState(0);

  useEffect(() => {
    if (time) {
      setMin(("0" + Math.floor((time / 60000) % 60)).slice(-2));
      setSec(("0" + Math.floor((time / 1000) % 60)).slice(-2));
      setMs(("0" + ((time / 10) % 100)).slice(-2));
    }
  }, [min, sec, ms, time]);

  return (
    <div>
      <Modal id="finish-modal" isOpen={lose} style={customStyles}>
        <div className="game-stats">
          <p>Point : {point}</p>
          <p>Total Click : {min + ":" + sec + ":" + ms}</p>
          <button
            className="reset-button"
            onClick={() => window.location.reload()}
          >
            Play Again
          </button>
        </div>
      </Modal>
    </div>
  );
}
