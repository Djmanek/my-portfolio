import {
  FaReact,
  FaNodeJs,
  FaHtml5,
  FaCss3Alt,
  FaGithub,
  FaPython,
  FaJava,
} from "react-icons/fa";

import {
  SiJavascript,
  SiPostgresql,
  SiMongodb,
  SiExpress,
} from "react-icons/si";

// ✅ STORE COMPONENTS (NOT JSX)
export const skillIcons = {
  react: FaReact,
  "node.js": FaNodeJs,
  nodejs: FaNodeJs, // 🔥 extra mapping
  javascript: SiJavascript,
  html: FaHtml5,
  css: FaCss3Alt,
  mongodb: SiMongodb,
  postgresql: SiPostgresql,
  express: SiExpress,
  python: FaPython,
  java: FaJava,
  github: FaGithub,
};