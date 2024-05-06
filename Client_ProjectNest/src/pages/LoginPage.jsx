import React from "react";

function SideImage() {
  return (
    <div className="flex justify-center items-center">
      <img
        src="./public/productivity.png"
        alt="pic"
        className="  w-10/12 h-4/6 "
      />
    </div>
  );
}

function InputField({ styleobj }) {
  return (
    <input
      type={styleobj.inputtype}
      placeholder={styleobj.placeholder}
      className={` mt-2 bg-sky-100  w-60 h-10 p-3 rounded-md`}
    ></input>
  );
}

function Button() {
  return (
    <button className=" bg-blue-500 h-10 text-white rounded-lg border-none hover:bg-blue-600 ">
      Sign In
    </button>
  );
}

function LoginHeader() {
  return (
    <h1 className="font-bold   font-serif text-2xl">
      Login in using KU Account
    </h1>
  );
}

function Form() {
  const styleobj = [
    { inputtype: "text", placeholder: "Username or Email", margin: 12 },
    {
      inputtype: "password",
      placeholder: "Password",
      margin: 0,
    },
  ];
  return (
    <form className="flex flex-row justify-around  border-2 h-3/5 w-5/12 rounded-lg bg-white  text-black shadow-2xl ">
      <SideImage />
      <div className="mt-16 flex flex-col pr-7 ">
        <LoginHeader />
        <div className="h-full flex flex-col gap-4  text-black">
          <InputField styleobj={styleobj[0]} />
          <InputField styleobj={styleobj[1]} />
          <p className="text-xs text-end text-black">Forgot Password ?</p>
          <Button />
        </div>
      </div>
    </form>
  );
}

function LoginPage() {
  return (
    <div className="h-screen w-screen  bg-loginbackground text-text flex justify-center items-center">
      <Form />
    </div>
  );
}

export default LoginPage;
