import Block from "../molecules/Block";
import SectionTitle from "../atoms/SectionTitle";
import { GraduationCap, Briefcase } from "lucide-react";

const education = [
  {
    title: "Higher Education",
    from: "DAV College",
    location: "Jawlakhel, Lalitpur",
  },
  {
    title: "Bachelors in Information Technology",
    from: "IIMS College",
    location: "Putalisadak, Kathmandu",
  },
];

const experience = [
  {
    title: "Laravel Developer [2024 – Present]",
    from: "at ",
    company: "Makura Creations",
    location: "Pulchowk, Lalitpur",
  },
];

const Experience = () => {
  return (
    <section id="experience" className="py-24 bg-white">
      <div className="container mx-auto max-w-6xl px-6">
        <SectionTitle overline="04. Background" title="Education & Experience" />

        <div className="grid grid-cols-12 gap-10">
          {/* Education */}
          <div className="col-span-12 md:col-span-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-9 h-9 bg-red-50 rounded-xl flex items-center justify-center">
                <GraduationCap size={18} className="text-primary" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Education</h3>
            </div>

            {education.map((item, index) => (
              <Block
                key={index}
                title={item.title}
                from={item.from}
                location={item.location}
                isLast={index === education.length - 1}
              />
            ))}
          </div>

          {/* Experience */}
          <div className="col-span-12 md:col-span-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-9 h-9 bg-red-50 rounded-xl flex items-center justify-center">
                <Briefcase size={18} className="text-primary" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Experience</h3>
            </div>

            {experience.map((item, index) => (
              <Block
                key={index}
                title={item.title}
                from={item.from}
                company={item.company}
                location={item.location}
                isLast={index === experience.length - 1}
              />
            ))}

            {/* Open to work card */}
            <div className="mt-2 ml-8 p-5 bg-red-50 rounded-2xl border border-red-100">
              <p className="font-sfmono text-xs text-primary tracking-widest uppercase mb-1">
                Status
              </p>
              <p className="font-bold text-gray-900">Open to Opportunities</p>
              <p className="text-sm text-gray-500 font-light mt-1">
                Available for full-time roles & freelance projects.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
