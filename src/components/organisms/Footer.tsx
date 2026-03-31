import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../atoms/Icons";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0a0a0a] border-t border-white/5 py-8">
      <div className="container mx-auto max-w-6xl px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-6">
          <span className="font-bold text-white text-lg">
            Raj<span className="text-primary">.</span>
          </span>
          <p className="font-sfmono text-gray-600 text-xs">
            © {year} — Built with{" "}
            <span className="text-primary">Love</span> by Raj.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/RajMaharjan8"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-primary transition-colors"
            aria-label="GitHub"
          >
            <GithubIcon size={16} />
          </a>
          <a
            href="https://www.linkedin.com/in/raj-maharjan-a408b7229/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-primary transition-colors"
            aria-label="LinkedIn"
          >
            <LinkedinIcon size={16} />
          </a>
          <a
            href="mailto:2rajm48952@gmail.com"
            className="text-gray-600 hover:text-primary transition-colors"
            aria-label="Email"
          >
            <Mail size={16} />
          </a>
          <span className="font-sfmono text-gray-700 text-xs ml-2">
            Crafted with ☕ in Kathmandu
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
