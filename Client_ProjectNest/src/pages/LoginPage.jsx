import React from "react";
import { Form } from "../components/Login/Form";

function LoginPage() {
  return (
    <div className="h-screen w-screen  bg-loginbackground bg-cover text-text flex justify-center items-center  md:h-screen ">
      <Form />
    </div>
  );
}

export default LoginPage;
