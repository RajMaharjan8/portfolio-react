import Terminal from "../atoms/Terminal";
import Tag from "../atoms/Tag";
import SectionTitle from "../atoms/SectionTitle";
import Reveal from "../atoms/Reveal";

const stackCategories = [
  {
    label: "Backend",
    items: ["PHP", "Laravel", "REST API", "Wordpress"],
  },
  {
    label: "Database",
    items: ["MySQL", "PostgreSQL"],
  },
  {
    label: "Frontend",
    items: ["React", "Blade", "Tailwind CSS", "Bootstrap"],
  },
  {
    label: "Tools & DevOps",
    items: ["Git", "Linux", "Postman"],
  },
];

const MyStack = () => {
  return (
    <section id="stack" className="py-16 sm:py-24 bg-white">
      <div className="container mx-auto max-w-6xl px-6">
        <SectionTitle overline="02. Tech Stack" title="What I work with" />

        <div className="grid grid-cols-12 gap-10 items-start">
          {/* Terminal */}
          <Reveal className="col-span-12 lg:col-span-5">
            <Terminal
              dir="raj@portfolio ~/stack"
              command="php artisan list:skills"
              list={[
                "INFO  Running skill discovery...",
                "",
                "BACKEND",
                "  ✓ Laravel (Primary Framework)",
                "  ✓ RESTful API",
                "  ✓ Auth: Sanctum & Passport",
                "",
                "DATABASE",
                "  ✓ MySQL / PostgreSQL",
                "",
                "DEVTOOLS",
                "  ✓ Git, Linux",
              ]}
            />
          </Reveal>

          {/* Skill tags by category */}
          <Reveal delay={120} className="col-span-12 lg:col-span-7 space-y-7">
            {stackCategories.map((cat) => (
              <div key={cat.label}>
                <p className="font-sfmono text-xs text-gray-400 tracking-[0.2em] uppercase mb-3">
                  {cat.label}
                </p>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((item) => (
                    <Tag key={item} text={item} variant="primary" />
                  ))}
                </div>
              </div>
            ))}

            {/* Fun note */}
            <div className="mt-4 p-4 bg-gray-50 rounded-2xl border border-gray-100 font-sfmono text-sm text-gray-400">
              <span className="text-primary">//</span> Always learning. Currently
              exploring:{" "}
              <span className="text-gray-600 font-medium">
                 Next JS
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default MyStack;
