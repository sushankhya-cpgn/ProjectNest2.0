import { RxHamburgerMenu } from "react-icons/rx";
import { GrHomeRounded } from "react-icons/gr";
import { SiGooglesheets } from "react-icons/si";
import { MdGroups2 } from "react-icons/md";
import { IoDocumentTextSharp } from "react-icons/io5";
import { GoTasklist } from "react-icons/go";
import { useState } from "react";
import StdProjectNavItem from "./StdProjectNavItem";
import StdProjectLogo from "./StdProjectLogo";

const iconColor = "#dbdbdb";

export default function StdProjectNav({ projectDetails, isLoading }) {
  console.log(projectDetails);
  const [isFullMenue, setIsFullMenue] = useState(true);
  //   const { user } = useUser();
  //   if (!user) return <h1>Loading..</h1>;
  return (
    <div className=" bg-background overflow-y-scroll w-fit flex flex-col justify-between h-full px-2 py-8 rounded-lg flex-shrink-0">
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
            <StdProjectLogo
              projectDetails={projectDetails}
              isLoading={isLoading}
            />
          </div>
        )}
      </div>
      <div className="flex overflow-y-scroll flex-col gap-5 h-auto">
        <>
          <StdProjectNavItem
            navto="stdtasks"
            isFullMenue={isFullMenue}
            name="Task"
          >
            <GoTasklist color={iconColor} size={20} />
          </StdProjectNavItem>
          <StdProjectNavItem
            navto="stdmember"
            isFullMenue={isFullMenue}
            name="memebers"
          >
            <GrHomeRounded color={iconColor} size={20} />
          </StdProjectNavItem>
          <StdProjectNavItem
            navto="stdchats"
            isFullMenue={isFullMenue}
            name="Group Chat"
          >
            <MdGroups2 color={iconColor} size={20} />
          </StdProjectNavItem>
          <StdProjectNavItem
            navto="stdlogsheets"
            isFullMenue={isFullMenue}
            name="logsheet"
          >
            <SiGooglesheets color={iconColor} size={20} />
          </StdProjectNavItem>
          <StdProjectNavItem
            navto="stddocuments"
            isFullMenue={isFullMenue}
            name="Documents"
          >
            <IoDocumentTextSharp color={iconColor} size={20} />
          </StdProjectNavItem>
        </>
      </div>
    </div>
  );
}
