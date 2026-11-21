
import type { FC } from 'react'
import { FaChevronDown } from 'react-icons/fa';

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null && !Array.isArray(value)
}

const HeroSection: FC<{ siteContent: unknown; isLoading?: boolean }> = ({ siteContent, isLoading = false }) => {
    if (isLoading) {
        return (
            <section id="hero" className="relative min-h-screen flex items-center pt-16 overflow-hidden" aria-busy="true">
                <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 w-full">
                    <div className="grid md:grid-cols-2 gap-12 items-center animate-pulse">
                        <div>
                            <div className="mb-6 h-4 w-36 rounded bg-zinc-200 dark:bg-zinc-800" />
                            <div className="mb-4 h-14 w-4/5 rounded bg-zinc-200 dark:bg-zinc-800 md:h-16" />
                            <div className="mb-2 h-5 w-full max-w-md rounded bg-zinc-200 dark:bg-zinc-800" />
                            <div className="mb-10 h-5 w-3/4 max-w-md rounded bg-zinc-200 dark:bg-zinc-800" />
                            <div className="flex gap-4">
                                <div className="h-12 w-36 rounded-full bg-zinc-200 dark:bg-zinc-800" />
                                <div className="h-12 w-32 rounded-full bg-zinc-200 dark:bg-zinc-800" />
                            </div>
                        </div>
                        <div className="hidden justify-center md:flex md:justify-end">
                            <div className="h-72 w-72 rounded-3xl bg-zinc-200 dark:bg-zinc-800 lg:h-96 lg:w-96" />
                        </div>
                    </div>
                </div>
            </section>
        )
    }

    if (siteContent === undefined || Array.isArray(siteContent) && siteContent.length === 0) {
        return null;
    }

    const introduction = Array.isArray(siteContent)
        ? siteContent.find((item) => item.key === 'introduction_1' && item.is_published !== false)
        : undefined

    const introductionContent = introduction.content ?? "";

    const getStatValue = (key: string) => {
        const item = Array.isArray(siteContent)
            ? siteContent.find(
                (value: unknown) =>
                    isRecord(value) && value.key === key && value.is_published !== false,
            )
            : undefined
        const value = item.content ?? undefined;

        return typeof value === 'number' || typeof value === 'string' ? value : 0
    }

    const projectCount = getStatValue('project_count')
    const experienceYear = getStatValue('experience_year')

    return (
        <section id="hero" className="relative min-h-screen flex items-center pt-16 overflow-hidden">
            <div className="absolute top-1/4 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true"></div>
            <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-zinc-200/50 dark:bg-zinc-800/30 rounded-full blur-3xl pointer-events-none" aria-hidden="true"></div>

            <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 w-full">
                <div className="grid md:grid-cols-2 gap-12 items-center">

                    <div>
                        <p className="text-sm font-medium text-accent tracking-widest uppercase mb-4">Available for work</p>
                        <h1 className="reveal d1 font-display font-bold text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-zinc-900 dark:text-white mb-6">
                            Hi, I'm <span className="text-accent">Bhavik</span>
                        </h1>
                        <p className="reveal d2 text-lg md:text-xl text-zinc-500 dark:text-zinc-400 font-light leading-relaxed max-w-md mb-10">
                            <strong className="font-medium text-zinc-700 dark:text-zinc-300"> Full Stack Developer. </strong> {introductionContent}
                        </p>
                        <div className="reveal d3 flex flex-wrap gap-4">
                            <a href="#work" className="shimmer inline-flex items-center gap-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-medium px-7 py-3.5 rounded-full hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors text-sm">
                                View my work
                                <FaChevronDown />           
                            </a>
                            <a href="/Bhavik_Panchal_CV.pdf" download="Bhavik_Panchal_CV.pdf" className="inline-flex items-center gap-2 border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 font-medium px-7 py-3.5 rounded-full hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors text-sm">
                                Download Resume
                            </a>                        
                        </div>
                        <div className="reveal d4 flex gap-8 mt-14 pt-8 border-t border-zinc-100 dark:border-zinc-900">
                            <div><p className="font-display font-bold text-3xl text-zinc-900 dark:text-white">{projectCount}+</p><p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Projects done</p></div>
                            {/* <div><p className="font-display font-bold text-3xl text-zinc-900 dark:text-white">21+</p><p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Happy clients</p></div> */}
                            <div><p className="font-display font-bold text-3xl text-zinc-900 dark:text-white">{experienceYear}y</p><p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Experience</p></div>
                        </div>
                    </div>

                    <div className="reveal d2 flex justify-center md:justify-end">
                        <div className="relative w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96">
                            <div className="pf w-full h-full rounded-3xl">
                                <img src="https://nlkiwqlvtitnstsexsga.supabase.co/storage/v1/object/public/project%20media/Modern_Coding_Workspace.png" alt="dotnet"/>
                            </div>
                            <div className="absolute -bottom-4 -left-4 bg-accent text-white font-display font-bold text-sm px-4 py-2.5 rounded-2xl shadow-lg">Open to projects</div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default HeroSection