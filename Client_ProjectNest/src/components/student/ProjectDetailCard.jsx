import { Link } from "react-router-dom";
import PersonItem from "./PersonItem";
import getTechIcon from "../../utils/getTechIcon";
import trimText from "../../utils/trimText";

export default function ProjectDetailCard({
  title,
  tags,
  description,
  id,
  user,
}) {
  console.log(title, tags, description, id, user);
  // const trimmedDescription = trimText(description, 90);
  const trimmedDescription = description;
  return (
    <Link to={id}>
      <div className="h-48 transition-all duration-300 bg-background p-4 rounded-md cursor-pointer flex flex-col justify-between hover:drop-shadow-[0_35px_35px_rgba(1,1,1,0.55)]">
        <div className="flex flex-col gap-3">
          <div className="text-lg  text-zinc-300">{title}</div>
          <div className=" text-slate-400 text-sm">{trimmedDescription}</div>
        </div>
        <div className="flex justify-between">
          <div className="text-sm flex flex-row justify-between items-center gap-4">
            <PersonItem name={user.name} image={user.image} />
          </div>
          <div className="hidden  text-sm md:flex flex-row justify-between items-center gap-2">
            {tags.map((tag, i) => (
              <div key={i}>{getTechIcon(tag, 24)}</div>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
