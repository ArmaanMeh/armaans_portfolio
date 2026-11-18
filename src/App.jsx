import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import {
  ArrowDown,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Bot,
  Boxes,
  BriefcaseBusiness,
  CircuitBoard,
  Code2,
  Mail,
  Menu,
  MoveUpRight,
  ScanLine,
  Settings2,
  Search,
  Copy,
  Check,
  X,
} from 'lucide-react'
import { portfolio } from './data/portfolio'
import './App.css'

const navigation = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Expertise', href: '#expertise' },
  { label: 'Projects', href: '#projects' },
  { label: 'Mechanical Design', href: '#mechanical-design' },
  { label: 'Contact', href: '#contact' },
]

const projectIcons = [Bot, ScanLine, CircuitBoard, CircuitBoard]

function GithubIcon({ size = 17 }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.1c-3.1.67-3.76-1.32-3.76-1.32-.5-1.3-1.23-1.65-1.23-1.65-1-.68.08-.67.08-.67 1.1.08 1.68 1.12 1.68 1.12.98 1.68 2.56 1.2 3.18.92.1-.72.38-1.2.7-1.47-2.48-.28-5.08-1.23-5.08-5.5 0-1.22.44-2.21 1.15-2.99-.12-.28-.5-1.41.11-2.95 0 0 .94-.3 3.05 1.14a10.6 10.6 0 0 1 5.55 0c2.11-1.44 3.04-1.14 3.04-1.14.61 1.54.23 2.67.11 2.95.72.78 1.15 1.77 1.15 2.99 0 4.28-2.6 5.21-5.09 5.49.4.34.75 1.02.75 2.06v3.08c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />
    </svg>
  )
}

function LinkedInIcon({ size = 17 }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.45 2H3.55C2.69 2 2 2.68 2 3.52v16.96c0 .84.69 1.52 1.55 1.52h16.9c.85 0 1.55-.68 1.55-1.52V3.52c0-.84-.7-1.52-1.55-1.52ZM7.93 18.45H4.96V9.9h2.97v8.55ZM6.45 8.73a1.72 1.72 0 1 1 0-3.44 1.72 1.72 0 0 1 0 3.44Zm12 9.72h-2.97v-4.16c0-.99-.02-2.27-1.38-2.27-1.38 0-1.59 1.08-1.59 2.2v4.23H9.54V9.9h2.85v1.17h.04c.4-.75 1.37-1.54 2.82-1.54 3.01 0 3.57 1.98 3.57 4.56v4.36Z" />
    </svg>
  )
}

function Reveal({ children, className = '', delay = 0 }) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

function SectionHeading({ eyebrow, title, description, number }) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow">
          <span className="eyebrow-line" />
          {eyebrow}
        </p>
        <h2>{title}</h2>
      </div>
      <div className="section-heading-aside">
        <span className="section-number">{number}</span>
        {description && <p>{description}</p>}
      </div>
    </div>
  )
}

function ExternalAction({ href, label, icon: Icon, className = '', download = false }) {
  if (!href) {
    return (
      <button
        type="button"
        className={`${className} action-unavailable`}
        disabled
        title={`${label} link has not been added yet`}
        aria-label={`${label} link has not been added yet`}
      >
        {Icon && <Icon aria-hidden="true" size={17} />}
        <span>{label}</span>
      </button>
    )
  }

  return (
    <a
      className={className}
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noreferrer' : undefined}
      download={download || undefined}
      aria-label={label}
    >
      {Icon && <Icon aria-hidden="true" size={17} />}
      <span>{label}</span>
    </a>
  )
}

function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const sections = navigation.map((item) => document.querySelector(item.href)).filter(Boolean)
    const updateActive = () => {
      const current = sections.find((section) => section.getBoundingClientRect().top <= 160) || sections[0]
      setActiveSection(current?.id || 'home')
    }
    updateActive()
    window.addEventListener('scroll', updateActive, { passive: true })
    return () => window.removeEventListener('scroll', updateActive)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="site-header">
      <nav className="nav-shell" aria-label="Main navigation">
        <a className="brand" href="#home" onClick={closeMenu} aria-label={`${portfolio.name}, home`}>
          <span className="brand-mark" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
          <span className="brand-name">{portfolio.name}</span>
        </a>

        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="primary-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>

        <div id="primary-menu" className={`nav-content${menuOpen ? ' is-open' : ''}`}>
          <div className="nav-links">
            {navigation.map((item) => (
              <a key={item.href} href={item.href} onClick={closeMenu} className={activeSection === item.href.slice(1) ? 'nav-active' : ''}>
                {item.label}
              </a>
            ))}
          </div>
          <ExternalAction
            href={portfolio.cv}
            label="Download CV"
            icon={ArrowDown}
            download
            className="button button-outline nav-cv"
          />
        </div>
      </nav>
    </header>
  )
}

function RobotPlaceholder() {
  return (
    <div className="robot-stage" aria-label="Reserved space for an interactive 3D robot model">
      <div className="stage-topline">
        <span className="stage-label">
          <span className="status-dot" />
          ROBOT VISUALIZATION
        </span>
        <span className="stage-index">FIG. 01 / 04</span>
      </div>
      <div className="stage-grid" aria-hidden="true" />
      <div className="stage-crosshair crosshair-one" aria-hidden="true" />
      <div className="stage-crosshair crosshair-two" aria-hidden="true" />
      <div className="robot-art" aria-hidden="true">
        <div className="robot-orbit orbit-outer" />
        <div className="robot-orbit orbit-inner" />
        <div className="robot-shadow" />
        <svg className="robot-drawing" viewBox="0 0 360 420" fill="none">
          <defs>
            <linearGradient id="robot-metal" x1="86" y1="50" x2="263" y2="360" gradientUnits="userSpaceOnUse">
              <stop stopColor="#d7efff" />
              <stop offset=".48" stopColor="#718ba4" />
              <stop offset="1" stopColor="#263c52" />
            </linearGradient>
            <linearGradient id="robot-panel" x1="109" y1="128" x2="252" y2="284" gradientUnits="userSpaceOnUse">
              <stop stopColor="#183a51" />
              <stop offset="1" stopColor="#0b1c2a" />
            </linearGradient>
            <filter id="robot-glow" x="76" y="46" width="210" height="340" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
              <feGaussianBlur stdDeviation="3" />
            </filter>
          </defs>
          <ellipse cx="180" cy="369" rx="82" ry="15" fill="#42c7e8" fillOpacity=".08" filter="url(#robot-glow)" />
          <path d="M119 324 108 362l31 15 28-17v-39m44 3 12 38-31 16-28-18" fill="url(#robot-metal)" stroke="#b3d5e6" strokeOpacity=".7" strokeWidth="1.5" />
          <path d="m138 246-33 33 4 54 35 14 29-34v-57m49-10 33 33-4 54-35 14-29-34v-57" fill="url(#robot-metal)" stroke="#c8e3f0" strokeOpacity=".58" strokeWidth="1.5" />
          <path d="m119 117 29-27h64l29 27 16 114-26 54-51 17-51-17-26-54 16-114Z" fill="url(#robot-panel)" stroke="#b8dceb" strokeOpacity=".72" strokeWidth="2" />
          <path d="m142 119 18-14h40l18 14 12 90-18 29h-64l-18-29 12-90Z" fill="#102b3e" stroke="#7ea8bc" strokeOpacity=".72" />
          <path d="M145 149h70l8 49-15 19h-56l-15-19 8-49Z" fill="#06131e" stroke="#5b849b" />
          <path d="M156 174h14v8h-14zm34 0h14v8h-14z" fill="#70e5f5" />
          <path d="M173 207h14m-7-7v14" stroke="#64d9eb" strokeWidth="1.5" />
          <path d="m105 278-28 4-9 47 17 20 24-11m146-60 28 4 9 47-17 20-24-11" fill="url(#robot-metal)" stroke="#b8dceb" strokeOpacity=".65" strokeWidth="1.5" />
          <path d="M129 285h102m-94 15h86m-79 16h72" stroke="#7c9fb4" strokeOpacity=".45" />
          <path d="M151 362h32m26 0h-19" stroke="#70e5f5" strokeLinecap="round" strokeWidth="2" />
          <path d="M180 63v26m-24-10h48" stroke="#70e5f5" strokeOpacity=".8" />
          <circle cx="180" cy="55" r="7" fill="#70e5f5" fillOpacity=".75" />
        </svg>
        <span className="robot-callout callout-left">VISION<br />SENSOR</span>
        <span className="robot-callout callout-right">ROBOT<br />PLATFORM</span>
        <span className="robot-model-tag">3D MODEL<br />TO BE ADDED</span>
      </div>
      <div className="stage-footer">
        <span>INTERACTIVE MODEL SPACE</span>
        <span className="stage-coordinates">X 00.00&nbsp;&nbsp; Y 00.00&nbsp;&nbsp; Z 00.00</span>
      </div>
    </div>
  )
}

function Hero() {
  return (
    <section className="hero-section section-shell" id="home">
      <div className="hero-copy">
        <Reveal>
          <p className="eyebrow hero-eyebrow">
            <span className="eyebrow-line" />
            MECHANICS MEET INTELLIGENCE
          </p>
          <h1>
            Engineering
            <br />
            <span>Intelligent Machines.</span>
            <br />
            Building <span>Autonomous</span>
            <br className="desktop-break" /> Systems.
          </h1>
          <p className="hero-subtitle">{portfolio.subtitle}</p>
          <p className="hero-intro">
            I bring mechanical engineering and robotics together to explore how machines
            perceive, move, and work autonomously.
          </p>
          <div className="hero-actions flex items-center gap-3">
            <a className="button button-primary" href="#projects">
              View projects <ArrowRight size={17} aria-hidden="true" />
            </a>
            <ExternalAction
              href={portfolio.cv}
              label="Download CV"
              icon={ArrowDown}
              download
              className="button button-quiet"
            />
          </div>
          <div className="hero-socials" aria-label="Social profiles">
            <ExternalAction href={portfolio.github} label="GitHub" icon={GithubIcon} className="social-link" />
            <ExternalAction href={portfolio.linkedin} label="LinkedIn" icon={LinkedInIcon} className="social-link" />
          </div>
        </Reveal>
      </div>
      <Reveal className="hero-visual-wrap" delay={0.12}>
        <RobotPlaceholder />
      </Reveal>
      <a className="scroll-cue" href="#about">
        <span>SCROLL TO EXPLORE</span>
        <ArrowDownRight size={15} aria-hidden="true" />
      </a>
    </section>
  )
}

function About() {
  return (
    <section className="section-shell content-section about-section" id="about">
      <Reveal>
        <SectionHeading
          eyebrow="A LITTLE ABOUT ME"
          title={<>From mechanical<br />systems to robotics.</>}
          number="01"
          description="An engineering foundation, with a focus on intelligent and autonomous machines."
        />
      </Reveal>
      <div className="about-grid">
        <Reveal className="about-statement">
          <span className="quote-mark" aria-hidden="true">“</span>
          <p>
            I’m a Mechanical Engineer with a B.Tech in Mechanical Engineering and a
            completed MSc in Robotics.
          </p>
          <p className="about-detail">
            My interests span mechanical design, robotics, autonomous systems, computer
            vision, and machine learning — connecting physical design with intelligent
            behaviour.
          </p>
        </Reveal>
        <Reveal className="education-panel" delay={0.1}>
          <div className="panel-caption">
            <span>EDUCATION</span>
            <span className="panel-rule" />
          </div>
          <div className="education-item">
            <span className="education-index">01</span>
            <div>
              <p className="education-title">MSc Robotics</p>
              <p className="education-note">Completed · Pass with Merit</p>
            </div>
            <BriefcaseBusiness size={19} aria-hidden="true" />
          </div>
          <div className="education-item">
            <span className="education-index">02</span>
            <div>
              <p className="education-title">B.Tech Mechanical Engineering</p>
              <p className="education-note">Undergraduate degree</p>
            </div>
            <Settings2 size={19} aria-hidden="true" />
          </div>
          <div className="education-bottom">
            <span>FOUNDATION</span>
            <span>MECHANICAL ENGINEERING <span className="accent-dot">/</span> ROBOTICS</span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Expertise() {
  const [selectedSkill, setSelectedSkill] = useState(null)
  const selectedProjects = selectedSkill
    ? portfolio.projects.filter((project) => project.technologies.some((technology) =>
        technology.toLowerCase().includes(selectedSkill.toLowerCase()) ||
        selectedSkill.toLowerCase().includes(technology.toLowerCase())
      ))
    : []

  return (
    <section className="section-shell content-section expertise-section" id="expertise">
      <Reveal>
        <SectionHeading
          eyebrow="TECHNICAL EXPERTISE"
          title="Built across disciplines."
          number="02"
          description="A working toolkit across the physical, computational, and perceptual layers of robotics."
        />
      </Reveal>
      <div className="expertise-grid">
        {portfolio.expertise.map((category, index) => (
          <Reveal className="skill-card" key={category.title} delay={index * 0.055}>
            <div className="skill-card-top">
              <span className="skill-icon">
                {index === 0 && <Bot size={19} aria-hidden="true" />}
                {index === 1 && <Settings2 size={19} aria-hidden="true" />}
                {index === 2 && <Code2 size={19} aria-hidden="true" />}
                {index === 3 && <ScanLine size={19} aria-hidden="true" />}
              </span>
              <span className="skill-index">0{index + 1}</span>
            </div>
            <h3>{category.title}</h3>
            <ul className="skill-tags">
              {category.skills.map((skill) => (
                <li key={skill}>
                  <button
                    type="button"
                    className={selectedSkill === skill ? 'skill-selected' : ''}
                    onClick={() => setSelectedSkill(selectedSkill === skill ? null : skill)}
                    aria-pressed={selectedSkill === skill}
                  >
                    {skill}
                  </button>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
      {selectedSkill && (
        <div className="skill-projects" role="status">
          <span>Projects using {selectedSkill}</span>
          {selectedProjects.length ? (
            selectedProjects.map((project) => (
              <a key={project.id} href="#projects" onClick={(event) => {
                event.preventDefault()
                document.querySelector(`[data-project="${project.id}"]`)?.scrollIntoView({ behavior: 'smooth' })
              }}>
                {project.title} <ArrowUpRight size={13} />
              </a>
            ))
          ) : (
            <p>Listed as a working area; related project details will be expanded as evidence is added.</p>
          )}
        </div>
      )}
    </section>
  )
}

function ProjectCard({ project, index, onOpen }) {
  const ProjectIcon = projectIcons[index] || Bot

  return (
    <article className="project-card" data-project={project.id}>
      <div className={`project-visual project-visual-${index + 1}`} aria-hidden="true">
        <div className="project-visual-grid" />
        <span className="project-visual-index">PROJECT / 0{index + 1}</span>
        {project.image ? (
          <img className="project-card-image" src={project.image} alt="" loading="lazy" />
        ) : (
          <>
            <div className="project-placeholder-icon">
              <ProjectIcon size={34} strokeWidth={1.15} />
            </div>
            <span className="project-image-note">PROJECT IMAGE<br />TO BE ADDED</span>
          </>
        )}
        <span className="project-corner-mark"><MoveUpRight size={15} /></span>
      </div>
      <div className="project-info">
        <div className="project-title-line">
          <span className="project-number">0{index + 1}</span>
          <h3>{project.title}</h3>
        </div>
        <p className="project-description">{project.description}</p>
        <p className="project-status"><strong>Status:</strong> {project.status}</p>
        <p className="project-contribution"><strong>Contribution:</strong> {project.contribution}</p>
        <ul className="project-tags">
          {project.technologies.map((technology) => <li key={technology}>{technology}</li>)}
        </ul>
        <div className="project-actions">
          <ExternalAction href={project.github} label="GitHub" icon={GithubIcon} className="text-action" />
          <ExternalAction href={project.demo} label="Demo video" icon={ArrowUpRight} className="text-action" />
          <button type="button" className="text-action project-details-button" onClick={() => onOpen(project)}>
            Engineering breakdown <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </article>
  )
}

function Projects() {
  const [filter, setFilter] = useState('All Projects')
  const [search, setSearch] = useState('')
  const [activeProject, setActiveProject] = useState(null)
  const filters = ['All Projects', 'Robotics', 'Mechanical Design', 'AI / Machine Learning', 'Embedded Systems']
  const filteredProjects = portfolio.projects.filter((project) => {
    const matchesFilter = filter === 'All Projects' || project.categories.includes(filter)
    const haystack = [project.title, project.description, project.status, ...project.technologies].join(' ').toLowerCase()
    return matchesFilter && haystack.includes(search.trim().toLowerCase())
  })

  useEffect(() => {
    if (!activeProject) return undefined
    const closeOnEscape = (event) => event.key === 'Escape' && setActiveProject(null)
    document.addEventListener('keydown', closeOnEscape)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', closeOnEscape)
      document.body.style.overflow = ''
    }
  }, [activeProject])

  return (
    <section className="section-shell content-section projects-section" id="projects">
      <Reveal>
        <SectionHeading
          eyebrow="SELECTED WORK"
          title="Selected engineering work."
          number="03"
          description="Implementation evidence from repositories, with completed, partial, and planned work distinguished clearly."
        />
      </Reveal>
      <div className="project-controls">
        <div className="project-filters" aria-label="Filter projects">
          {filters.map((item) => (
            <button type="button" key={item} className={filter === item ? 'filter-active' : ''} aria-pressed={filter === item} onClick={() => setFilter(item)}>
              {item}
            </button>
          ))}
        </div>
        <label className="project-search">
          <Search size={16} aria-hidden="true" />
          <span className="sr-only">Search projects</span>
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search projects" />
        </label>
      </div>
      {filteredProjects.length === 0 && <p className="empty-projects">No projects match this search and filter.</p>}
      <div className="projects-grid">
        {filteredProjects.map((project, index) => (
          <Reveal key={project.title} delay={(index % 2) * 0.07}>
            <ProjectCard project={project} index={index} onOpen={setActiveProject} />
          </Reveal>
        ))}
      </div>
      {activeProject && (
        <div className="project-modal-backdrop" role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setActiveProject(null)
        }}>
          <div className="project-modal" role="dialog" aria-modal="true" aria-labelledby="project-modal-title">
            <button type="button" className="modal-close" onClick={() => setActiveProject(null)} aria-label="Close project details"><X size={21} /></button>
            <p className="eyebrow"><span className="eyebrow-line" />Engineering breakdown</p>
            <h2 id="project-modal-title">{activeProject.title}</h2>
            <div className="modal-status"><span>{activeProject.status}</span></div>
            <p className="modal-lead">{activeProject.description}</p>
            <div className="case-grid">
              {Object.entries(activeProject.details).map(([key, value]) => (
                <section className="case-section" key={key}>
                  <h3>{key.replace(/([A-Z])/g, ' $1').replace(/^./, (letter) => letter.toUpperCase())}</h3>
                  {Array.isArray(value) ? <ul>{value.map((item) => <li key={item}>{item}</li>)}</ul> : <p>{value}</p>}
                </section>
              ))}
            </div>
            <div className="modal-actions">
              <ExternalAction href={activeProject.github} label="View repository" icon={GithubIcon} className="button button-outline" />
              <ExternalAction href={activeProject.demo} label="Watch demo" icon={ArrowUpRight} className="button button-quiet" />
              <ExternalAction href={activeProject.readme} label="Read README" icon={ArrowUpRight} className="button button-quiet" />
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

const designIcons = [Boxes, Settings2, Bot, ScanLine, Code2]

function MechanicalDesign() {
  return (
    <section className="section-shell content-section design-section" id="mechanical-design">
      <Reveal>
        <SectionHeading
          eyebrow="MECHANICAL DESIGN"
          title="Designed for the real world."
          number="04"
          description="A dedicated space for engineering work. Visuals and technical details will be added once the original models are shared."
        />
      </Reveal>
      <div className="design-grid">
        {portfolio.designAreas.map((area, index) => {
          const DesignIcon = designIcons[index]
          return (
            <Reveal className={`design-card design-card-${index + 1}`} key={area.title} delay={index * 0.045}>
              <div className="design-card-visual" aria-hidden="true">
                <div className="blueprint-grid" />
                <div className="blueprint-outline blueprint-outline-one" />
                <div className="blueprint-outline blueprint-outline-two" />
                <DesignIcon className="design-card-icon" size={25} strokeWidth={1.25} />
                <span className="design-image-label">IMAGE TO BE ADDED</span>
              </div>
              <div className="design-card-caption">
                <span className="design-index">0{index + 1}</span>
                <h3>{area.title}</h3>
                <ArrowUpRight size={15} aria-hidden="true" />
              </div>
            </Reveal>
          )
        })}
      </div>
      <div className="design-note">
        <span className="status-dot" />
        <p>Original CAD models, assemblies, drawings, and calculations can be added here when ready.</p>
      </div>
    </section>
  )
}

function Contact() {
  const [copied, setCopied] = useState(false)
  const copyEmail = async () => {
    if (!portfolio.email) return
    await navigator.clipboard.writeText(portfolio.email)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }
  const contactItems = [
    { label: 'Email', value: portfolio.email, icon: Mail, href: portfolio.email ? `mailto:${portfolio.email}` : null },
    { label: 'LinkedIn', value: portfolio.linkedin ? 'Open profile' : 'Profile link coming soon', icon: LinkedInIcon, href: portfolio.linkedin },
    { label: 'GitHub', value: portfolio.github ? 'Open profile' : 'Profile link coming soon', icon: GithubIcon, href: portfolio.github },
  ]

  return (
    <section className="section-shell contact-section" id="contact">
      <Reveal className="contact-copy">
        <p className="eyebrow">
          <span className="eyebrow-line" />
          GET IN TOUCH
        </p>
        <h2>Let’s build<br /><span>what’s next.</span></h2>
        <p className="contact-intro">
          Interested in robotics, autonomous systems, or mechanical design? Connect with me
          through the channels below.
        </p>
        <div className="contact-socials">
          {contactItems.map((item) => (
            <ExternalAction
              key={item.label}
              href={item.href}
              label={item.label}
              icon={item.icon}
              className="contact-link"
            />
          ))}
          {portfolio.email && (
            <button type="button" className="contact-link" onClick={copyEmail}>
              {copied ? <Check size={17} /> : <Copy size={17} />}
              <span>{copied ? 'Email copied' : 'Copy email'}</span>
            </button>
          )}
        </div>
        <p className="contact-note">Contact details will be added when provided.</p>
      </Reveal>
      <Reveal className="contact-aside" delay={0.12}>
        <div className="contact-aside-top">
          <CircuitBoard size={20} aria-hidden="true" />
          <span>OPEN TO CONNECTIONS</span>
        </div>
        <div className="contact-aside-graphic" aria-hidden="true">
          <span className="contact-ring ring-a" />
          <span className="contact-ring ring-b" />
          <span className="contact-ring ring-c" />
          <span className="contact-center">
            <span />
            <span />
          </span>
        </div>
        <div className="contact-aside-bottom">
          <span>ENGINEERING / ROBOTICS / DESIGN</span>
          <ArrowUpRight size={16} aria-hidden="true" />
        </div>
      </Reveal>
    </section>
  )
}

function Footer() {
  return (
    <footer className="site-footer section-shell">
      <a className="brand footer-brand" href="#home">
        <span className="brand-mark" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
        <span className="brand-name">{portfolio.name}</span>
      </a>
      <span className="footer-note">MECHANICAL ENGINEERING <span className="accent-dot">/</span> ROBOTICS</span>
      <a className="back-to-top" href="#home">BACK TO TOP <ArrowUpRight size={14} aria-hidden="true" /></a>
    </footer>
  )
}

function App() {
  useEffect(() => {
    const updateProgress = () => {
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = documentHeight > 0 ? (window.scrollY / documentHeight) * 100 : 0
      document.documentElement.style.setProperty('--scroll-progress', `${progress}%`)
    }
    updateProgress()
    window.addEventListener('scroll', updateProgress, { passive: true })
    return () => window.removeEventListener('scroll', updateProgress)
  }, [])

  return (
    <>
      <div className="scroll-progress" aria-hidden="true" />
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Navigation />
      <main id="main-content">
        <Hero />
        <About />
        <Expertise />
        <Projects />
        <MechanicalDesign />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
