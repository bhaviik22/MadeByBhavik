import type { FC } from "react";
import type { Project } from "../types/project";
import { navigate } from "../utils/routes";
import { FaArrowRightLong } from "react-icons/fa6";

const WorkSection: FC<{ projects: Project[]; isLoading?: boolean }> = ({ projects, isLoading = false }) => {
    const featuredProjects = projects.slice(0, 3)

    return (
        <section id="work" className="py-24">
            <div className="max-w-6xl mx-auto px-6">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
                    <div>
                        <p className="reveal text-xs font-medium text-accent tracking-widest uppercase mb-3">Portfolio</p>
                        <h2 className="reveal d1 font-display font-bold text-4xl md:text-5xl text-zinc-900 dark:text-white">Selected work</h2>
                    </div>
                    <a
                        href="/projects"
                        onClick={(event) => {
                            event.preventDefault();
                            navigate("/projects");
                        }}
                        className="reveal d1 inline-flex items-center gap-2 whitespace-nowrap text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-accent transition-colors self-start sm:self-auto nl"
                    >
                        All projects <FaArrowRightLong />
                    </a>
                </div>

                <div className="grid md:grid-cols-2 gap-6" aria-busy={isLoading}>
                    {isLoading
                        ? Array.from({ length: 3 }, (_, index) => (
                            <article
                                key={index}
                                aria-hidden="true"
                                className={`animate-pulse overflow-hidden rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 ${
                                    index === 0 ? "md:row-span-2" : ""
                                }`}
                            >
                                <div className={`w-full bg-zinc-200 dark:bg-zinc-800 ${
                                    index === 0 ? "h-64 md:h-80" : "h-48"
                                }`} />
                                <div className={index === 0 ? "p-7" : "p-6"}>
                                    <div className="mb-4 flex gap-2">
                                        <div className="h-6 w-20 rounded-full bg-zinc-200 dark:bg-zinc-800" />
                                        <div className="h-6 w-16 rounded-full bg-zinc-200 dark:bg-zinc-800" />
                                    </div>
                                    <div className="mb-3 h-6 w-2/3 rounded bg-zinc-200 dark:bg-zinc-800" />
                                    <div className="mb-2 h-4 w-full rounded bg-zinc-200 dark:bg-zinc-800" />
                                    <div className="h-4 w-4/5 rounded bg-zinc-200 dark:bg-zinc-800" />
                                </div>
                            </article>
                        ))
                        : featuredProjects.map((project, index) => {
                        const isFeatured = index === 0

                        return (
                            <article
                                key={project.id}
                                className={`card-h reveal group rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 hover:border-accent ${
                                    isFeatured ? "md:row-span-2" : ""
                                }`}
                            >
                                <div className={`pf w-full ${isFeatured ? "h-64 md:h-80" : "h-48"}`}>
                                    {project.image_url && (
                                        <img
                                            src={project.image_url}
                                            alt={project.title}
                                            className="w-full h-full object-cover"
                                            loading="lazy"
                                        />
                                    )}
                                </div>
                                <div className={isFeatured ? "p-7" : "p-6"}>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        <span className="text-xs bg-teal-50 dark:bg-zinc-800 text-accent border border-teal-200 dark:border-zinc-700 px-3 py-1 rounded-full">
                                            {project.category}
                                        </span>
                                        {project.technologies.slice(0, isFeatured ? 3 : 2).map((technology) => (
                                            <span
                                                key={technology}
                                                className="text-xs bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 px-3 py-1 rounded-full"
                                            >
                                                {technology}
                                            </span>
                                        ))}
                                    </div>
                                    <h3 className={`font-display font-bold text-zinc-900 dark:text-white mb-2 ${
                                        isFeatured ? "text-2xl" : "text-xl"
                                    }`}>
                                        {project.title}
                                    </h3>
                                    <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                                        {project.summary}
                                    </p>
                                </div>
                            </article>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default WorkSection
