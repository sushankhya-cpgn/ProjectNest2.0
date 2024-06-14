import React, { useState } from "react";
import { SideImage } from "./SideImage";
import { InputField } from "./InputField";
import { Button } from "./Button";
import { LoginHeader } from "./LoginHeader";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Form() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const styleobj = [
    { inputtype: "text", placeholder: "Username or Email", margin: 12 },
    { inputtype: "password", placeholder: "Password", margin: 0 },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v2/user/login",
        {
          email: username,
          password,
        }
      );

      const role = response.data.data.user.role; // Corrected the path to access the role
      const token = response.data.token;
      localStorage.setItem("token", token);
      console.log("Token saved:", token);

      if (role === "student") {
        navigate("/app/student");
      } else if (role === "supervisor") {
        navigate("/app/supervisor");
      } else {
        navigate("/app/admin");
      }
    } catch (error) {
      setError("Invalid username or password. Please try again.");
    }
  };

  return (
    <form
      className="flex flex-col md:flex-row justify-center items-center md:justify-between border-2 h-auto md:h-3/5 w-9/12 md:w-5/12 xl:w-6/12 rounded-lg bg-white text-black shadow-2xl p-4 md:p-0 lg:w-6/12"
      onSubmit={handleSubmit}
    >
      <SideImage />
      <div className="md:mt-0 mt-4 md:pr-7 flex flex-col items-center md:items-start">
        <LoginHeader />
        <div className="h-full flex flex-col gap-4 text-black md:w-full">
          <InputField
            styleobj={styleobj[0]}
            value={username}
            setValue={setUsername}
          />
          <InputField
            styleobj={styleobj[1]}
            value={password}
            setValue={setPassword}
          />
          {error && <p className="text-xs text-red-600">{error}</p>}
          <Button />
        </div>
      </div>
    </form>
  );
}
