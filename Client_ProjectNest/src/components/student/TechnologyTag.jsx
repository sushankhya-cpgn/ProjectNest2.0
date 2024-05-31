import getTechIcon from "../../utils/getTechIcon";

export default function TechnologyTag({ tech }) {
  return (
    <span className="rounded-2xl bg-slate-800 px-3 py-1 flex justify-center items-center gap-2">
      {getTechIcon(tech)}
      {tech}
    </span>
  );
}
