import React from "react";

/* eslint-disable react/prop-types */
export function InputField({ styleobj, value, setValue }) {
  function handleChange(e) {
    setValue(e.target.value);
  }
  return (
    <input
      type={styleobj.inputtype}
      placeholder={styleobj.placeholder}
      value={value}
      className={` first-of-type:mt-8 bg-sky-100   h-10 p-3 rounded-md md:w-11/12 `}
      onChange={handleChange}
    ></input>
  );
}
