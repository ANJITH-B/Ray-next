import React from "react";
import './formInputStyle.scss'
const RoundedCheckbox = (props) => {
  return (
    <div class="round">
      <input {...props} type="checkbox"  id="checkbox" />
      <label for="checkbox"></label>
    </div>
  );
};

export default RoundedCheckbox;
