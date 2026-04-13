import React, { useEffect, useMemo, useState } from 'react'
import Login from './Login'
import Button from './components/ui/button'
import Card from './components/ui/card'
import Contact from './Contact'
import Partners from './Partners'
import Footprint from './Footprint'
import Resources from './Resources'
import GetInvolved from './GetInvolved'
import Committee from './Committee'
import Organization from './Organization'
import WhatWeDo from './WhatWeDo'
import Calendar from './Calendar'
import Register from './Register'

const navigationLinks = [
  { href: '/what-we-do', label: 'What We Do' },
  { href: '/organization', label: 'Organization' },
  { href: '/footprint', label: 'Footprint' },
  { href: '/partners', label: 'Partners' },
  { href: '/get-involved', label: 'Get Involved' },
  { href: '/resources', label: 'Resources' },
  { href: '/committee', label: 'Committee' },
  { href: '/contact', label: 'Contact' },
]

const heroSlides = [
  {
    src: '/assets/C1.jpeg',
    alt: 'Athletes competing in a tournament',
    title: 'Building Champions',
    description: 'Supporting athletes at every level of competition',
  },
  {
    src: '/assets/C2.jpg',
    alt: 'Community sports event',
    title: 'Community Impact',
    description: 'Creating positive change through sports',
  },
  {
    src: '/assets/P5.jpeg',
    alt: 'Taekwondo Championship 2025',
    title: 'Sports Event',
    description: 'Creating positive change through sports',
  },
]

const whatWeDo = [
  {
    title: 'Athlete Development',
    description:
      'Comprehensive training programs, scholarships, and support systems for athletes at all levels.',
  },
  {
    title: 'Event Organization',
    description:
      'Hosting national and international competitions, tournaments, and exhibition matches.',
  },
  {
    title: 'Community Programs',
    description:
      'Grassroots initiatives, youth engagement, and sports for development projects.',
  },
]

const trustPoints = [
  {
    title: 'Athlete Support',
    description:
      'We offer aspiring and underprivileged athletes financial assistance, emotional support, and mentorship.',
  },
  {
    title: 'Training & Coaching',
    description:
      'We provide access to qualified trainers, individualized coaching, and professional training programs.',
  },
  {
    title: 'School & Academy Collaboration',
    description:
      'In order to provide qualified coaches and support the development of robust sports programs, we collaborate with schools and sports academies.',
  },
  {
    title: 'Talent Development',
    description:
      'We find bright young people and set them up for success at the local, state, federal, and even global levels.',
  },
  {
    title: 'Community Engagement',
    description:
      'We raise awareness of the value of sports and fitness in daily life through seminars, gatherings, and awareness campaigns.',
  },
]

const resources = [
  {
    title: 'Training Materials',
    description:
      'Coaching guides, training plans, and technical resources for athletes and coaches.',
    cta: 'Access Library',
    href: '#',
  },
  {
    title: 'Event Calendar',
    description:
      'Upcoming competitions, training camps, workshops, and community events.',
    cta: 'View Calendar',
    href: '/calendar',
  },
  {
    title: 'Publications',
    description:
      'Inter-School Taekwondo Championship by Parwah Sports Charitable Trust',
    cta: 'Browse Publications',
    href: '/assets/sample.pdf',
  },
]

const committeeMembers = [
  { id: 2, image: '/assets/M2.jpeg', name: 'Haider choudhary' },
  { id: 1, image: '/assets/M1.jpeg', name: 'Mustkin ansari ' },
  { id: 4, image: '/assets/M4.jpeg', name: 'Ritik Singh' },
]

function getCurrentPath() {
  return window.location.pathname
}

function navigateTo(path) {
  if (window.location.pathname === path) return
  window.history.pushState({}, '', path)
  window.scrollTo(0, 0)
  window.dispatchEvent(new PopStateEvent('popstate'))
}

function scrollToTarget(href) {
  const target = document.querySelector(href)
  target?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function ScrollLink({ href, children, className, onClick }) {
  return (
    <a
      href={href}
      className={className}
      onClick={(event) => {
        onClick?.()

        if (href.startsWith('/')) {
          event.preventDefault()
          navigateTo(href)
          return
        }

        if (window.location.pathname !== '/') {
          event.preventDefault()
          navigateTo('/')
          window.setTimeout(() => scrollToTarget(href), 40)
          return
        }

        event.preventDefault()
        scrollToTarget(href)
      }}
    >
      {children}
    </a>
  )
}

function Header({ token, path }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [adminDropdownOpen, setAdminDropdownOpen] = useState(false)

  const isActivePath = (href) => {
    if (href === '/' && path === '/') return true
    if (href !== '/' && path.startsWith(href)) return true
    return false
  }

  // Close mobile menu if window is resized to desktop width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.admin-dropdown')) {
        setAdminDropdownOpen(false);
      }
    };
    if (adminDropdownOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [adminDropdownOpen]);

  return (
    <header className="site-header">
      <div className="shell flex items-center justify-between gap-8 py-3">
        
        {/* Brand Section - Leftmost */}
        <button
          type="button"
          className="brand-mark flex-shrink-0"
          onClick={() => {
            setMenuOpen(false)
            navigateTo('/')
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
        >
          <img src="/assets/logo.png" alt="Parwah Sports logo" className="h-12 w-12 rounded-full object-cover shadow-sm" />
          <div className="text-left">
            <p className="brand-kicker">Parwah Sports</p>
            <p className="brand-title">Charitable Trust</p>
          </div>
        </button>

        {/* Navigation - Hidden on mobile, shown on lg screens */}
        <nav className="hidden items-center gap-8 lg:flex flex-1">
          {navigationLinks.map((link) => (
            <ScrollLink 
              key={link.href} 
              href={link.href} 
              className={`nav-link ${isActivePath(link.href) ? 'nav-link-active' : ''}`}
            >
              {link.label}
            </ScrollLink>
          ))}
        </nav>

        {/* Admin Dropdown - Extreme Right */}
        <div className="hidden lg:flex items-center">
          <div className="admin-dropdown relative">
            <button
              onClick={() => setAdminDropdownOpen(!adminDropdownOpen)}
              className="text-sm font-semibold px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200"
            >
              Admin
            </button>
            {adminDropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-40">
                {token ? (
                  <button
                    onClick={() => {
                      setAdminDropdownOpen(false);
                      navigateTo('/admin')
                    }}
                    className="block w-full text-left px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Admin Panel
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        setAdminDropdownOpen(false);
                        navigateTo('/admin/login')
                      }}
                      className="block w-full text-left px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors border-b border-gray-200"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => {
                        setAdminDropdownOpen(false);
                        navigateTo('/admin/register')
                      }}
                      className="block w-full text-left px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Register
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Toggle - shown on mobile, hidden on lg screens */}
        <button
          type="button"
          className="menu-toggle lg:hidden"
          aria-label="Toggle navigation"
          onClick={() => setMenuOpen((current) => !current)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile Menu - shown only on mobile when open */}
      {menuOpen ? (
        <div className="shell pb-4 lg:hidden border-t border-gray-200">
          <div className="mobile-panel">
            {navigationLinks.map((link) => (
              <ScrollLink
                key={link.href}
                href={link.href}
                className={`mobile-link ${isActivePath(link.href) ? 'mobile-link-active' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </ScrollLink>
            ))}
            
            {/* Mobile Admin Buttons */}
            <div className="pt-2 border-t border-gray-200 mt-2 flex flex-col gap-2">
              {token ? (
                <Button 
                  onClick={() => { setMenuOpen(false); navigateTo('/admin'); }}
                  className="w-full text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Admin Panel
                </Button>
              ) : (
                <>
                  <Button 
                    variant="ghost" 
                    onClick={() => { setMenuOpen(false); navigateTo('/admin/login'); }}
                    className="w-full text-sm font-semibold"
                  >
                    Login
                  </Button>
                  <Button 
                    onClick={() => { setMenuOpen(false); navigateTo('/admin/register'); }}
                    className="w-full text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Register
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </header>
  )
}

function HomePage() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrentIndex((current) => (current + 1) % heroSlides.length)
    }, 5000)

    return () => window.clearInterval(interval)
  }, [])

  return (
    <main>
      <section className="hero-section">
        <div className="hero-slides">
          {heroSlides.map((slide, index) => (
            <div
              key={slide.title}
              className={`hero-slide ${index === currentIndex ? 'is-active' : ''}`}
              aria-hidden={index !== currentIndex}
            >
              <img src={slide.src} alt={slide.alt} className="hero-image" />
              <div className="hero-overlay" />
            </div>
          ))}
        </div>

        <div className="shell hero-content">
          <div className="hero-copy">
            <p className="eyebrow">Supporting Athletes With Purpose</p>
            <h1>Building champions through access, mentorship, and opportunity.</h1>
            <p className="hero-description">
              {heroSlides[currentIndex].description}. At Parwah Sports Charitable Trust, we support
              emerging talent with training, events, and a platform to grow.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button onClick={() => scrollToTarget('#what-we-do')}>Explore Our Work</Button>
              <Button variant="ghost" onClick={() => scrollToTarget('#get-involved')}>
                Get Involved
              </Button>
            </div>
          </div>

          <div className="hero-panel">
            <p className="hero-panel-kicker">Featured Focus</p>
            <h2>{heroSlides[currentIndex].title}</h2>
            <p>{heroSlides[currentIndex].description}</p>
            <div className="hero-dots">
              {heroSlides.map((slide, index) => (
                <button
                  key={slide.title}
                  type="button"
                  className={`hero-dot ${currentIndex === index ? 'is-active' : ''}`}
                  aria-label={`Go to slide ${index + 1}`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="what-we-do" className="section-block">
        <div className="shell">
          <div className="section-heading">
            <p className="eyebrow">What We Do</p>
            <h2>Empowering every athlete with the structure to move forward.</h2>
            <p>
              At Parwah Sports, our mission is to support athletes in reaching their full potential
              by helping them compete wherever they aspire. We provide training, career guidance in
              sports, and the resources they need to grow, ensuring every athlete gets a fair chance
              to shine.
            </p>
          </div>
          <div className="feature-grid">
            {whatWeDo.map((item, index) => (
              <Card key={item.title} className={`feature-card feature-card-${index + 1}`}>
                <div className="feature-badge">{`0${index + 1}`}</div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </Card>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button onClick={() => navigateTo('/what-we-do')}>Learn More About Our Initiatives</Button>
          </div>
        </div>
      </section>

      <section id="get-involved" className="section-block section-contrast">
        <div className="shell grid gap-10 lg:grid-cols-[1.3fr_0.9fr] lg:items-start">
          <div className="section-heading text-left">
            <p className="eyebrow">Concerning Parwah Sports Trust</p>
            <h2>Helping young talent with emotional, financial, and professional support.</h2>
            <p>
              At Parwah Sports Trust, we&apos;re committed to helping athletes reach their full
              potential. Our mission is to support and uplift young talent emotionally,
              financially, and professionally.
            </p>
            <div className="stacked-points">
              {trustPoints.map((item) => (
                <Card key={item.title} className="trust-card">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </Card>
              ))}
            </div>
          </div>

          <Card className="donation-panel">
            <p className="eyebrow">Support The Mission</p>
            <h2>Extend a Helping Hand, Donate Today!</h2>
            <p>
              Contributions help us create stronger access to coaching, equipment, and competitive
              opportunities for promising athletes.
            </p>
            <div className="donation-qr-wrap">
              <img src="/assets/QR.png" alt="Donate QR Code" className="donation-qr" />
            </div>
          </Card>
        </div>
      </section>

      <section id="resources" className="section-block">
        <div className="shell">
          <div className="section-heading">
            <p className="eyebrow">Resources</p>
            <h2>Access tools, guides, and materials to support your sports journey.</h2>
            <p>
              We keep practical materials and event information easy to browse so athletes,
              coaches, and supporters can stay connected to the work.
            </p>
          </div>
          <div className="resource-grid">
            {resources.map((resource) => (
              <Card key={resource.title} className="resource-card">
                <h3>{resource.title}</h3>
                <p>{resource.description}</p>
                <a
                  href={resource.href}
                  target={resource.href.endsWith('.pdf') ? '_blank' : undefined}
                  rel={resource.href.endsWith('.pdf') ? 'noreferrer' : undefined}
                  className="resource-link"
                >
                  {resource.cta}
                </a>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="committee" className="section-block section-contrast">
        <div className="shell">
          <div className="section-heading">
            <p className="eyebrow">Committee Members</p>
            <h2>Meet the people who help drive the mission forward.</h2>
            <p>
              Our committee supports community trust-building, event coordination, and athlete
              development across the organization.
            </p>
          </div>
          <div className="committee-grid">
            {committeeMembers.map((member) => (
              <Card key={member.id} className="committee-card">
                <div className="committee-photo-wrap">
                  <img src={member.image} alt={member.name} className="committee-photo" />
                </div>
                <h3>{member.name}</h3>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

function Footer() {
  return (
    <footer className="bg-muted py-12 border-t mt-auto">
      <div className="container mx-auto px-4 shell">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="animate-on-scroll">
            <ScrollLink href="/" className="flex items-center gap-2 mb-4 group">
              <img src="/assets/logo.png" alt="PSCT Logo" className="h-12 w-12 rounded-full object-cover" />
              <span className="font-bold text-xl group-hover:text-primary transition-colors">
                Parwah Sports Charitable Trust
              </span>
            </ScrollLink>
            <p className="text-sm text-muted-foreground mb-4">
              Promoting excellence in sports and fostering talent development since 1985.
            </p>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/share/18r2xWUuhF/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 hover-scale">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
                <span className="sr-only">Facebook</span>
              </a>

              <a href="https://www.instagram.com/parwahsports?igsh=dGI4N2s2OHBqOHVw" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 hover-scale">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
                <span className="sr-only">Instagram</span>
              </a>

              <a href="https://youtube.com/@parwahsports?si=wEYn4rUYIlsLPT_m" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 hover-scale">
                  <path d="M22.54 6.42a2.79 2.79 0 0 0-1.96-1.96C18.36 4 12 4 12 4s-6.36 0-8.58.46A2.79 2.79 0 0 0 1.46 6.42 29.94 29.94 0 0 0 1 12a29.94 29.94 0 0 0 .46 5.58 2.79 2.79 0 0 0 1.96 1.96C5.64 20 12 20 12 20s6.36 0 8.58-.46a2.79 2.79 0 0 0 1.96-1.96A29.94 29.94 0 0 0 23 12a29.94 29.94 0 0 0-.46-5.58zM10 15V9l6 3z" />
                </svg>
                <span className="sr-only">YouTube</span>
              </a>
            </div>
          </div>
          <div className="animate-on-scroll">
            <h3 className="font-medium text-lg mb-4 text-slate-900">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <ScrollLink href="/organization" className="text-sm text-muted-foreground hover:text-primary transition-colors">The Organization</ScrollLink>
              </li>
              <li>
                <ScrollLink href="/what-we-do" className="text-sm text-muted-foreground hover:text-primary transition-colors">What We Do</ScrollLink>
              </li>
              <li>
                <ScrollLink href="/footprint" className="text-sm text-muted-foreground hover:text-primary transition-colors">Our Footprint</ScrollLink>
              </li>
              <li>
                <ScrollLink href="/committee" className="text-sm text-muted-foreground hover:text-primary transition-colors">Committee</ScrollLink>
              </li>
              <li>
                <ScrollLink href="/partners" className="text-sm text-muted-foreground hover:text-primary transition-colors">Partners</ScrollLink>
              </li>
            </ul>
          </div>
          <div className="animate-on-scroll">
            <h3 className="font-medium text-lg mb-4 text-slate-900">Resources</h3>
            <ul className="space-y-2">
              <li>
                <ScrollLink href="/resources" className="text-sm text-muted-foreground hover:text-primary transition-colors">Training Materials</ScrollLink>
              </li>
              <li>
                <ScrollLink href="/calendar" className="text-sm text-muted-foreground hover:text-primary transition-colors">Event Calendar</ScrollLink>
              </li>
              <li>
                <ScrollLink href="/resources" className="text-sm text-muted-foreground hover:text-primary transition-colors">Publications</ScrollLink>
              </li>
              <li>
                <ScrollLink href="/resources" className="text-sm text-muted-foreground hover:text-primary transition-colors">Media Gallery</ScrollLink>
              </li>
            </ul>
          </div>
          <div className="animate-on-scroll">
            <h3 className="font-medium text-lg mb-4 text-slate-900">Legal</h3>
            <ul className="space-y-2">
              <li>
                <ScrollLink href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</ScrollLink>
              </li>
              <li>
                <ScrollLink href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms of Service</ScrollLink>
              </li>
              <li>
                <ScrollLink href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Code of Conduct</ScrollLink>
              </li>
              <li>
                <ScrollLink href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Anti-Doping Policy</ScrollLink>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Parwah Sports Charitable Trust. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground bg-slate-100 px-3 py-1 rounded-full">
            Admin access is reserved for authorized staff.
          </p>
        </div>
      </div>
    </footer>
  )
}

function AdminLoginPage({ onLogin, token }) {
  useEffect(() => {
    if (token) navigateTo('/admin')
  }, [token])

  return (
    <main className="auth-shell">
      <div className="auth-grid shell">
        <div className="auth-copy">
          <p className="eyebrow">Admin Access</p>
          <h1>Sign in to manage the sports academy platform.</h1>
          <p>
            This login is only for authorized admins. Public visitors should use the homepage to
            learn about the trust, its programs, and current initiatives.
          </p>
          <div className="mt-8">
            <Button variant="ghost" onClick={() => navigateTo('/')}>
              Back to Homepage
            </Button>
          </div>
        </div>
        <Login onLogin={onLogin} />
      </div>
    </main>
  )
}

function AdminRegisterPage({ onRegister, token }) {
  useEffect(() => {
    if (token) navigateTo('/admin')
  }, [token])

  return (
    <main className="auth-shell">
      <div className="auth-grid shell">
        <div className="auth-copy">
          <p className="eyebrow">Admin Registration</p>
          <h1>Create an admin account for the sports academy platform.</h1>
          <p>
            Register to access admin tools and manage the platform.
          </p>
          <div className="mt-8">
            <Button variant="ghost" onClick={() => navigateTo('/')}>
              Back to Homepage
            </Button>
          </div>
        </div>
        <Register onRegister={onRegister} />
      </div>
    </main>
  )
}

function AdminDashboard({ user, users, onLogout, isLoading, error }) {
  const [eventForm, setEventForm] = useState({
    title: '',
    description: '',
    eventDate: '',
    location: ''
  })
  const [creatingEvent, setCreatingEvent] = useState(false)
  const [eventError, setEventError] = useState('')

  const handleEventSubmit = async (e) => {
    e.preventDefault()
    setCreatingEvent(true)
    setEventError('')

    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(eventForm)
      })

      if (!response.ok) throw new Error('Failed to create event')

      // Reset form
      setEventForm({ title: '', description: '', eventDate: '', location: '' })
      alert('Event created successfully!')
    } catch (err) {
      console.error(err)
      setEventError('Failed to create event. Please try again.')
    } finally {
      setCreatingEvent(false)
    }
  }

  const handleEventChange = (e) => {
    setEventForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <main className="dashboard-shell shell">
      <div className="dashboard-header">
        <div>
          <p className="eyebrow">Admin Dashboard</p>
          <h1>Welcome back{user?.name ? `, ${user.name}` : ''}.</h1>
          <p>Dedicated admin tools can be added here later. For now, your protected area is live.</p>
        </div>
        <Button onClick={onLogout}>Sign Out</Button>
      </div>

      <div className="dashboard-grid">
        <Card className="dashboard-card">
          <p className="stat-label">Current Status</p>
          <h2>Protected route active</h2>
          <p>The admin route is secured by the existing token-based login flow.</p>
        </Card>

        <Card className="dashboard-card">
          <p className="stat-label">User Records</p>
          <h2>{isLoading ? 'Loading...' : users.length}</h2>
          <p>Connected to your existing `/api/users` endpoint.</p>
        </Card>
      </div>

      <Card className="dashboard-table-card">
        <div className="mb-4 flex items-center justify-between gap-4">
          <div>
            <p className="stat-label">Create Event</p>
            <h2 className="text-2xl font-semibold text-slate-950">Add new calendar event</h2>
          </div>
        </div>

        <form onSubmit={handleEventSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={eventForm.title}
              onChange={handleEventChange}
              required
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
            <textarea
              name="description"
              value={eventForm.description}
              onChange={handleEventChange}
              required
              rows={3}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Date & Time</label>
            <input
              type="datetime-local"
              name="eventDate"
              value={eventForm.eventDate}
              onChange={handleEventChange}
              required
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Location</label>
            <input
              type="text"
              name="location"
              value={eventForm.location}
              onChange={handleEventChange}
              required
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-500"
            />
          </div>
          <Button type="submit" disabled={creatingEvent}>
            {creatingEvent ? 'Creating...' : 'Create Event'}
          </Button>
        </form>
        {eventError ? <p className="text-sm text-rose-700 mt-4">{eventError}</p> : null}
      </Card>

      <Card className="dashboard-table-card">
        <div className="mb-4 flex items-center justify-between gap-4">
          <div>
            <p className="stat-label">Users</p>
            <h2 className="text-2xl font-semibold text-slate-950">Authenticated data preview</h2>
          </div>
        </div>

        {error ? <p className="text-sm text-rose-700">{error}</p> : null}

        <div className="space-y-3">
          {users.map((item) => (
            <div key={item.id} className="user-row">
              <div>
                <p className="font-semibold text-slate-950">{item.name}</p>
                <p className="text-sm text-slate-600">{item.email}</p>
              </div>
              <span className="user-badge">Active</span>
            </div>
          ))}

          {!isLoading && users.length === 0 && !error ? (
            <p className="text-sm text-slate-600">No users were returned from the API.</p>
          ) : null}
        </div>
      </Card>
    </main>
  )
}

export default function App() {
  const [path, setPath] = useState(getCurrentPath)
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(() => localStorage.getItem('token') || null)
  const [users, setUsers] = useState([])
  const [loadingUsers, setLoadingUsers] = useState(false)
  const [usersError, setUsersError] = useState('')

  useEffect(() => {
    const onPopState = () => setPath(getCurrentPath())
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  useEffect(() => {
    if (!token) {
      localStorage.removeItem('token')
      setUsers([])
      return
    }

    localStorage.setItem('token', token)
    fetchUsers(token)
  }, [token])

  async function fetchUsers(authToken) {
    setLoadingUsers(true)
    setUsersError('')

    try {
      const res = await fetch('/api/users', {
        headers: { Authorization: `Bearer ${authToken}` },
      })

      if (!res.ok) throw new Error('Failed to fetch users')

      const data = await res.json()
      setUsers(data)
    } catch (error) {
      console.error(error)
      setUsers([])
      setUsersError(error.message)
    } finally {
      setLoadingUsers(false)
    }
  }

  function handleLogin(authData) {
    setUser(authData.user)
    setToken(authData.token)
    navigateTo('/admin')
  }

  function logout() {
    setUser(null)
    setToken(null)
    setUsers([])
    setUsersError('')
    localStorage.removeItem('token')
    navigateTo('/')
  }

  useEffect(() => {
    if (path === '/admin' && !token) navigateTo('/admin/login')
  }, [path, token])

  const page = useMemo(() => {
    if (path === '/admin/login') {
      return <AdminLoginPage onLogin={handleLogin} token={token} />
    }

    if (path === '/admin/register') {
      return <AdminRegisterPage onRegister={handleLogin} token={token} />
    }

    if (path === '/admin') {
      if (!token) return null

      return (
        <AdminDashboard
          user={user}
          users={users}
          onLogout={logout}
          isLoading={loadingUsers}
          error={usersError}
        />
      )
    }

    if (path === '/contact') return <Contact />
    if (path === '/partners') return <Partners />
    if (path === '/footprint') return <Footprint />
    if (path === '/resources') return <Resources />
    if (path === '/get-involved') return <GetInvolved />
    if (path === '/committee') return <Committee />
    if (path === '/organization') return <Organization />
    if (path === '/what-we-do') return <WhatWeDo />
    if (path === '/calendar') return <Calendar />

    return <HomePage />
  }, [loadingUsers, path, token, user, users, usersError])

  const isPublicPage = !path.startsWith('/admin')

  return (
    <div className="app-shell">
      {isPublicPage ? <Header token={token} path={path} /> : null}
      {page}
      {isPublicPage ? <Footer /> : null}
    </div>
  )
}