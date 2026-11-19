import { BsArrowRight, BsFillSunFill, BsList, BsMoon, BsXLg } from "react-icons/bs";
import { navigateToHomeSection } from '../utils/routes'

type HeaderProps = {
  isDark: boolean;
  isScrolled: boolean;
  activeSection: string;
  isMobileMenuOpen: boolean;
  onThemeToggle: () => void;
  onMobileMenuToggle: () => void;
  onMobileMenuClose: () => void;
};

export function Header({
  isDark,
  isScrolled,
  activeSection,
  isMobileMenuOpen,
  onThemeToggle,
  onMobileMenuToggle,
  onMobileMenuClose,
}: HeaderProps) {
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/85 dark:bg-zinc-950/85 shadow-sm backdrop-blur-md' : ''}`}>
      <nav
        className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between"
        aria-label="Main navigation"
      >
        <a
          href="/#hero"
          onClick={(event) => {
            event.preventDefault()
            navigateToHomeSection('hero')
          }}
          className="font-display font-bold text-xl tracking-tight relative z-10"
        >
          <span className="text-zinc-900 dark:text-white">Bha</span>
          <span className="text-accent">vik</span>
        </a>

        <ul className="hidden md:flex items-center gap-8 text-sm" role="list">
          <li>
            <a href="#services" className={`nl ${activeSection === 'services' ? 'on' : ''} text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors`}>
              Services
            </a>
          </li>
          <li>
            <a href="#work" className={`nl ${activeSection === 'work' ? 'on' : ''} text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors`}>
              Work
            </a>
          </li>
          <li>
            <a href="#about" className={`nl ${activeSection === 'about' ? 'on' : ''} text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors`}>
              About
            </a>
          </li>
          {/* <li>
            <a href="#reviews" className={`nl ${activeSection === 'reviews' ? 'on' : ''} text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors`}>
              Reviews
            </a>
          </li>
          <li>
            <a href="#blog" className={`nl ${activeSection === 'blog' ? 'on' : ''} text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors`}>
              Blog
            </a>
          </li> */}
          <li>
            <a href="#contact" className={`nl ${activeSection === 'contact' ? 'on' : ''} text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors`}>
              Contact
            </a>
          </li>
        </ul>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onThemeToggle}
            aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
            className="w-9 h-9 flex items-center justify-center rounded-full border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
          >
            {isDark ? <BsFillSunFill aria-hidden="true" /> : <BsMoon aria-hidden="true" />}
          </button>

          <a href="#contact" className="hidden md:inline-flex items-center gap-2 shimmer bg-accent text-white text-sm font-medium px-5 py-2 rounded-full hover:bg-accent-light transition-colors">
            Hire me{" "}
            <BsArrowRight />
          </a>

          <button
            type="button"
            onClick={onMobileMenuToggle}
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-full border border-zinc-200 dark:border-zinc-800"
          >
            {isMobileMenuOpen ? <BsXLg aria-hidden="true" /> : <BsList aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {isMobileMenuOpen && <div id="mobile-navigation" className="md:hidden bg-white dark:bg-zinc-950 border-t border-zinc-100 dark:border-zinc-900">
        <ul className="flex flex-col px-6 py-5 gap-4 text-sm font-medium" role="list">
          <li>
            <a href="#services" onClick={onMobileMenuClose} className="block text-zinc-700 dark:text-zinc-300 hover:text-accent transition-colors">
              Services
            </a>
          </li>
          <li>
            <a href="#work" onClick={onMobileMenuClose} className="block text-zinc-700 dark:text-zinc-300 hover:text-accent transition-colors">
              Work
            </a>
          </li>
          <li>
            <a href="#about" onClick={onMobileMenuClose} className="block text-zinc-700 dark:text-zinc-300 hover:text-accent transition-colors" >
              About
            </a>
          </li>
          <li>
            <a href="#reviews" onClick={onMobileMenuClose} className="block text-zinc-700 dark:text-zinc-300 hover:text-accent transition-colors">
              Reviews
            </a>
          </li>
          <li>
            <a href="#blog" onClick={onMobileMenuClose} className="block text-zinc-700 dark:text-zinc-300 hover:text-accent transition-colors">
              Blog
            </a>
          </li>
          <li>
            <a href="#contact" onClick={onMobileMenuClose} className="block text-zinc-700 dark:text-zinc-300 hover:text-accent transition-colors">
              Contact
            </a>
          </li>
          <li className="pt-2 border-t border-zinc-100 dark:border-zinc-900">
            <a href="#contact" onClick={onMobileMenuClose} className="inline-flex shimmer bg-accent text-white font-medium text-sm px-5 py-2.5 rounded-full">
              Hire me 
              <BsArrowRight />
            </a>
          </li>
        </ul>
      </div>}
    </header>
  );
}
