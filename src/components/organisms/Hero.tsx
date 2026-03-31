import Button from "../atoms/Button";
import Profile from "../../assets/raj.JPG";
import { ArrowDown } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../atoms/Icons";

interface HeroProps {
  name: string;
}

const Hero = ({ name }: HeroProps) => {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center pt-16 bg-white"
    >
      <div className="container mx-auto max-w-6xl px-6 w-full">
        <div className="grid grid-cols-12 gap-6 items-center">
          {/* Left: Content */}
          <div className="col-span-12 lg:col-span-6">
            <p className="font-sfmono text-primary text-xs tracking-[0.25em] uppercase mb-5">
              Hello, World! 👋
            </p>

            <h1 className="text-7xl xl:text-8xl font-bold tracking-tight leading-none mb-3">
              I'm{" "}
              <span className="text-primary relative">
                {name}
                <span className="absolute -bottom-1 left-0 w-full h-1 bg-red-100 rounded-full" />
              </span>
            </h1>

            <h2 className="text-2xl md:text-3xl font-light text-gray-400 mb-6 font-sfmono">
              Backend Developer
            </h2>

            <p className="text-gray-500 font-light text-lg leading-relaxed mb-8 max-w-md">
              I craft robust, scalable APIs and web applications with{" "}
              <span className="text-primary font-medium">Laravel</span>. Turning
              complex backend problems into clean, elegant solutions.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mb-10">
              <Button text="Download CV" />
              <Button text="Contact Me" variant="outline" href="#contact" />
            </div>

            {/* Social links */}
            <div className="flex items-center gap-4">
              <span className="font-sfmono text-xs text-gray-300 tracking-widest">
                FIND ME ON
              </span>
              <div className="w-8 h-px bg-gray-200" />
              <div className="flex items-center gap-5">
                <a
                  href="https://github.com/RajMaharjan8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-500 hover:text-primary transition-colors"
                >
                  <GithubIcon size={18} />
                  <span className="text-sm font-sfmono">GitHub</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/raj-maharjan-a408b7229/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-500 hover:text-primary transition-colors"
                >
                  <LinkedinIcon size={18} />
                  <span className="text-sm font-sfmono">LinkedIn</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right: Photo */}
          <div className="col-span-12 lg:col-span-6 flex justify-center lg:justify-end">
            <div className="relative">
              {/* Decorative offset border */}
              <div className="absolute -top-4 -right-4 w-full h-full border-2 border-red-200 rounded-bl-[80px] rounded-tr-[80px]" />

              {/* Photo container */}
              <div className="bg-primary rounded-bl-[80px] rounded-tr-[80px] h-120 w-95 overflow-hidden">
                <img
                  src={Profile}
                  alt={name}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Floating role badge */}
              <div className="absolute -bottom-5 -left-8 bg-white border border-gray-100 shadow-xl rounded-2xl px-5 py-4 font-sfmono">
                <p className="text-xs text-gray-400 mb-1">Current Role</p>
                <p className="text-sm font-bold text-gray-800">
                  Laravel Dev 
                </p>
              </div>

              {/* Experience badge */}
              <div className="absolute -top-3 -left-6 bg-primary text-white rounded-2xl px-4 py-3 font-sfmono text-center shadow-lg">
                <p className="text-2xl font-bold leading-none">2+</p>
                <p className="text-xs mt-1 opacity-80">Years Exp</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="flex justify-center mt-20">
          <a
            href="#about"
            className="flex flex-col items-center gap-2 text-gray-300 hover:text-primary transition-colors"
          >
            <span className="font-sfmono text-xs tracking-[0.2em]">SCROLL</span>
            <ArrowDown size={14} className="animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
