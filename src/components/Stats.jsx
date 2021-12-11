import React from "react";

export default function Stats({ point }) {
  return (
    <div id="stats">
      <p>
        {localStorage.getItem("Name") ? localStorage.getItem("Name") : null}
      </p>
      <p>Point : {point}</p>
    </div>
  );
}
