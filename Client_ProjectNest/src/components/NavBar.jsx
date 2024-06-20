import { RxHamburgerMenu } from "react-icons/rx";
import { GrHomeRounded } from "react-icons/gr";
import { LuSearchCode } from "react-icons/lu";
import { CiLogout } from "react-icons/ci";
import { MdAddCircle } from "react-icons/md";
import { FaArchive } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import Logo from "./Logo";
import { useState } from "react";
import NavBarItem from "./NavBarItem";
import { AiTwotoneProject } from "react-icons/ai";
import { useUser } from "../contexts/userContext";
import { useNavigate } from "react-router-dom";
const iconColor = "#dbdbdb";

export default function NavBar() {
  const [isFullMenue, setIsFullMenue] = useState(true);
  const { user } = useUser();
  const navigate = useNavigate();
  if (!user) return <h1>Loading..</h1>;
  return (
    <div className=" bg-background overflow-y-scroll w-fit flex flex-col justify-between h-dvh px-2 py-8 rounded-lg flex-shrink-0">
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
      <div className="flex overflow-y-scroll flex-col gap-5 h-auto">
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
              navto="myprojects"
              isFullMenue={isFullMenue}
              name="my projects"
            >
              <AiTwotoneProject color={iconColor} size={20} />
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
              name="ongoing projects"
              navto="project"
            >
              <LuSearchCode color={iconColor} size={20} />
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

      {/* <NavBarItem navto="" isFullMenue={isFullMenue} name="logout">
        <CiLogout color={iconColor} size={20} />
      </NavBarItem> */}
      <div
        className={`${
          !isFullMenue && "justify-center"
        } text-text hover:text-stone-50 transition-all duration-400 cursor-pointer flex felx-col items-center px-5 py-4 hover:bg-accent/60 rounded-lg`}
        onClick={() => {
          localStorage.clear("token");
          navigate("/login");
        }}
      >
        <CiLogout color={iconColor} size={20} />
        {isFullMenue && (
          <span className="hidden sm:block ml-10 text-md uppercase tracking-widest">
            Logout
          </span>
        )}
      </div>
    </div>
  );
}
