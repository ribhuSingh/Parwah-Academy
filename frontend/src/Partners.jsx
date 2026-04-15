import React, { useState, useMemo, useEffect } from 'react';

const Committee = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    const fetchCommittee = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch('/api/committee');
        if (!res.ok) throw new Error('Failed to fetch committee members');
        const data = await res.json();
        setMembers(data);
      } catch (err) {
        console.error(err);
        setError('Failed to load committee members. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCommittee();
  }, []);

  const categories = useMemo(() => {
    const uniqueCategories = new Set(members.map(member => member.category));
    return ["All", ...Array.from(uniqueCategories)];
  }, [members]);

  const filteredMembers = useMemo(() => {
    if (activeCategory === "All") {
      return members;
    }
    return members.filter(member => member.category === activeCategory);
  }, [activeCategory, members]);

  if (loading) {
    return <div className="text-center py-12 text-lg text-gray-600">Loading committee...</div>;
  }

  if (error) {
    return <div className="text-center py-12 text-lg text-red-600">{error}</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="bg-gradient-to-b from-navy-700 to-blue-800 text-white py-16 md:py-20 text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-5xl font-extrabold tracking-tight mb-6">Our Committee</h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Meet the dedicated leaders, coaches, and advisors who guide our mission and support our athletes.
            </p>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            {/* Category Filters */}
            <div className="flex justify-center flex-wrap gap-2 mb-10">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors ${
                    activeCategory === category
                      ? 'bg-navy-700 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Committee Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {filteredMembers.length === 0 ? (
                <p className="col-span-full text-center text-gray-500">No members found for this category.</p>
              ) : (
                filteredMembers.map((member) => (
                  <div
                    key={member._id} 
                    className="bg-white border rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 flex flex-col items-center text-center"
                  >
                    {/* 🔥 CHANGED: Replaced h-56 with aspect-square */}
                    <div className="aspect-square w-full relative bg-gray-100 flex items-center justify-center">
                      {member.imageUrl ? (
                        <img
                          src={member.imageUrl}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        /* SVG Fallback for missing images */
                        <svg className="w-24 h-24 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      )}
                    </div>

                    {/* Card Content */}
                    <div className="p-6 flex-1 flex flex-col items-center">
                      <span className="bg-navy-700/10 text-navy-700 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                        {member.category || 'Uncategorized'}
                      </span>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                      <p className="text-blue-600 font-medium text-sm mb-4">{member.role}</p>
                      <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Committee;