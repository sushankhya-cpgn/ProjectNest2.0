import React from "react";
import { SideImage } from "./SideImage";
import { InputField } from "./InputField";
import { Button } from "./Button";
import { LoginHeader } from "./LoginHeader";

export function Form() {
  const styleobj = [
    { inputtype: "text", placeholder: "Username or Email", margin: 12 },
    {
      inputtype: "password",
      placeholder: "Password",
      margin: 0,
    },
  ];

  function handleSubmit(e) {
    e.preventDefault();
  }
  function ForgotPassword() {
    return (
      <p className="text-xs text-end  text-blue-600  hover:text-blue-800 cursor-pointer ">
        Forgot Password ?
      </p>
    );
  }
  return (
    <form
      className="flex flex-row justify-evenly  border-2 h-3/5 w-5/12 rounded-lg bg-white  text-black shadow-2xl "
      onSubmit={handleSubmit}
    >
      <SideImage />
      <div className="mt-16 flex flex-col pr-7 ">
        <LoginHeader />
        <div className="h-full flex flex-col gap-4  text-black">
          <InputField styleobj={styleobj[0]} />
          <InputField styleobj={styleobj[1]} />
          <ForgotPassword />
          <Button />
        </div>
      </div>
    </form>
  );
}
