import { Link, Outlet, useParams } from "react-router-dom";
import getTechIcon from "../../utils/getTechIcon";

function FindProject() {
  const { id } = useParams();

  return (
    <div className="h-4/5 flex flex-col gap-2 ">
      <h3 className="text-lg">Find projects that need your skills</h3>
      {id ? (
        <Outlet />
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 overflow-auto">
          <ProjectDetailCard />
          <ProjectDetailCard />
          <ProjectDetailCard />
          <ProjectDetailCard />
          <ProjectDetailCard />
          <ProjectDetailCard />
          <ProjectDetailCard />
          <ProjectDetailCard />
          <ProjectDetailCard />
          <ProjectDetailCard />
        </div>
      )}
    </div>
  );
}

function ProjectDetailCard() {
  const techTags = ["react", "node", "html"];
  const id = "1234";
  return (
    <Link to={id}>
      <div className="h-48 bg-background p-4 rounded-md cursor-pointer flex flex-col justify-between">
        <div className="flex flex-col gap-3">
          <div className="text-lg  text-zinc-300">
            Web3 GoFundMe - Transparent Donation Matching
          </div>
          <div className=" text-slate-400 text-sm">
            Organizing donation matching campaigns can be a complex and
          </div>
        </div>
        <div className="flex justify-between">
          <div className="text-sm flex flex-row justify-between items-center gap-4">
            <img
              className="rounded-full w-6 "
              alt="display"
              src="/default-avatar.png"
            ></img>
            <span>Mohit Shahi</span>
          </div>
          <div className="hidden  text-sm md:flex flex-row justify-between items-center gap-2">
            {techTags.map((tag) => getTechIcon(tag, 24))}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default FindProject;
