import { useEffect, useState } from 'react'
import '../ProjectDetailPage.css'
import { getProjects } from '../services/projectService'
import type { Project } from '../types/project'
import { navigate, navigateToHomeSection } from '../utils/routes'

const allowedDescriptionTags = new Set([
  'a', 'blockquote', 'br', 'caption', 'code', 'dd', 'div', 'dl', 'dt', 'em',
  'figcaption', 'figure', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'hr', 'i', 'img',
  'li', 'ol', 'p', 'pre', 's', 'small', 'span', 'strong', 'sub', 'sup', 'table',
  'tbody', 'td', 'th', 'thead', 'tr', 'u', 'ul',
])
const voidDescriptionTags = new Set(['br', 'hr', 'img'])
const blockedDescriptionTags = new Set(['iframe', 'object', 'script', 'style', 'svg'])

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function formatPlainTextDescription(text: string): string {
  const lines = text.replace(/\r\n?/g, '\n').split('\n')
  const blocks: string[] = []
  let paragraph: string[] = []
  let listItems: string[] = []

  const flushParagraph = () => {
    if (!paragraph.length) return
    blocks.push(`<p>${paragraph.map(escapeHtml).join('<br>')}</p>`)
    paragraph = []
  }

  const flushList = () => {
    if (!listItems.length) return
    blocks.push(`<ul>${listItems.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`)
    listItems = []
  }

  for (const rawLine of lines) {
    const line = rawLine.trim()
    if (!line) {
      flushParagraph()
      flushList()
      continue
    }

    const numberedHeading = line.match(/^\d+\.\s+.+$/)
    if (numberedHeading || line.endsWith(':')) {
      flushParagraph()
      flushList()
      const tag = line.endsWith(':') ? 'h2' : 'h3'
      blocks.push(`<${tag}>${escapeHtml(line)}</${tag}>`)
      continue
    }

    const bullet = line.match(/^[-*]\s+(.+)$/)
    if (bullet) {
      flushParagraph()
      listItems.push(bullet[1])
      continue
    }

    flushList()
    paragraph.push(line)
  }

  flushParagraph()
  flushList()
  return blocks.join('')
}

function isSafeUrl(value: string, allowMailto = false): boolean {
  try {
    const protocol = new URL(value, window.location.origin).protocol
    return protocol === 'http:' || protocol === 'https:' || (allowMailto && protocol === 'mailto:')
  } catch {
    return false
  }
}

function sanitizeDescription(html: string): string {
  const parsed = new DOMParser().parseFromString(html, 'text/html')

  const serialize = (node: Node): string => {
    if (node.nodeType === Node.TEXT_NODE) return escapeHtml(node.textContent ?? '')
    if (!(node instanceof Element)) return ''

    const tagName = node.tagName.toLowerCase()
    if (blockedDescriptionTags.has(tagName)) return ''

    const children = Array.from(node.childNodes, serialize).join('')
    if (!allowedDescriptionTags.has(tagName)) return children

    const attributes: string[] = []
    const className = node.getAttribute('class')
    const title = node.getAttribute('title')
    const href = node.getAttribute('href')
    const src = node.getAttribute('src')
    const alt = node.getAttribute('alt')

    if (className) attributes.push(`class="${escapeHtml(className)}"`)
    if (title) attributes.push(`title="${escapeHtml(title)}"`)
    if (tagName === 'a' && href && isSafeUrl(href, true)) {
      attributes.push(`href="${escapeHtml(href)}"`)
    }
    if (tagName === 'img' && src && isSafeUrl(src)) {
      attributes.push(`src="${escapeHtml(src)}"`)
    }
    if (tagName === 'img' && alt) attributes.push(`alt="${escapeHtml(alt)}"`)

    const openingTag = `<${tagName}${attributes.length ? ` ${attributes.join(' ')}` : ''}>`
    return voidDescriptionTags.has(tagName) ? openingTag : `${openingTag}${children}</${tagName}>`
  }

  return Array.from(parsed.body.childNodes, serialize).join('')
}

function renderDescription(description: string): string {
  const hasHtmlMarkup = /<\/?[a-z][^>]*>/i.test(description)
  const html = hasHtmlMarkup ? description : formatPlainTextDescription(description)
  return sanitizeDescription(html)
}

interface ProjectDetailPageProps {
  slug: string | null
}

const ProjectDetailPage = ({ slug }: ProjectDetailPageProps) => {
  const [project, setProject] = useState<Project | null>(null)
  const [isLoading, setIsLoading] = useState(Boolean(slug))
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    if (!slug) {
      setProject(null)
      setHasError(false)
      setIsLoading(false)
      return
    }

    let isCurrent = true
    const fetchProject = async () => {
      setIsLoading(true)
      setHasError(false)
      setProject(null)

      try {
        const result = await getProjects()
        const projects = result?.data ?? []
        const selectedProject = projects.find((item) => item.slug === slug) ?? null
        if (isCurrent) setProject(selectedProject)
      } catch (error) {
        console.error('Failed to fetch project:', error)
        if (isCurrent) setHasError(true)
      } finally {
        if (isCurrent) setIsLoading(false)
      }
    }

    void fetchProject()
    return () => {
      isCurrent = false
    }
  }, [slug])

  if (isLoading) {
    return <p className="py-20 text-center text-sm text-zinc-400" role="status">Loading project...</p>
  }

  if (hasError || !project) {
    return (
      <section className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h1 className="mb-4 font-display text-3xl font-bold text-zinc-900 dark:text-white">
          {hasError ? 'Unable to load project' : 'Project not found'}
        </h1>
        <button
          type="button"
          onClick={() => navigate('/projects')}
          className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-light"
        >
          Back to projects
        </button>
      </section>
    )
  }

  return (
    <article className="project-detail-page">
      <header className="pt-32 pb-10 max-w-4xl mx-auto px-6">

        <a
          href="/projects"
          onClick={(event) => {
            event.preventDefault()
            navigate('/projects')
          }}
          className="inline-flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 hover:text-accent transition-colors mb-8"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" /></svg>
          Back to projects
        </a>

        <div className="flex flex-wrap items-center gap-3 mb-6">
          {project.category && (
            <span className="text-xs bg-teal-50 dark:bg-zinc-800 text-accent border border-teal-200 dark:border-zinc-700 px-2.5 py-1 rounded-full">
              {project.category}
            </span>
          )}
          {project.technologies.map((technology) => (
            <span key={technology} className="text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 px-2.5 py-1 rounded-full">
              {technology}
            </span>
          ))}
          <span className="text-xs text-zinc-400 ml-1">{project.year}</span>
        </div>

        <h1 className="reveal font-display font-bold text-4xl md:text-5xl lg:text-6xl text-zinc-900 dark:text-white leading-tight mb-6">
          {project.title}
        </h1>

        <p className="reveal d1 text-xl text-zinc-500 dark:text-zinc-400 leading-relaxed mb-10 max-w-2xl">
          {project.summary}
        </p>
      </header>

      {project.image_url && (
        <div className="max-w-6xl mx-auto px-6 mb-16">
          <div className="reveal photo-frame w-full h-72 md:h-120 rounded-3xl">
            <img src={project.image_url} alt={project.title} loading="eager" />
          </div>
        </div>
      )}

      <div
        className="max-w-3xl mx-auto px-6 pb-16 prose-cs"
        dangerouslySetInnerHTML={{ __html: renderDescription(project.description) }}
      />
      <div className="max-w-3xl mx-auto px-6 pb-16">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Interested in a similar engagement? <a
            className="text-accent underline"
            href="/#contact"
            onClick={(event) => {
              event.preventDefault()
              navigateToHomeSection('contact')
            }}
          >
            Get in touch
          </a>.
        </p>
      </div>
    </article>
  )
}

export default ProjectDetailPage
