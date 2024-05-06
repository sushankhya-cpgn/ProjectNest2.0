import React from "react";

function SideImage() {
  return (
    <div className="flex justify-center items-center m-10  ">
      <img
        src="./public/productivity.png"
        alt="pic"
        className=" h-36  w-full"
      />
    </div>
  );
}
/* eslint-disable react/prop-types */
function InputField({ styleobj }) {
  return (
    <input
      type={styleobj.inputtype}
      placeholder={styleobj.placeholder}
      className={` first-of-type:mt-8 bg-sky-100   h-10 p-3 rounded-md w-11/12 `}
    ></input>
  );
}

function Button() {
  return (
    <button className=" bg-blue-500 h-10 w-11/12 text-white rounded-lg border-none hover:bg-blue-600 ">
      Sign In
    </button>
  );
}

function LoginHeader() {
  return (
    <h1 className="font-bold   font-serif text-2xl  w-max ">
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

function LoginPage() {
  return (
    <div className="h-screen w-screen  bg-loginbackground bg-cover text-text flex justify-center items-center">
      <Form />
    </div>
  );
}

export default LoginPage;
