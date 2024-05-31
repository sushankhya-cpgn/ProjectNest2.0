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
import { RiNextjsLine } from "react-icons/ri";
import { IoLogoVue } from "react-icons/io5";
import { SiBlockchaindotcom } from "react-icons/si";
import { SiDjango } from "react-icons/si";
import { FaPython } from "react-icons/fa";
import { SiNumpy } from "react-icons/si";
import { SiPandas } from "react-icons/si";
import { SiPytorch } from "react-icons/si";
import { SiRubyonrails } from "react-icons/si";
import { DiRuby } from "react-icons/di";
import { SiFlask } from "react-icons/si";
import { RiGatsbyFill } from "react-icons/ri";
import { FaSass } from "react-icons/fa";
import { BiLogoSpringBoot } from "react-icons/bi";
import { SiAngular } from "react-icons/si";
import { SiBulma } from "react-icons/si";
import { RiSvelteFill } from "react-icons/ri";
import { FaLaravel } from "react-icons/fa6";
import { TbBrandKotlin } from "react-icons/tb";
import { SiDart } from "react-icons/si";
import { SiNuxtdotjs } from "react-icons/si";
import { FaBootstrap } from "react-icons/fa6";
import { SiExpress } from "react-icons/si";
import { SiMongodb } from "react-icons/si";
import { SiPostgresql } from "react-icons/si";
import { DiMysql } from "react-icons/di";
import { SiMariadbfoundation } from "react-icons/si";

export default function getTechIcon(tech = "default", size = 20) {
  const lowerCaseTech = tech.toLowerCase();
  switch (lowerCaseTech) {
    case "react":
    case "reactjs":
    case "react.js":
      return <FaReact size={size} />;
    case "html":
      return <FaHtml5 size={size} />;
    case "css":
      return <FaCss3 size={size} />;
    case "java":
      return <FaJava size={size} />;
    case "nodejs":
    case "node.js":
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
    case "nextjs":
    case "next.js":
    case "next":
      return <RiNextjsLine size={size} />;
    case "blockchain":
      return <SiBlockchaindotcom size={size} />;
    case "vue":
    case "vuejs":
      return <IoLogoVue size={size} />;
    case "django":
      return <SiDjango size={size} />;
    case "python":
      return <FaPython size={size} />;
    case "numpy":
      return <SiNumpy size={size} />;
    case "pandas":
      return <SiPandas size={size} />;
    case "pytorch":
      return <SiPytorch size={size} />;
    case "flask":
      return <SiFlask size={size} />;
    case "ruby":
      return <DiRuby size={size} />;
    case "ruby on rails":
      return <SiRubyonrails size={size} />;
    case "gatsby":
      return <RiGatsbyFill size={size} />;
    case "bulma":
      return <SiBulma size={size} />;
    case "scss":
      return <FaSass size={size} />;
    case "spring boot":
      return <BiLogoSpringBoot size={size} />;
    case "angular":
      return <SiAngular size={size} />;
    case "svelte":
      return <RiSvelteFill size={size} />;
    case "laravel":
      return <FaLaravel size={size} />;
    case "kotlin":
      return <TbBrandKotlin size={size} />;
    case "dart":
      return <SiDart size={size} />;
    case "nuxt":
    case "nuxt.js":
    case "nuxtjs":
      return <SiNuxtdotjs size={size} />;
    case "bootstrap":
    case "bootstrapcss":
      return <FaBootstrap size={size} />;
    case "express":
    case "express.js":
    case "expressjs":
      return <SiExpress size={size} />;
    case "mongodb":
      return <SiMongodb size={size} />;
    case "postgresql":
    case "postgre":
      return <SiPostgresql size={size} />;
    case "mysql":
      return <DiMysql size={size} />;
    case "mariadb":
      return <SiMariadbfoundation />;

    default:
      return <></>;
  }
}
