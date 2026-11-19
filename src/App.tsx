import { useEffect, useState } from 'react'
import { Header } from './components/Header'
import { AboutPage } from './components/AboutPage'
import { HomePage } from './pages/HomePage'
import { NotFoundPage } from './pages/NotFoundPage'
import { getProjectSlug, getRoute } from './utils/routes'
import { Toaster } from 'react-hot-toast'
import './App.css'
import ProjectsListPage from './pages/ProjectsListPage'
import ProjectDetailPage from './pages/ProjectDetailPage'

function App() {
  const [path, setPath] = useState(window.location.pathname)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) return savedTheme === 'dark'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    const handlePopState = () => setPath(window.location.pathname)
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }, [isDark])

  useEffect(() => {
    if (getRoute(path) !== 'home' || !window.location.hash) return

    const sectionId = window.location.hash.slice(1)
    const frame = window.requestAnimationFrame(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
    })
    return () => window.cancelAnimationFrame(frame)
  }, [path])

  useEffect(() => {
    const updateSection = () => {
      setIsScrolled(window.scrollY > 20)

      const currentRoute = getRoute(path)
      if (currentRoute === 'projects' || currentRoute === 'project-detail' || currentRoute === 'test-project') {
        setActiveSection('work')
        return
      }

      const atBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight - 60
      if (atBottom) {
        setActiveSection('contact')
        return
      }

      const sectionIds = ['contact', 'blog', 'reviews', 'about', 'work', 'services', 'hero']
      for (const id of sectionIds) {
        const element = document.getElementById(id)
        if (element && window.scrollY >= element.offsetTop - 130) {
          setActiveSection(id)
          return
        }
      }
    }

    let revealObserver: IntersectionObserver | null = null
    if (typeof IntersectionObserver !== 'undefined') {
      revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('in')
              revealObserver?.unobserve(entry.target)
            }
          })
        },
        { threshold: 0, rootMargin: '0px 0px -40px 0px' },
      )
    }

    const observeReveals = (root: ParentNode) => {
      const elements = root.querySelectorAll('.reveal')
      if (revealObserver) {
        elements.forEach((element) => revealObserver.observe(element))
      } else {
        elements.forEach((element) => element.classList.add('in'))
      }
    }

    observeReveals(document)

    const contentObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof Element) {
            if (node.matches('.reveal')) {
              if (revealObserver) revealObserver.observe(node)
              else node.classList.add('in')
            }
            observeReveals(node)
          }
        })
      })
    })
    contentObserver.observe(document.body, { childList: true, subtree: true })

    updateSection()
    window.addEventListener('scroll', updateSection, { passive: true })
    return () => {
      window.removeEventListener('scroll', updateSection)
      revealObserver?.disconnect()
      contentObserver.disconnect()
    }
  }, [path])

  const route = getRoute(path)

  return (
    <div className="app-shell bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 antialiased">
      <Toaster position="top-right" reverseOrder={false} />
      <Header
        isDark={isDark}
        isScrolled={isScrolled}
        activeSection={activeSection}
        isMobileMenuOpen={isMobileMenuOpen}
        onThemeToggle={() => setIsDark((current) => !current)}
        onMobileMenuToggle={() => setIsMobileMenuOpen((current) => !current)}
        onMobileMenuClose={() => setIsMobileMenuOpen(false)}
      />
      <main>
        {route === 'home' && <HomePage />}
        {route === 'projects' && <ProjectsListPage />}
        {route === 'about' && <AboutPage />}
        {route === 'not-found' && <NotFoundPage />}
        {(route === 'project-detail' || route === 'test-project') && (
          <ProjectDetailPage slug={getProjectSlug(path)} />
        )}

      </main>
      <footer className="site-footer">Crafted with React & TypeScript ⚡ Backend powered by Supabase.</footer>
    </div>
  )
}

export default App
