import { RxHamburgerMenu } from "react-icons/rx";
import { GrHomeRounded } from "react-icons/gr";
import { LuSearchCode } from "react-icons/lu";
import { CiLogout } from "react-icons/ci";
import { FiSettings } from "react-icons/fi";
import Logo from "../Logo";
import { useState } from "react";
import StudentNavBarItem from "./StudentNavBarItem";

const iconColor = "#B4B4B8";

function StudentNavBar() {
  const [isFullMenue, setIsFullMenue] = useState(true);
  return (
    <div className=" bg-background overflow-y-scroll w-fit flex flex-col justify-between h-full px-2 py-8 rounded-lg ">
      <div className="flex sticky -top-8 bg-inherit flex-row justify-between items-center px-5 py-4">
        <RxHamburgerMenu
          className="cursor-pointer"
          size={28}
          color={iconColor}
          onClick={() => setIsFullMenue((preState) => !preState)}
        />
        {isFullMenue && <Logo />}
      </div>
      <div className="mb-20 flex flex-col gap-5 ">
        <StudentNavBarItem isFullMenue={isFullMenue} name="home">
          <GrHomeRounded color={iconColor} size={20} />
        </StudentNavBarItem>

        <StudentNavBarItem isFullMenue={isFullMenue} name="find project">
          <LuSearchCode color={iconColor} size={20} />
        </StudentNavBarItem>

        <StudentNavBarItem isFullMenue={isFullMenue} name="settings">
          <FiSettings color={iconColor} size={20} />
        </StudentNavBarItem>
      </div>
      <StudentNavBarItem isFullMenue={isFullMenue} name="logout">
        <CiLogout color={iconColor} size={20} />
      </StudentNavBarItem>
    </div>
  );
}

export default StudentNavBar;
