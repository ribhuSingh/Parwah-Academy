import React, { useEffect, useMemo, useState } from 'react'
import Login from './Login'
import Button from './components/ui/button'
import Card from './components/ui/card'
import Contact from './Contact'
import Gallery from './Gallery'
import Footprint from './Footprint'
import GetInvolved from './GetInvolved'
import Committee from './Partners'
import Organization from './Organization'
import WhatWeDo from './WhatWeDo'
import Calendar from './Calendar'
import AdminGalleryManager from './AdminGalleryManager'
import Register from './Register'

const navigationLinks = [
  { href: '/about', label: 'About Us' },
  { href: '/programs', label: 'Our Programs' },
  { href: '/calendar', label: 'Upcoming Events' }, // Added this line
  { href: '/impact', label: 'Our Impact' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/team', label: 'Our Team' },
  { href: '/get-involved', label: 'Get Involved' },
  { href: '/contact', label: 'Contact' },
]

const heroSlides = [
  {
    src: '/assets/C1.jpeg',
    alt: 'Young athletes training together',
    title: 'Nurturing Talent',
    description: 'Empowering young athletes to achieve their full potential',
  },
  {
    src: '/assets/C2.jpg',
    alt: 'Community sports event',
    title: 'Community Engagement',
    description: 'Building a strong sports culture from the grassroots up',
  },
  {
    src: '/assets/P5.jpeg',
    alt: 'Taekwondo Championship 2025',
    title: 'Sports Event',
    description: 'Creating positive change through sports',
  },
]

const homePagePrograms = [
  {
    title: 'School & Grassroots Programs',
    description:
      'Identifying and nurturing young talent at the school level through structured training programs.',
  },
  {
    title: 'Science-Based Training',
    description:
      'Promoting modern training methods, strength & conditioning, and nutrition awareness for peak performance.',
  },
  {
    title: 'Rural Talent Identification',
    description:
      'Discovering and supporting talented athletes from rural and underprivileged communities.',
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

const homePageResources = [
  {
    title: 'Our Gallery',
    description:
      'See our athletes in action, from training sessions to competitive events.',
    cta: 'View Gallery',
    href: '/gallery',
  },
  {
    title: 'Event Calendar',
    description:
      'Upcoming competitions, training camps, workshops, and community events.',
    cta: 'View Calendar',
    href: '/calendar', // This remains the same
  },
  {
    title: 'Get Involved',
    description:
      'Partner with us, volunteer, or support our mission to empower young athletes.',
    cta: 'Join Our Mission',
    href: '/get-involved',
  },
]

const homePageCommitteeMembers = [
  { id: 1, image: '/assets/M2.jpeg', name: 'Haider Ali Choudhary', role: 'Founder / President' },
  { id: 2, image: '/assets/M4.jpeg', name: 'Ritik Singh', role: 'Head Coach' },
  { id: 3, image: '/assets/M1.jpeg', name: 'M. Mustkeem Ansari', role: 'National Coach' },
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
    <header className="site-header sticky top-0 z-50 bg-white shadow-sm">
      <div className="shell flex items-center justify-between gap-8 py-3">
        
        {/* Brand Section - Leftmost */}
        <button
          type="button"
          className="brand-mark flex-shrink-0 flex items-center gap-3"
          onClick={() => {
            setMenuOpen(false)
            navigateTo('/')
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
        >
          <img src="/assets/logo.png" alt="Parwah Sports logo" className="h-12 w-12 rounded-full object-cover shadow-sm" />
          <div className="text-left hidden sm:block">
            <p className="brand-kicker text-xs font-bold text-blue-600 uppercase tracking-wider">Parwah Sports</p>
            <p className="brand-title text-sm font-semibold text-slate-900">Charitable Trust</p>
          </div>
        </button>

        {/* Navigation - Hidden on mobile, shown on lg screens */}
        <nav className="hidden items-center gap-6 lg:flex flex-1 justify-center">
          {navigationLinks.map((link) => {
            const active = isActivePath(link.href);
            return (
              <ScrollLink 
                key={link.href} 
                href={link.href} 
                className={`nav-link text-sm font-medium transition-colors duration-200 py-2 border-b-2 ${
                  active 
                    ? 'text-blue-600 border-blue-600' 
                    : 'text-gray-600 border-transparent hover:text-blue-600'
                }`}
              >
                {link.label}
              </ScrollLink>
            )
          })}
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
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-40">
                {token ? ( // If token exists, show admin options
                  <>
                    <button
                      onClick={() => {
                        setAdminDropdownOpen(false);
                        navigateTo('/admin/gallery');
                      }}
                      className="block w-full text-left px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors border-b border-gray-200"
                    >
                      Manage Gallery
                    </button>
                    <button
                      onClick={() => {
                        setAdminDropdownOpen(false);
                        navigateTo('/admin');
                      }}
                      className="block w-full text-left px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Admin Panel
                    </button>
                  </>
                ) : ( // If no token, show login/register
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
          className="menu-toggle lg:hidden flex flex-col gap-1 p-2"
          aria-label="Toggle navigation"
          onClick={() => setMenuOpen((current) => !current)}
        >
          <span className={`block w-6 h-0.5 bg-slate-900 transition-transform ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
          <span className={`block w-6 h-0.5 bg-slate-900 transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-slate-900 transition-transform ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu - shown only on mobile when open */}
      {menuOpen ? (
        <div className="shell pb-4 lg:hidden border-t border-gray-200 bg-white">
          <div className="mobile-panel flex flex-col pt-2">
            {navigationLinks.map((link) => {
              const active = isActivePath(link.href);
              return (
                <ScrollLink
                  key={link.href}
                  href={link.href}
                  className={`mobile-link block w-full px-4 py-3 text-sm font-medium transition-colors ${
                    active 
                      ? 'text-blue-600 bg-blue-50 border-l-4 border-blue-600' 
                      : 'text-gray-700 border-l-4 border-transparent hover:bg-gray-50'
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </ScrollLink>
              )
            })}
            
            {/* Mobile Admin Buttons */}
            <div className="pt-4 border-t border-gray-200 mt-2 flex flex-col gap-3 px-4">
              {token ? (
                <> 
                  <Button 
                    onClick={() => { setMenuOpen(false); navigateTo('/admin/gallery'); }}
                    className="w-full text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Manage Gallery
                  </Button>
                  <Button 
                    onClick={() => { setMenuOpen(false); navigateTo('/admin'); }}
                    className="w-full text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Admin Panel
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    variant="ghost" 
                    onClick={() => { setMenuOpen(false); navigateTo('/admin/login'); }}
                    className="w-full text-sm font-semibold border border-gray-300"
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
  const [copied, setCopied] = useState(false)

  const upiId = "SBIBHIM.INSTANT48341608853913160@sbipay"

  const handleCopy = async () => {
    await navigator.clipboard.writeText(upiId)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  useEffect(() => {
    // Wake up the server by making a lightweight API call on initial load
    fetch('/api/gallery').catch((err) => console.error('Failed to wake up server:', err))
  }, [])

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
            {homePagePrograms.map((item, index) => (
              <Card key={item.title} className={`feature-card feature-card-${index + 1}`}>
                <div className="feature-badge">{`0${index + 1}`}</div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </Card>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button onClick={() => navigateTo('/programs')}>Learn More About Our Initiatives</Button>
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
<Card className="max-w-md mx-auto p-6 rounded-2xl shadow-xl bg-[#0b1220] text-white">

  {/* Header */}
  <p className="text-xs font-semibold text-orange-400 uppercase tracking-widest">
    Support the Mission
  </p>

  <h2 className="text-2xl font-bold mt-2 text-slate-300 leading-tight">
    Extend a Helping Hand, <br /> Donate Today!
  </h2>

  <p className="text-sm text-slate-300 mt-3 leading-relaxed">
    Contributions help us create stronger access to coaching, equipment, and
    competitive opportunities for promising athletes.
  </p>

  {/* QR (BIGGER + CLEAN FRAME) */}
  <div className="mt-6 flex justify-center">
    <div className="bg-white p-4 rounded-2xl">
      <img
        src="/assets/image.png"
        alt="QR Code"
        className="w-64 h-64 sm:w-72 sm:h-72 rounded-xl"
      />
    </div>
  </div>

  <p className="text-center text-sm text-slate-400 mt-3">
    Scan using any UPI app
  </p>

  {/* UPI ID */}
  <div className="mt-5 bg-white/10 rounded-xl px-3 py-3 flex items-center justify-between gap-3">
    
    <span className="font-mono text-xs sm:text-sm break-all leading-snug">
      {upiId}
    </span>

    <button
      onClick={handleCopy}
      className={`text-xs font-semibold px-2 py-1 rounded-md transition ${
        copied
          ? "text-green-400 bg-green-500/10"
          : "text-blue-400 hover:bg-white/10"
      }`}
    >
      {copied ? "Copied ✓" : "Copy"}
    </button>

  </div>

  {/* Divider */}
  <div className="my-5 border-t border-white/10" />

  {/* Bank Details */}
  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
    <p className="text-sm font-semibold mb-3">
      Or transfer directly
    </p>

    <div className="space-y-3 text-sm">
      <div className="flex justify-between">
        <span className="text-slate-400">Account No</span>
        <span className="font-mono font-semibold">43680897130</span>
      </div>

      <div className="flex justify-between">
        <span className="text-slate-400">IFSC Code</span>
        <span className="font-mono font-semibold">SBIN0004530</span>
      </div>
    </div>
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
            {homePageResources.map((resource) => (
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
            {homePageCommitteeMembers.map((member) => (
              <Card key={member.id} className="committee-card">
                <div className="committee-photo-wrap">
                  <img src={member.image} alt={member.name} className="committee-photo" />
                </div>
                <h3>{member.name}</h3>
                <p className="text-sm text-slate-500">{member.role}</p>
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
              <li> {/* New: About Us */}
                <ScrollLink href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About Us</ScrollLink>
              </li>
              <li> {/* New: Our Programs */}
                <ScrollLink href="/programs" className="text-sm text-muted-foreground hover:text-primary transition-colors">Our Programs</ScrollLink>
              </li>
              <li> {/* New: Our Impact */}
                <ScrollLink href="/impact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Our Impact</ScrollLink>
              </li>
              <li> {/* New: Our Team */}
                <ScrollLink href="/team" className="text-sm text-muted-foreground hover:text-primary transition-colors">Our Team</ScrollLink>
              </li>
              <li> {/* New: Gallery */}
                <ScrollLink href="/gallery" className="text-sm text-muted-foreground hover:text-primary transition-colors">Gallery</ScrollLink>
              </li>
            </ul>
          </div>
          <div className="animate-on-scroll">
            <h3 className="font-medium text-lg mb-4 text-slate-900">Resources</h3>
            <ul className="space-y-2">
              <li> {/* New: Get Involved */}
                <ScrollLink href="/get-involved" className="text-sm text-muted-foreground hover:text-primary transition-colors">Get Involved</ScrollLink>
              </li>
              <li>
                <ScrollLink href="/calendar" className="text-sm text-muted-foreground hover:text-primary transition-colors">Event Calendar</ScrollLink>
              </li> {/* New: Contact Us */}
              <li>
                <ScrollLink href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact Us</ScrollLink>
              </li> {/* New: Media Gallery (links to Gallery) */}
              <li>
                <ScrollLink href="/gallery" className="text-sm text-muted-foreground hover:text-primary transition-colors">Media Gallery</ScrollLink>
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

    if (path === '/admin/gallery') {
      if (!token) return null
      return <AdminGalleryManager token={token} /> // Ensure token is passed
    }
    if (path === '/contact') return <Contact />
    if (path === '/gallery') return <Gallery />
    if (path === '/impact') return <Footprint />
    // if (path === '/resources') return <Resources /> // Removed
    if (path === '/get-involved') return <GetInvolved />
    if (path === '/team') return <Committee />
    if (path === '/about') return <Organization />
    if (path === '/programs') return <WhatWeDo />
    if (path === '/calendar') return <Calendar />

    return <HomePage />
  }, [loadingUsers, path, token, user, users, usersError])

const isPublicPage = !path.startsWith('/admin')
  const isAuthPage = path === '/admin/login' || path === '/admin/register'

  return (
    <div className="app-shell">
      {/* Shows on public pages AND admin dashboard, but hides on login/register */}
      {!isAuthPage ? <Header token={token} path={path} /> : null}
      {page}
      {isPublicPage ? <Footer /> : null}
    </div>
  )
}