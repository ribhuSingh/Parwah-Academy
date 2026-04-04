import React from 'react'

const Footprint = () => {
  const footprintData = [
    {
      icon: (
        <svg className="w-8 h-8 text-navy-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
      title: "150+ Athletes Supported",
      description: "Empowered through financial aid, training, and mentorship.",
    },
    {
      icon: (
        <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
        </svg>
      ),
      title: "25+ Schools & Academies Partnered",
      description: "Providing expert coaches and building strong sports programs.",
    },
    {
      icon: (
        <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: "10+ Districts Reached",
      description: "Actively working across Uttarakhand and surrounding regions.",
    },
    {
      icon: (
        <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4a4 4 0 014-4h.582a1 1 0 01.697.312l2.444 2.444A1 1 0 0011.5 16H14a4 4 0 004-4v-1.354a4 4 0 00-3.428-3.957l-1.15-.23A2 2 0 0012 6.5V5a2 2 0 00-2-2H6a2 2 0 00-2 2v1.5a2 2 0 001.85 1.974l1.15.23A4 4 0 0010 11.646V15a2 2 0 01-2 2H6a4 4 0 01-4-4z" />
        </svg>
      ),
      title: "National-Level Athletes Guided",
      description: "Helped multiple athletes reach state and national platforms.",
    },
    {
      icon: (
        <svg className="w-8 h-8 text-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      title: "Annual Sports Camps & Workshops",
      description: "Regular talent trials, awareness events, and training camps.",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 bg-gradient-to-b from-white to-gray-50">
        <div className="w-full max-w-7xl px-4 mx-auto">
          <h1 className="text-4xl font-bold text-center mt-10 mb-4">Our Footprint</h1>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            We're proud of the growing impact we've made in the world of sports. Through consistent efforts and strategic partnerships, we're transforming athletic dreams into reality.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {footprintData.map((item, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center hover:shadow-md transition-shadow">
                <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-full bg-navy-700/10">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <a href="/">
              <button className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-navy-700 text-white hover:bg-navy-800 h-10 px-6 py-2 transition-colors">
                Return to Home
              </button>
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Footprint