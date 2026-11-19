import type { FC } from 'react'
import type { Service } from '../types/service'

const ServiceSection: FC<{ services: Service[]; isLoading?: boolean }> = ({ services, isLoading = false }) => {
  return (
    <section id="services" className="py-24 bg-zinc-50 dark:bg-zinc-900/40">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-14">
          <p className="reveal text-xs font-medium text-accent tracking-widest uppercase mb-3">What I do</p>
          <h2 className="reveal d1 font-display font-bold text-4xl md:text-5xl text-zinc-900 dark:text-white">Services</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6" aria-busy={isLoading}>
          {isLoading
            ? Array.from({ length: 3 }, (_, index) => (
                <article
                  key={index}
                  aria-hidden="true"
                  className="animate-pulse rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-8"
                >
                  <div className="mb-6 h-12 w-12 rounded-xl bg-zinc-200 dark:bg-zinc-700" />
                  <div className="mb-4 h-6 w-2/3 rounded bg-zinc-200 dark:bg-zinc-700" />
                  <div className="mb-2 h-4 w-full rounded bg-zinc-100 dark:bg-zinc-800" />
                  <div className="h-4 w-4/5 rounded bg-zinc-100 dark:bg-zinc-800" />
                </article>
              ))
            : services.map((service, index) => {
            const isAlternate = index % 2 === 1

            return (
              <article
                key={service.id}
                className={`reveal card-h group rounded-2xl p-8 border hover:border-accent ${
                  isAlternate
                    ? 'bg-zinc-900 dark:bg-zinc-800 border-zinc-800 text-white'
                    : 'bg-white dark:bg-zinc-900 border-zinc-100 dark:border-zinc-800'
                }`}
              >
                <div className={`w-12 h-12 flex items-center justify-center rounded-xl mb-6 group-hover:bg-accent/10 transition-colors ${
                  isAlternate ? 'bg-zinc-800 dark:bg-zinc-700' : 'bg-teal-50 dark:bg-zinc-800'
                }`}>
                  <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-2" />
                  </svg>
                </div>
                <h3 className={`font-display font-bold text-xl mb-3 ${isAlternate ? 'text-white' : 'text-zinc-900 dark:text-white'}`}>{service.title}</h3>
                <p className={`text-sm leading-relaxed ${isAlternate ? 'text-zinc-400' : 'text-zinc-500 dark:text-zinc-400'}`}>{service.description}</p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default ServiceSection