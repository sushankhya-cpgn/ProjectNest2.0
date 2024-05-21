import { FaReact } from "react-icons/fa";
import { FaNodeJs } from "react-icons/fa";
import { SiTensorflow } from "react-icons/si";
import { FaCss3 } from "react-icons/fa";
import { FaJava } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io5";
import { SiTypescript } from "react-icons/si";
import { FaHtml5 } from "react-icons/fa";
import { GrTechnology } from "react-icons/gr";
import { FaRust } from "react-icons/fa";
import { FaPhp } from "react-icons/fa";
import { RiTailwindCssFill } from "react-icons/ri";
import { BiLogoCPlusPlus } from "react-icons/bi";
export default function getTechIcon(tech = "default", size = 20) {
  const cleanTech = tech.toLowerCase();
  console.log(cleanTech);
  switch (cleanTech) {
    case "react":
      return <FaReact size={size} />;
    case "html":
      return <FaHtml5 size={size} />;
    case "css":
      return <FaCss3 size={size} />;
    case "java":
      return <FaJava size={size} />;
    case "nodejs":
    case "node":
      return <FaNodeJs size={size} />;
    case "typescript":
    case "ts":
      return <SiTypescript size={size} />;
    case "js":
    case "javascript":
      return <IoLogoJavascript size={size} />;

    case "tensorflow":
      return <SiTensorflow size={size} />;

    case "rust":
      return <FaRust size={size} />;
    case "php":
      return <FaPhp size={size} />;

    case "tailwindcss":
    case "tailwind":
      return <RiTailwindCssFill size={size} />;

    case "cpp":
    case "c++":
      return <BiLogoCPlusPlus size={size} />;

    case "ml":
    case "ai":
    case "ml/ai":
    case "ai/ml":
      return <GrTechnology size={size} />;
    default:
      return <></>;
  }
}
