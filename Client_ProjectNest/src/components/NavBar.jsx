import { RxHamburgerMenu } from "react-icons/rx";
import { GrHomeRounded } from "react-icons/gr";
import { LuSearchCode } from "react-icons/lu";
import { CiLogout } from "react-icons/ci";
import { MdAddCircle } from "react-icons/md";
import { IoTrashBin } from "react-icons/io5";
import { FaArchive } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import Logo from "./Logo";
import { useState } from "react";
import NavBarItem from "./NavBarItem";
import { useUser } from "../contexts/userContext";

const iconColor = "#dbdbdb";

export default function NavBar() {
  const [isFullMenue, setIsFullMenue] = useState(true);
  const { user } = useUser();
  if (!user) return <h1>Loading..</h1>;
  return (
    <div className=" bg-background overflow-y-scroll w-fit flex flex-col justify-between h-full px-2 py-8 rounded-lg ">
      <div className="flex sticky -top-8 bg-inherit flex-row justify-between items-center px-5 py-4 gap-4">
        <RxHamburgerMenu
          className="cursor-pointer hidden sm:block"
          size={28}
          color={iconColor}
          onClick={() => setIsFullMenue((preState) => !preState)}
        />
        <img className="h-7 sm:hidden" alt="logo" src="/logo_light2.png"></img>
        {isFullMenue && (
          <div className="hidden sm:block">
            <Logo />
          </div>
        )}
      </div>
      <div className="mb-20 flex flex-col gap-5 h-fit">
        {user.role === "student" && (
          <>
            <NavBarItem navto="home" isFullMenue={isFullMenue} name="home">
              <GrHomeRounded color={iconColor} size={20} />
            </NavBarItem>
            <NavBarItem
              navto="findproject"
              isFullMenue={isFullMenue}
              name="find project"
            >
              <LuSearchCode color={iconColor} size={20} />
            </NavBarItem>

            <NavBarItem
              navto="settings"
              isFullMenue={isFullMenue}
              name="settings"
            >
              <FiSettings color={iconColor} size={20} />
            </NavBarItem>
          </>
        )}
        {user.role === "admin" && (
          <>
            <NavBarItem
              isFullMenue={isFullMenue}
              name="project requests"
              navto="projectrequests"
            >
              <MdAddCircle color={iconColor} size={20} />
            </NavBarItem>
            <NavBarItem
              isFullMenue={isFullMenue}
              name="project details"
              navto="project"
            >
              <LuSearchCode color={iconColor} size={20} />
            </NavBarItem>

            <NavBarItem
              isFullMenue={isFullMenue}
              name="deleted projects"
              navto="deletedprojects"
            >
              <IoTrashBin color={iconColor} />
            </NavBarItem>
            <NavBarItem
              isFullMenue={isFullMenue}
              name="project archives"
              navto="archives"
            >
              <FaArchive color={iconColor} />
            </NavBarItem>
          </>
        )}
        {user.role === "supervisor" && (
          <>
            <NavBarItem navto="homesuper" isFullMenue={isFullMenue} name="home">
              <GrHomeRounded color={iconColor} size={20} />
            </NavBarItem>
            <NavBarItem
              navto="findprojects"
              isFullMenue={isFullMenue}
              name="find project"
            >
              <LuSearchCode color={iconColor} size={20} />
            </NavBarItem>
            <NavBarItem
              navto="settings"
              isFullMenue={isFullMenue}
              name="settings"
            >
              <FiSettings color={iconColor} size={20} />
            </NavBarItem>
          </>
        )}
      </div>

      <NavBarItem navto="logout" isFullMenue={isFullMenue} name="logout">
        <CiLogout color={iconColor} size={20} />
      </NavBarItem>
    </div>
  );
}
