import Terminal from "../atoms/Terminal";
import SectionTitle from "../atoms/SectionTitle";
import Reveal from "../atoms/Reveal";
import { Mail, MapPin } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../atoms/Icons";

const links = [
  {
    icon: <Mail size={18} />,
    label: "Email",
    value: "2rajm48952@gmail.com",
    href: "mailto:2rajm48952@gmail.com",
  },
  {
    icon: <GithubIcon size={18} />,
    label: "GitHub",
    value: "github.com/RajMaharjan8",
    href: "https://github.com/RajMaharjan8",
  },
  {
    icon: <LinkedinIcon size={18} />,
    label: "LinkedIn",
    value: "linkedin.com/in/raj",
    href: "https://www.linkedin.com/in/raj-maharjan-a408b7229/",
  },
  {
    icon: <MapPin size={18} />,
    label: "Location",
    value: "Kathmandu, Nepal",
    href: "#",
  },
];

const Contact = () => {
  return (
    <section id="contact" className="py-16 sm:py-24 bg-[#0f0f0f]">
      <div className="container mx-auto max-w-6xl px-6">
        <SectionTitle
          overline="05. Contact"
          title="Let's work together"
          light
        />

        <div className="grid grid-cols-12 gap-10 items-start">
          {/* Left: Text + links */}
          <Reveal className="col-span-12 lg:col-span-5">
            <p className="text-gray-400 font-light text-lg leading-relaxed mb-10">
              Have a project in mind, a backend you need built, or just want to
              talk about why PHP is actually great? My inbox is always open.
            </p>

            <div className="space-y-4">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    link.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="flex items-center gap-4 group"
                >
                  <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-gray-400 group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all duration-300">
                    {link.icon}
                  </div>
                  <div>
                    <p className="text-xs font-sfmono text-gray-600 uppercase tracking-widest">
                      {link.label}
                    </p>
                    <p className="text-gray-300 text-sm group-hover:text-primary transition-colors">
                      {link.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </Reveal>

          {/* Right: Terminal */}
          <Reveal delay={120} className="col-span-12 lg:col-span-7">
            <Terminal
              dir="raj@portfolio ~/contact"
              command="php artisan make:connection"
              list={[
                "INFO  Initializing new connection...",
                "",
                "> What do you need?",
                ">   [1] Build a REST API",
                ">   [2] Laravel application",
                ">   [3] Database design",
                ">   [4] Code review / consultation",
                ">   [5] Something else entirely",
                "",
                "// Whatever it is, let's talk.",
                "// Response time: usually within 24h",
                "",
                "  ✓ Ready to collaborate",
                "  ✓ Available for freelance",
                "  ✓ Open to full-time roles",
              ]}
            />

            {/* CTA */}
            <div className="mt-6 text-center">
              <a
                href="mailto:2rajm48952@gmail.com"
                className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-full font-sfmono text-sm hover:bg-white hover:text-primary transition-all duration-300"
              >
                <Mail size={16} />
                Say Hello
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;
