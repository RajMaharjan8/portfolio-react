import Tag from "../atoms/Tag";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  // github?: string;
  live?: string;
  featured?: boolean;
}

const ProjectCard = ({
  title,
  description,
  tags,
  // github,
  featured,
}: ProjectCardProps) => {
  if (featured) {
    return (
      <div className="col-span-12 p-8 bg-white rounded-3xl border border-gray-100 hover:border-red-100 hover:shadow-xl transition-all duration-300 group">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Terminal preview */}
          <div className="lg:w-1/2 bg-[#1E1E1E] rounded-2xl p-5 font-sfmono text-sm">
            <div className="flex gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-[#F65C55]"></div>
              <div className="w-3 h-3 rounded-full bg-[#F4B52E]"></div>
              <div className="w-3 h-3 rounded-full bg-[#29C740]"></div>
            </div>
            <p className="text-gray-400">$ php artisan serve --port=8000</p>
            <p className="text-green-400 mt-1">
              INFO&nbsp; Server running on [http://localhost:8000]
            </p>
            <p className="text-gray-400 mt-3">$ curl /api/v1/course/8</p>
            <div className="mt-1 text-gray-300">
              <p>{"{"}</p>
              <p className="ml-4">
                "status":{" "}
                <span className="text-green-400">200</span>,
              </p>
              <p className="ml-4">
                "data": <span className="text-yellow-300">[...]</span>,
              </p>
              <p className="ml-4">
                "message": <span className="text-blue-300">"Successfully Fetched Data"</span>
              </p>
              <p>{"}"}</p>
            </div>
          </div>

          {/* Content */}
          <div className="lg:w-1/2 flex flex-col justify-between">
            <div>
              <p className="font-sfmono text-primary text-xs tracking-[0.2em] uppercase mb-2">
                Featured Project
              </p>
              <h3 className="text-3xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors duration-300">
                {title}
              </h3>
              <p className="text-gray-500 font-light leading-relaxed mb-6">
                {description}
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {tags.map((tag) => (
                  <Tag key={tag} text={tag} variant="primary" />
                ))}
              </div>
            </div>
            {/* <div className="flex gap-6">
              {github && (
                <a
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-sfmono text-gray-500 hover:text-primary transition-colors"
                >
                  <GithubIcon size={16} />
                  View Code
                </a>
              )}
              {live && (
                <a
                  href={live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-sfmono text-gray-500 hover:text-primary transition-colors"
                >
                  <ExternalLink size={16} />
                  Live Demo
                </a>
              )}
            </div> */}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="col-span-12 md:col-span-6 p-6 bg-white rounded-2xl border border-gray-100 hover:border-red-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group flex flex-col">
      {/* Top row */}
      <div className="flex justify-between items-start mb-5">
        <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center border border-red-100">
          <span className="text-primary font-sfmono font-bold">
            {title.charAt(0)}
          </span>
        </div>
        <div className="flex gap-3">
          {/* {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-primary transition-colors"
            >
              <GithubIcon size={18} />
            </a>
          )}
          {live && (
            <a
              href={live}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-primary transition-colors"
            >
              <ExternalLink size={18} />
            </a>
          )} */}
        </div>
      </div>

      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors duration-300">
        {title}
      </h3>
      <p className="text-gray-500 font-light text-sm leading-relaxed flex-1 mb-5">
        {description}
      </p>

      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Tag key={tag} text={tag} />
        ))}
      </div>
    </div>
  );
};

export default ProjectCard;
