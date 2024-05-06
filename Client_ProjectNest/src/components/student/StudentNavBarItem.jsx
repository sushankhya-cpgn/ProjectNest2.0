/* eslint-disable react/prop-types */
function StudentNavBarItem({ children, isFullMenue, name }) {
  return (
    <div
      className={`${
        !isFullMenue && "justify-center"
      } h-14 transition-all duration-400 cursor-pointer flex felx-col items-center px-5 py-4 hover:bg-accent/50 rounded-xl`}
    >
      {children}
      {isFullMenue && (
        <span className=" text-light ml-10 text-md uppercase tracking-widest">
          {name}
        </span>
      )}
    </div>
  );
}

export default StudentNavBarItem;
