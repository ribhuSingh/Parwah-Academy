import React from 'react'

const Committee = () => {
  const [committeeMembers, setCommitteeMembers] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState('')

  React.useEffect(() => {
    async function loadCommittee() {
      try {
        const response = await fetch('/api/committee')
        if (!response.ok) throw new Error('Could not load committee members')
        const data = await response.json()
        setCommitteeMembers(data)
      } catch (err) {
        console.error(err)
        setError('Unable to load committee members right now.')
      } finally {
        setLoading(false)
      }
    }

    loadCommittee()
  }, [])

  const fallbackMembers = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      role: "President",
      bio: "Dr. Johnson is a former Olympic athlete with over 20 years of experience in sports administration. She has led the federation since 2018 and has been instrumental in expanding our international presence.",
      email: "president@sportsfederation.org",
      linkedin: "#",
      twitter: "#",
      featured: true,
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Vice President",
      bio: "With a background in sports medicine and business administration, Michael oversees our athlete development programs and strategic partnerships.",
      email: "vp@sportsfederation.org",
      linkedin: "#",
      twitter: "#",
      featured: true,
    },
    {
      id: 3,
      name: "Elena Rodriguez",
      role: "Secretary General",
      bio: "Elena brings extensive experience in international sports governance and has represented our federation at global sporting events for over a decade.",
      email: "secretary@sportsfederation.org",
      linkedin: "#",
      twitter: "#",
      featured: true,
    },
    {
      id: 4,
      name: "James Wilson",
      role: "Treasurer",
      bio: "A certified accountant with a passion for sports, James manages our financial operations and ensures transparency in all our financial dealings.",
      email: "treasurer@sportsfederation.org",
      linkedin: "#",
      featured: false,
    },
    {
      id: 5,
      name: "Dr. Amara Okafor",
      role: "Medical Director",
      bio: "Dr. Okafor leads our medical team, focusing on athlete health, injury prevention, and developing sports medicine protocols.",
      email: "medical@sportsfederation.org",
      linkedin: "#",
      featured: false,
    },
    {
      id: 6,
      name: "Robert Kim",
      role: "Technical Director",
      bio: "Robert oversees competition rules, technical standards, and equipment regulations across all our sporting disciplines.",
      email: "technical@sportsfederation.org",
      linkedin: "#",
      twitter: "#",
      featured: false,
    },
    {
      id: 7,
      name: "Sophia Patel",
      role: "Youth Development Director",
      bio: "Sophia leads our initiatives to discover and nurture young talent, creating pathways from grassroots to elite competition.",
      email: "youth@sportsfederation.org",
      twitter: "#",
      featured: false,
    },
    {
      id: 8,
      name: "David Thompson",
      role: "Communications Director",
      bio: "With a background in sports journalism, David manages our media relations, public communications, and digital presence.",
      email: "communications@sportsfederation.org",
      linkedin: "#",
      twitter: "#",
      featured: false,
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="bg-gradient-to-b from-navy-700 to-blue-800 text-white py-16 md:py-20 text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold tracking-tight mb-4">Our Committee</h1>
            <p className="text-white/90 text-lg mb-6">
              Meet the dedicated team of professionals who lead our federation and drive our mission forward.
            </p>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            {/* Executive Committee */}
            <div className="mb-16">
              <h2 className="text-2xl font-bold mb-8 inline-block relative">
                Executive Committee
                <span className="absolute bottom-0 left-0 w-1/2 h-1 bg-gold-400"></span>
              </h2>
              {loading && <p className="text-center text-slate-500 mb-4">Loading committee...</p>}
              {error && <p className="text-center text-red-500 mb-4">{error}</p>}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {(committeeMembers.length ? committeeMembers : fallbackMembers)
                  .filter((m) => m.featured)
                  .map((member) => (
                    <div key={member.id} className="bg-white rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                      <div className="relative h-64 bg-gray-200 flex items-center justify-center">
                        <span className="text-4xl font-bold text-gray-500">{member.name.split(' ').map(n => n[0]).join('')}</span>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                        <p className="text-navy-700 font-medium mb-4">{member.role}</p>
                        <p className="text-gray-500 text-sm mb-4">{member.bio}</p>
                        <div className="flex space-x-3">
                          {member.email && (
                            <a
                              href={`mailto:${member.email}`}
                              className="text-gray-500 hover:text-navy-700 transition-colors"
                            >
                              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                              </svg>
                              <span className="sr-only">Email</span>
                            </a>
                          )}
                          {member.linkedin && (
                            <a
                              href={member.linkedin}
                              className="text-gray-500 hover:text-navy-700 transition-colors"
                            >
                              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                              </svg>
                              <span className="sr-only">LinkedIn</span>
                            </a>
                          )}
                          {member.twitter && (
                            <a
                              href={member.twitter}
                              className="text-gray-500 hover:text-navy-700 transition-colors"
                            >
                              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                              </svg>
                              <span className="sr-only">Twitter</span>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Board Members */}
            <div>
              <h2 className="text-2xl font-bold mb-8 inline-block relative">
                Board Members
                <span className="absolute bottom-0 left-0 w-1/2 h-1 bg-navy-700"></span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {(committeeMembers.length ? committeeMembers : fallbackMembers)
                  .filter((m) => !m.featured)
                  .map((member) => (
                    <div key={member.id} className="bg-white rounded-lg overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                      <div className="relative h-48 bg-gray-200 flex items-center justify-center">
                        <span className="text-2xl font-bold text-gray-500">{member.name.split(' ').map(n => n[0]).join('')}</span>
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-bold mb-1">{member.name}</h3>
                        <p className="text-navy-700 font-medium text-sm mb-3">{member.role}</p>
                        <p className="text-gray-500 text-sm mb-3">{member.bio}</p>
                        <div className="flex space-x-3">
                          {member.email && (
                            <a
                              href={`mailto:${member.email}`}
                              className="text-gray-500 hover:text-navy-700 transition-colors"
                            >
                              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                              </svg>
                              <span className="sr-only">Email</span>
                            </a>
                          )}
                          {member.linkedin && (
                            <a
                              href={member.linkedin}
                              className="text-gray-500 hover:text-navy-700 transition-colors"
                            >
                              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                              </svg>
                              <span className="sr-only">LinkedIn</span>
                            </a>
                          )}
                          {member.twitter && (
                            <a
                              href={member.twitter}
                              className="text-gray-500 hover:text-navy-700 transition-colors"
                            >
                              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                              </svg>
                              <span className="sr-only">Twitter</span>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Committee