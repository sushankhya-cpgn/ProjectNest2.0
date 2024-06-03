import Button from "../Button";
import GreetingMessage from "./GreetingMessage";

import { IoCalendarOutline } from "react-icons/io5";

import Profile from "../student/Profile";

export default function StudentFeedHeader({ onCreateProject }) {
  return (
    <>
      <div>
        <div className="flex text-stone-100 justify-between ">
          <Button onClick={onCreateProject}>
            <span className="text-xl">+</span>
            <span className="hidden sm:block sm:text-sm">Create Project</span>
          </Button>
          <Profile />
          <div className="flex justify-center items-center lg:hidden cursor-pointer hover:bg-slate-500/20 px-3 rounded-full">
            <IoCalendarOutline size={24} />
          </div>
        </div>
        <GreetingMessage />
      </div>
    </>
  );
}
