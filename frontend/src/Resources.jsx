import React from 'react'

const Resources = () => {
  const resources = [
    {
      icon: (
        <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      title: "Your Generosity – Financial Support",
      description: "From scholarships to competition fees, your contribution helps us break barriers and make dreams possible.",
      callToAction: "Be a part of their journey.",
    },
    {
      icon: (
        <svg className="w-8 h-8 text-navy-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      ),
      title: "The Right Tools – Facilities & Equipment",
      description: "We provide athletes access to world-class training and tools they need to perform at their best.",
      callToAction: "Help them train like champions.",
    },
    {
      icon: (
        <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Guiding Lights – Coaches & Mentors",
      description: "Our expert mentors go beyond training—they become the backbone of every athlete's journey.",
      callToAction: "Become a guiding light.",
    },
    {
      icon: (
        <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: "Stronger Together – Collaborations",
      description: "We work with schools and organizations to build a powerful support network.",
      callToAction: "Join our network and be the change.",
    },
    {
      icon: (
        <svg className="w-8 h-8 text-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: "Smart Training – Tech & Data Tools",
      description: "From apps to video analysis, we equip athletes with tools to track and improve performance.",
      callToAction: "Empower them with knowledge and tech.",
    },
  ]

  const supportCards = [
    {
      title: "Donate & Support",
      description: "Every penny you contribute supports an athlete's growth—from travel to equipment.",
      action: "Donate today, change a life forever.",
    },
    {
      title: "Give the Gift of Equipment",
      description: "Even a pair of shoes or a new racket can make a difference in someone's journey.",
      action: "Help them play, help them win.",
    },
    {
      title: "Volunteer Your Expertise",
      description: "Your time and knowledge can help shape the future of an aspiring athlete.",
      action: "Become a mentor, change a life.",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 bg-gradient-to-b from-white to-gray-50 py-16 md:py-24">
        <div className="w-full max-w-7xl px-4 mx-auto">
          <h1 className="text-4xl font-bold text-center mb-4">
            Our Resources – The Heartbeat of Every Athlete's Journey
          </h1>
          <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
            At Parwah Sports Trust, we know that it's not just about providing resources—it's about investing in people. Every piece of equipment, every coach, every dollar raised is a step toward helping a young athlete dream bigger, push harder, and achieve the impossible.
          </p>

          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
            {resources.map((resource, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow text-center">
                <div className="w-12 h-12 mb-4 mx-auto flex items-center justify-center rounded-full bg-navy-700/10">
                  {resource.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{resource.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{resource.description}</p>
                {resource.callToAction && <p className="text-sm font-medium text-navy-700">{resource.callToAction}</p>}
              </div>
            ))}
          </section>

          <h2 className="text-2xl font-bold text-center mb-6">How You Can Be Part of This Change</h2>
          <section className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
            {supportCards.map((card, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow text-center">
                <h4 className="text-lg font-semibold mb-2">{card.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{card.description}</p>
                <p className="text-sm font-medium text-navy-700">{card.action}</p>
              </div>
            ))}
          </section>

          <div className="text-center">
            <p className="text-lg font-medium mb-4">
              Because at Parwah Sports Trust, we don't just provide resources—we create opportunities and build futures.
            </p>
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

export default Resources