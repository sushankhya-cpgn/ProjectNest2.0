import { NavLink } from "react-router-dom";
/* eslint-disable react/prop-types */
function ProjectNavItem({ children, isFullMenue, name, navto }) {
  return (
    <NavLink to={navto}>
      <div
        className={`${
          !isFullMenue && "justify-center"
        } text-text hover:text-stone-50 transition-all duration-400 cursor-pointer flex felx-col items-center px-5 py-4 hover:bg-accent/60 rounded-lg`}
      >
        {children}
        {isFullMenue && (
          <span className="hidden sm:block ml-10 text-md uppercase tracking-widest">
            {name}
          </span>
        )}
      </div>
    </NavLink>
  );
}

export default ProjectNavItem;
