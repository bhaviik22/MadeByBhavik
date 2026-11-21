import type { FC } from 'react'

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

export const AboutPage: FC<{ siteContent?: unknown; isLoading?: boolean }> = ({ siteContent, isLoading = false }) => {
  const aboutMeEntry = Array.isArray(siteContent)
    ? siteContent.find(
        (item) => isRecord(item) && item.key === 'about_me' && item.is_published !== false,
      )
    : undefined
  const aboutMeContent =
    isRecord(aboutMeEntry) && typeof aboutMeEntry.content === 'string'
      ? aboutMeEntry.content
      : ''

  const skillsEntry = Array.isArray(siteContent)
    ? siteContent.find(
        (item) => isRecord(item) && item.key === 'skills' && item.is_published !== false,
      )
    : undefined
    
  const skills =
    isRecord(skillsEntry) && typeof skillsEntry.content === 'string'
      ? skillsEntry.content
          .split(',')
          .map((skill) => skill.trim().replace(/^["']|["']$/g, '').trim())
          .filter(Boolean)
      : []

  return (
    <section id="about" className="py-24 bg-zinc-50 dark:bg-zinc-900/40" aria-busy={isLoading}>
  <div className="max-w-6xl mx-auto px-6">
    <div className="grid md:grid-cols-2 gap-16 items-center">

      <div className="reveal order-2 md:order-1">
        <div className="pf w-full aspect-square max-w-sm mx-auto rounded-3xl">
          <img src="https://nlkiwqlvtitnstsexsga.supabase.co/storage/v1/object/public/project%20media/Professional_Portrait.png" alt="Eliott" loading="lazy"/>
        </div>
      </div>

      <div className="order-1 md:order-2">
        <p className="reveal text-xs font-medium text-accent tracking-widest uppercase mb-3">About me</p>
        <h2 className="reveal d1 font-display font-bold text-4xl md:text-5xl text-zinc-900 dark:text-white leading-tight mb-6">A bit about<br/>who I am</h2>
        {isLoading ? (
          <div className="reveal d2 mb-8 animate-pulse space-y-3" aria-hidden="true">
            <div className="h-4 w-full rounded bg-zinc-200 dark:bg-zinc-800" />
            <div className="h-4 w-full rounded bg-zinc-200 dark:bg-zinc-800" />
            <div className="h-4 w-4/5 rounded bg-zinc-200 dark:bg-zinc-800" />
          </div>
        ) : aboutMeContent && (
          <p className="reveal d2 text-zinc-500 dark:text-zinc-400 leading-relaxed mb-8 whitespace-pre-line">
            {aboutMeContent}
          </p>
        )}
        <div className="reveal d4">
          <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mb-3">Stack &amp; tools</p>
          <div className="flex flex-wrap gap-2" role="list" aria-label="Skills">
            {isLoading
              ? Array.from({ length: 5 }, (_, index) => (
                  <span key={index} aria-hidden="true" className="h-8 w-20 animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-800" />
                ))
              : skills.map((skill) => (
              <span key={skill} role="listitem" className="stag text-sm bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 px-3.5 py-1.5 rounded-full hover:border-accent">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

    </div>
  </div>
</section>
  )
}