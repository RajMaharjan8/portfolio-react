import SectionTitle from "../atoms/SectionTitle";
import ProjectCard from "../molecules/ProjectCard";
import Reveal from "../atoms/Reveal";

const projects = [
  {
    title: "RJCMS",
    label: "Open Source · Packagist",
    description:
      "A lightweight Laravel CMS package for rapidly building admin dashboards with minimal frontend code. Published on Packagist and installable via Composer",
    tags: ["Laravel", "PHP", "Composer", "MIT"],
    install: "composer require rjcodes/rjcms",
    packagist: "https://packagist.org/packages/rjcodes/rjcms",
    repo: "https://github.com/RajMaharjan8/rjcms",
    installs: "11+",
    featured: true,
  },
  {
    title: "Learning Management System",
    description:
      "Worked on creating RESTful APIs for an LMS system using Laravel. Explored different packages like Spatie Media Library, Roles and Permissions, and many others. Worked on projects Udaan, SmartAcademy, and Gurumantra",
    tags: ["Laravel", "MySQL", "API"],
    github: null,
    live: "#",
    featured: true,
  },
  {
    title: "Travel Site",
    description:
      "Worked on many travel booking platform using Laravel, allowing users to browse and book travel packages. Designed a responsive frontend using Bootstrap and a robust backend with Laravel and MySQL to manage bookings and availability.",
    tags: ["Laravel", "Bootstrap", "MySQL"],
    github: null,
  },
  {
    title: "E-Commerce Site",
    description:
      "Developed a full-featured e-commerce platform with product listings, shopping cart, order management, and payment gateway integration.",
    tags: ["Laravel", "MySQL", "Wordpress", "ACF"],
    github: null,
    live: "#",
  },
];

const Projects = () => {
  return (
    <section id="projects" className="py-16 sm:py-24 bg-gray-50">
      <div className="container mx-auto max-w-6xl px-6">
        <SectionTitle overline="03. My Work" title="Things I've built" />
        <div className="grid grid-cols-12 gap-y-6 md:gap-6">
          {projects.map((project, index) => (
            <Reveal
              key={index}
              delay={index * 100}
              className={project.featured ? "col-span-12" : "col-span-12 md:col-span-6"}
            >
              <ProjectCard {...project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
