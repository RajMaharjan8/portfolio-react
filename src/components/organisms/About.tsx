import Terminal from "../atoms/Terminal";
import SectionTitle from "../atoms/SectionTitle";
import { Code2, Database, Layers } from "lucide-react";

const services = [
  {
    icon: <Code2 size={22} className="text-primary" />,
    title: "API Development",
    description:
      "RESTful APIs with proper auth, rate limiting, versioning, and documentation using Laravel Sanctum & Passport.",
  },
  {
    icon: <Database size={22} className="text-primary" />,
    title: "Database Design",
    description:
      "Optimized schemas, complex Eloquent queries, and efficient migrations for MySQL and PostgreSQL.",
  },
  {
    icon: <Layers size={22} className="text-primary" />,
    title: "System Architecture",
    description:
      "Scalable apps with queues, caching, events, jobs, and clean MVC patterns that won't haunt you later.",
  },
];

const stats = [
  { num: "2+", label: "Yrs Experience" },
  { num: "20+", label: "Projects Built" },
  { num: "∞", label: "Coffee Drunk" },
];

const About = () => {
  return (
    <section id="about" className="py-24 bg-gray-50">
      <div className="container mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-12 gap-12 items-start">
          {/* Left: Text */}
          <div className="col-span-12 lg:col-span-5">
            <SectionTitle overline="01. About Me" title="Who am I?" />

            <div className="space-y-4 text-gray-500 font-light text-lg leading-relaxed mb-8">
              <p>
                I'm a backend developer based in{" "}
                <span className="text-primary font-medium">
                  Kathmandu, Nepal
                </span>
                , currently working at{" "}
                <span className="text-primary font-medium">
                  Makura Creations
                </span>
                .
              </p>
              <p>
                My main focus is building clean, well-tested Laravel
                applications. I love designing intuitive APIs that developers
                enjoy consuming and databases that won't give your DBA
                nightmares.
              </p>
              <p>
                When I'm not writing PHP, you'll find me exploring new tools,
                breaking things in Docker, or questioning why I chose a career
                where bugs have bugs.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="text-center p-4 bg-white rounded-2xl border border-gray-100 hover:border-red-100 transition-colors"
                >
                  <p className="text-3xl font-bold text-primary">{stat.num}</p>
                  <p className="text-xs text-gray-400 font-sfmono mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Terminal + service cards */}
          <div className="col-span-12 lg:col-span-7 space-y-5">
            <Terminal
              dir="raj@portfolio ~/about"
              command="cat me.txt"
              list={[
                "> Name:      Raj",
                "> Location:  Kathmandu, Nepal",
                "> Role:      Backend Developer @ Makura Creations",
                "> Degree:    Bachelors in IT — IIMS College",
                "> Passion:   Clean code & scalable systems",
                "> Status:    Open to new opportunities ✓",
              ]}
            />

            <div className="space-y-3">
              {services.map((service) => (
                <div
                  key={service.title}
                  className="flex gap-4 p-5 bg-white rounded-2xl border border-gray-100 hover:border-red-100 hover:shadow-md transition-all duration-300 group"
                >
                  <div className="flex-shrink-0 w-11 h-11 bg-red-50 rounded-xl flex items-center justify-center group-hover:bg-red-100 transition-colors">
                    {service.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">
                      {service.title}
                    </h4>
                    <p className="text-gray-500 text-sm font-light leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
