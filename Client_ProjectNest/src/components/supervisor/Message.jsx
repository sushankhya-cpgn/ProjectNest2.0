import { HiMiniLink } from "react-icons/hi2";
import { IoIosSend } from "react-icons/io";
import { IoCall } from "react-icons/io5";
import { FaVideo } from "react-icons/fa";

export default function Message() {
  return (
    <div className=" w-full text-text p-1  flex flex-col h-full justify-between">
      <div className="title text-center font-medium text-lg text-gray-500">
        ProjectNest
      </div>
      <div className="header w-full h-fit flex justify-between mt-6">
        <div className="namenprofile flex gap-1">
          <img
            src="https://via.placeholder.com/32"
            alt="Profile"
            className="w-8 h-8 rounded-full mr-2"
          />
          <span className="name">Mohit Shahi</span>
        </div>

        <div className="audionvideo flex gap-7 text-accent">
          <span className="name">
            <IoCall className="text-xl" />
          </span>
          <span className="name">
            <FaVideo className="text-xl" />
          </span>
        </div>
      </div>
      <div className="header w-full h-5/6"></div>
      <div className="footer w-full h-fit flex gap-3">
        <span className="link text-xl cursor-pointer">
          <HiMiniLink className="text-accent font-bold mt-2" type="file" />
        </span>
        <input
          type="text"
          placeholder="message"
          className="rounded-md h-9 w-full flex-grow p-2 border-none focus:outline-none focus:ring-0"
        />
        <button className="bg-accent px-5 py-3 rounded-lg flex items-center justify-center gap-2 h-9 text-text text-xl">
          <IoIosSend />
        </button>
      </div>
    </div>
  );
}
