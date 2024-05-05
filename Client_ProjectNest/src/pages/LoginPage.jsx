import React from "react";

function LoginPage() {
  return (
    <div className="h-screen w-screen bg-background text-text flex justify-center items-center">
      <form className="flex flex-row justify-evenly  border-2 h-3/5 w-5/12 rounded-md bg-white text-black">
        <div className="w-20">img</div>
        <div className="mt-20">
          <h1 className="font-bold font-sans text-xl">Login to your account</h1>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
