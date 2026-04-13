import React from 'react'

const WhatWeDo = () => {
  const initiatives = [
    {
      title: "School Sports Programs",
      subtitle: "Foundation Building",
      description: "Focusing on school students to build discipline, physical fitness, and sports skills from an early age, creating a strong base for future Indian athletes.",
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        </svg>
      ),
      colorClass: "bg-blue-50"
    },
    {
      title: "Rural Sports Development",
      description: "Identifying and nurturing talented athletes from rural and underprivileged areas by providing opportunities and exposure to help them succeed.",
      icon: (
        <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      colorClass: "bg-emerald-50"
    },
    {
      title: "Multi-Sport Training",
      description: "Promoting participation in Taekwondo, Athletics, Volleyball, Archery, Skating, Tennis, Badminton, Football, Basketball, Cricket, Kabaddi, Wrestling, Boxing, Gymnastics, Swimming, and more.",
      icon: (
        <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      colorClass: "bg-amber-50"
    },
    {
      title: "Science-Based Training",
      description: "Following a science-based approach focusing on proper techniques, structured progression, biomechanics, and performance development.",
      icon: (
        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      colorClass: "bg-purple-50"
    },
    {
      title: "Strength & Conditioning",
      description: "Guiding athletes through strength training, endurance development, flexibility, speed, and injury prevention programs to build a strong athletic base.",
      icon: (
        <svg className="w-6 h-6 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      colorClass: "bg-rose-50"
    },
    {
      title: "Nutrition & Diet",
      description: "Providing basic diet awareness and guidance to help athletes maintain proper energy levels, recovery, and overall health.",
      icon: (
        <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      colorClass: "bg-orange-50"
    },
    {
      title: "Medical & Athlete Care",
      description: "Promoting basic medical support, injury prevention awareness, and recovery guidance to ensure safe training and long-term well-being.",
      icon: (
        <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      colorClass: "bg-red-50"
    },
    {
      title: "Development Pathway",
      description: "Supporting athletes through a structured pathway from school level to district, state, national, and international competitions.",
      icon: (
        <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      colorClass: "bg-indigo-50"
    },
    {
      title: "Competition Focus",
      description: "Encouraging and preparing athletes to participate in high-level competitions, helping them gain valuable exposure and experience.",
      icon: (
        <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
      colorClass: "bg-yellow-50"
    },
    {
      title: "Community Growth",
      description: "Through camps, workshops, and awareness programs, we promote the importance of sports, fitness, and healthy lifestyles among youth.",
      icon: (
        <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      colorClass: "bg-teal-50"
    }
  ]

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <main className="flex-1 pb-20">
        
        {/* Header Section */}
        <section className="w-full max-w-3xl px-4 mx-auto pt-20 pb-16 text-center">
          <p className="text-sm font-bold text-navy-700 tracking-widest uppercase mb-4 eyebrow">Our Mission</p>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 font-serif">What We Do</h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            <span className="font-semibold text-slate-900">PSCT – Parwah Sports Charitable Trust</span> works to promote sports participation, athlete development, and healthy lifestyles among students and young athletes. We focus on building strong foundations in sports through structured training programs, school partnerships, and athlete support initiatives.
          </p>
        </section>

        {/* Initiatives Grid */}
        <section className="w-full max-w-7xl px-4 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {initiatives.map((item, index) => (
              <div 
                key={index} 
                className="bg-white rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-100 p-8 flex flex-col h-full relative overflow-hidden group"
              >
                {/* Icon Container */}
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 ${item.colorClass}`}>
                  {item.icon}
                </div>
                
                {/* Text Content */}
                <div className="flex-grow">
                  <h3 className="text-xl font-bold text-slate-900 mb-3 font-serif leading-tight">
                    {item.title}
                  </h3>
                  
                  {item.subtitle && (
                    <span className="inline-block px-3 py-1 bg-navy-50 text-navy-700 text-xs font-bold rounded-full mb-4">
                      {item.subtitle}
                    </span>
                  )}
                  
                  <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Back Button */}
        <div className="text-center mt-20">
          <a href="/">
            <button className="inline-flex items-center justify-center rounded-lg text-sm font-medium bg-slate-900 text-white hover:bg-slate-800 h-11 px-8 transition-colors shadow-sm hover:shadow">
              Return to Home
            </button>
          </a>
        </div>

      </main>
    </div>
  )
}

export default WhatWeDo