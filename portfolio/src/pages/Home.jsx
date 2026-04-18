import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Projects from "../components/Projects";
import Skills from "../components/Skills";
import Contact from "../components/Contact";
import Resume from "../components/Resume";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Resume />
      <Contact />

      {/* FLOATING BUTTONS */}
      <div className="fixed bottom-20 right-6 flex flex-col gap-3 z-50">

        {/* Terminal Button */}
        <div
          onClick={() =>
            window.dispatchEvent(
              new KeyboardEvent("keydown", {
                ctrlKey: true,
                key: "k",
              })
            )
          }
          className="px-5 py-3 bg-[#FF6B00] text-white rounded-full shadow-lg cursor-pointer hover:scale-105 transition"
        >
          Dev ⚡
        </div>

        {/* Gamified Mode Button */}
        <div
          onClick={() =>
            window.dispatchEvent(
              new KeyboardEvent("keydown", {
                ctrlKey: true,
                key: "g",
              })
            )
          }
          className="px-5 py-3 bg-white border border-orange-200 text-[#FF6B00] rounded-full shadow-lg cursor-pointer hover:scale-105 transition"
        >
          Explore 🎮
        </div>
      </div>
    </>
  );
}