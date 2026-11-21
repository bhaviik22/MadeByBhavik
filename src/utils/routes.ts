export type Route = 'home' | 'about' | 'projects' | 'project-detail' | 'not-found' | 'test-project'

export function getProjectSlug(pathname: string): string | null {
  const match = pathname.match(/^\/projects\/([^/]+)\/?$/)
  if (!match) return null

  try {
    return decodeURIComponent(match[1])
  } catch {
    return null
  }
}

export function getRoute(pathname: string): Route {
  if (pathname === '/' || pathname === '') return 'home'
  if (pathname === '/about') return 'about'
  if (pathname === '/projects') return 'projects'
  if (getProjectSlug(pathname)) return 'project-detail'
  if (pathname === '/test-project') return 'test-project'
  return 'not-found'
}

export function navigate(path: string): void {
  window.history.pushState({}, '', path)
  window.scrollTo(0, 0)
  window.dispatchEvent(new PopStateEvent('popstate'))
}

export function navigateToHomeSection(sectionId: string): void {
  const destination = `/#${sectionId}`
  if (window.location.pathname !== '/') {
    navigate(destination)
    return
  }

  if (window.location.hash !== `#${sectionId}`) {
    window.history.pushState({}, '', destination)
  }
  document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
}