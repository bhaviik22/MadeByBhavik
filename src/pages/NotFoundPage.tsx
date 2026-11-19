import { navigate } from '../utils/routes'

export function NotFoundPage() {
  return <section className="container page not-found"><span className="eyebrow">404</span><h1>That page wandered off.</h1><button className="button" type="button" onClick={() => navigate('/')}>Back home</button></section>
}