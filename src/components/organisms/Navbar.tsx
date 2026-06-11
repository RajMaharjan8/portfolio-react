import { useState, useEffect } from "react";
import { GithubIcon, LinkedinIcon } from "../atoms/Icons";

const navLinks = [
  { label: "About", href: "#about", is_target: false },
  { label: "Stack", href: "#stack", is_target: false },
  { label: "Projects", href: "#projects", is_target: false },
  { label: "Experience", href: "#experience", is_target: false },
  { label: "Contact", href: "#contact", is_target: false },
  { label: "Blogs", href: "https://rjblogs.vercel.app/", is_target: true },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks
      // Only in-page anchors map to sections; skip external (is_target) links
      .filter((link) => !link.is_target)
      .map((link) => document.querySelector(link.href))
      .filter((el): el is Element => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto max-w-6xl px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="font-bold text-2xl tracking-tight">
            Raj<span className="text-primary">.</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target={link.is_target ? "_blank" : undefined}
                rel={link.is_target ? "noopener noreferrer" : undefined}
                className={`relative text-sm font-sfmono transition-colors duration-200 after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 hover:text-primary ${
                  activeId === link.href
                    ? "text-primary after:w-full"
                    : "text-gray-600 after:w-0 hover:after:w-full"
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right: icons + CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="https://github.com/RajMaharjan8"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-primary transition-colors"
              aria-label="GitHub"
            >
              <GithubIcon size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/raj-maharjan-a408b7229/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <LinkedinIcon size={18} />
            </a>
            <a
              href="#contact"
              className="border border-primary text-primary text-sm px-5 py-2 rounded-full hover:bg-primary hover:text-white transition-all duration-300 font-sfmono"
            >
              Hire Me
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-0.5 bg-gray-800 transition-all duration-300 ${
                menuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-gray-800 transition-all duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-gray-800 transition-all duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 py-4 px-2 animate-fade-up">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target={link.is_target ? "_blank" : undefined}
                rel={link.is_target ? "noopener noreferrer" : undefined}
                onClick={() => setMenuOpen(false)}
                className={`block py-3 text-sm font-sfmono transition-colors border-l-2 pl-3 ${
                  activeId === link.href
                    ? "text-primary border-primary"
                    : "text-gray-600 border-transparent hover:text-primary"
                }`}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="mt-3 inline-block border border-primary text-primary text-sm px-5 py-2 rounded-full font-sfmono"
            >
              Hire Me
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
