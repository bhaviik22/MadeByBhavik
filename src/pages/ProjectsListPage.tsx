import { useEffect, useState } from 'react'
import type { Project } from '../types/project'
import { getProjects } from '../services/projectService'
import { navigate, navigateToHomeSection } from '../utils/routes'

const ProjectsListPage = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [activeCategory, setActiveCategory] = useState('all')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const result = await getProjects()
        setProjects(result?.data ?? [])
      } catch (error) {
        console.error('Failed to fetch projects:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProjects()
  }, [])

  const categories = [...new Set(projects.map((project) => project.category).filter(Boolean))]
  const visibleProjects = activeCategory === 'all'
    ? projects
    : projects.filter((project) => project.category === activeCategory)

  return (
    <main>
      <section className="pt-36 pb-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-accent/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <p className="reveal text-xs font-medium text-accent tracking-widest uppercase mb-3">Portfolio</p>
          <h1 className="reveal font-display font-bold text-5xl md:text-6xl text-zinc-900 dark:text-white leading-tight mb-4">All Projects</h1>
          <p className="reveal text-lg text-zinc-500 dark:text-zinc-400 max-w-xl leading-relaxed mb-8">A complete look at my work across UI/UX design, frontend development and landing pages.</p>
          <div className="reveal flex flex-wrap gap-2" aria-label="Filter projects by category">
            {['all', ...categories].map((category) => {
              const isActive = activeCategory === category

              return (
                <button
                  key={category}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActiveCategory(category)}
                  className={`border px-4 py-2 rounded-full text-sm transition-colors ${
                    isActive
                      ? 'bg-accent border-accent text-white'
                      : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700 hover:border-accent'
                  }`}
                >
                  {category === 'all' ? 'All' : category}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-6xl mx-auto px-6">
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" aria-busy="true" role="status">
              {Array.from({ length: 6 }, (_, index) => (
                <article
                  key={index}
                  aria-hidden="true"
                  className="animate-pulse h-full rounded-2xl overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800"
                >
                  <div className="w-full h-52 bg-zinc-200 dark:bg-zinc-800" />
                  <div className="p-6">
                    <div className="flex flex-wrap gap-2 mb-4">
                      <div className="h-6 w-20 rounded-full bg-zinc-200 dark:bg-zinc-800" />
                      <div className="h-6 w-16 rounded-full bg-zinc-100 dark:bg-zinc-800" />
                      <div className="h-6 w-24 rounded-full bg-zinc-100 dark:bg-zinc-800" />
                    </div>
                    <div className="mb-3 h-6 w-2/3 rounded bg-zinc-200 dark:bg-zinc-800" />
                    <div className="mb-2 h-4 w-full rounded bg-zinc-100 dark:bg-zinc-800" />
                    <div className="mb-5 h-4 w-4/5 rounded bg-zinc-100 dark:bg-zinc-800" />
                    <div className="flex items-center justify-between">
                      <div className="h-4 w-12 rounded bg-zinc-100 dark:bg-zinc-800" />
                      <div className="h-9 w-28 rounded-full bg-zinc-200 dark:bg-zinc-800" />
                    </div>
                  </div>
                </article>
              ))}
              <span className="sr-only">Loading projects...</span>
            </div>
          ) : visibleProjects.length === 0 ? (
            <p className="text-center py-20 text-zinc-400 text-sm">
              {projects.length === 0 ? 'No projects available yet.' : 'No projects in this category yet.'}
            </p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {visibleProjects.map((project) => (
                <article
                  key={project.id}
                  className="group h-full rounded-2xl overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-accent transition-colors"
                >
                  <div className="photo-frame w-full h-52 bg-zinc-100 dark:bg-zinc-800">
                    {project.image_url && (
                      <img
                        src={project.image_url}
                        alt={project.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.category && (
                        <span className="text-xs bg-teal-50 dark:bg-zinc-800 text-accent border border-teal-200 dark:border-zinc-700 px-3 py-1 rounded-full">
                          {project.category}
                        </span>
                      )}
                      {project.technologies.map((technology) => (
                        <span
                          key={technology}
                          className="text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700 px-3 py-1 rounded-full"
                        >
                          {technology}
                        </span>
                      ))}
                    </div>
                    <h2 className="font-display font-bold text-lg text-zinc-900 dark:text-white mb-2 group-hover:text-accent transition-colors">
                      {project.title}
                    </h2>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-4">
                      {project.summary || project.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-zinc-400">{project.year}</span>
                      <button
                        type="button"
                        onClick={() => navigate(`/projects/${encodeURIComponent(project.slug)}`)}
                        className="rounded-full bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-light cursor-pointer"
                      >
                        View project
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-zinc-900 dark:bg-zinc-800 rounded-3xl p-10 md:p-14 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-accent/10 rounded-full blur-2xl pointer-events-none"></div>
            <div className="relative z-10">
              <p className="text-xs font-medium text-accent tracking-widest uppercase mb-4">Ready to start?</p>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-4">Want your project here?</h2>
              <p className="text-zinc-400 max-w-md mx-auto mb-8">I'm available for new projects. Tell me about what you're building and let's see if we're a good fit.</p>
              <a
                href="/#contact"
                onClick={(event) => {
                  event.preventDefault()
                  navigateToHomeSection('contact')
                }}
                className="inline-flex items-center gap-2 btn-primary bg-accent text-white font-medium px-8 py-3.5 rounded-full hover:bg-accent-light transition-colors"
              >
                Start a project &rarr;
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default ProjectsListPage
