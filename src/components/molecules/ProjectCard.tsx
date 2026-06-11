import Tag from "../atoms/Tag";
import { GithubIcon } from "../atoms/Icons";
import { Package, ExternalLink } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  // github?: string;
  live?: string;
  featured?: boolean;
  /** Composer command — when set, the featured card shows a package install terminal */
  install?: string;
  /** Packagist package page URL */
  packagist?: string;
  /** Source repository URL */
  repo?: string;
  /** Total Packagist installs, shown as a stat */
  installs?: string;
  /** Overline label above the title (defaults to "Featured Project") */
  label?: string;
}

const ProjectCard = ({
  title,
  description,
  tags,
  // github,
  featured,
  install,
  packagist,
  repo,
  installs,
  label,
}: ProjectCardProps) => {
  if (featured) {
    return (
      <div className="h-full p-6 sm:p-8 bg-white rounded-3xl border border-gray-100 hover:border-red-100 hover:shadow-xl transition-all duration-300 group">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Terminal preview */}
          <div className="lg:w-1/2 bg-[#1E1E1E] rounded-2xl p-5 font-sfmono text-sm">
            <div className="flex gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-[#F65C55]"></div>
              <div className="w-3 h-3 rounded-full bg-[#F4B52E]"></div>
              <div className="w-3 h-3 rounded-full bg-[#29C740]"></div>
            </div>

            {install ? (
              <>
                <p className="text-gray-400 break-all">$ {install}</p>
                <p className="text-blue-300 mt-2">
                  ./composer.json has been updated
                </p>
                <p className="text-gray-400 mt-1">
                  Running composer update {title.toLowerCase()}
                </p>
                <p className="text-green-400 mt-1">
                  - Installing{" "}
                  <span className="text-yellow-300">rjcodes/rjcms</span> (latest)
                </p>
                <p className="text-gray-400 mt-3">$ php artisan rjcms:install</p>
                <div className="mt-1 text-green-400">
                  <p>  ✓ Published config & assets</p>
                  <p>  ✓ Admin dashboard ready</p>
                  <p>  ✓ Roles & permissions seeded</p>
                </div>
                <p className="text-gray-500 mt-3">
                  // Available on Packagist
                </p>
              </>
            ) : (
              <>
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
                    "message":{" "}
                    <span className="text-blue-300">
                      "Successfully Fetched Data"
                    </span>
                  </p>
                  <p>{"}"}</p>
                </div>
              </>
            )}
          </div>

          {/* Content */}
          <div className="lg:w-1/2 flex flex-col justify-between">
            <div>
              <p className="flex items-center gap-2 font-sfmono text-primary text-xs tracking-[0.2em] uppercase mb-2">
                {install && <Package size={14} />}
                {label ?? "Featured Project"}
              </p>
              <h3 className="text-3xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors duration-300">
                {title}
              </h3>
              <p className="text-gray-500 font-light leading-relaxed mb-6">
                {description}
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {tags.map((tag) => (
                  <Tag key={tag} text={tag} variant="primary" />
                ))}
              </div>

              {installs && (
                <div className="flex items-center gap-2 mb-6 font-sfmono text-xs text-gray-400">
                  <span className="inline-block w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-gray-600 font-semibold">{installs}</span>{" "}
                  installs on Packagist · MIT Licensed
                </div>
              )}
            </div>

            {(packagist || repo) && (
              <div className="flex flex-wrap gap-3">
                {packagist && (
                  <a
                    href={packagist}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-primary text-white text-sm font-sfmono px-5 py-2.5 rounded-full hover:bg-black transition-colors duration-300"
                  >
                    <ExternalLink size={15} />
                    View on Packagist
                  </a>
                )}
                {repo && (
                  <a
                    href={repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-gray-300 text-gray-700 text-sm font-sfmono px-5 py-2.5 rounded-full hover:border-primary hover:text-primary transition-colors duration-300"
                  >
                    <GithubIcon size={15} />
                    Source
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full p-6 bg-white rounded-2xl border border-gray-100 hover:border-red-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group flex flex-col">
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
