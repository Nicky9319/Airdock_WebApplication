import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    const [agents, setAgents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [categories, setCategories] = useState(['All']);
    
    const serverIpAddress = import.meta.env.VITE_SERVER_IP_ADDRESS;
    console.log('Server IP Address from .env:', serverIpAddress); // For verification


    useEffect(() => {
        const fetchAgents = async () => {
            try {
                const response = await fetch(`http://${serverIpAddress}:11000/Agents/GetAllAgentsInfo`);
                let data = await response.json();
                setAgents(data);
                const uniqueCategories = ['All', ...new Set(data.map(agent => agent.CATEGORY))];
                setCategories(uniqueCategories);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching agents data:', error);
                setLoading(false);
            }
        };

        fetchAgents();
    }, []);

    const filteredAgents = agents.filter(agent => {
        const matchesSearch =
            agent.NAME.toLowerCase().includes(searchTerm.toLowerCase()) ||
            agent.DESCRIPTION.toLowerCase().includes(searchTerm.toLowerCase()) ||
            agent.CATEGORY.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || agent.CATEGORY === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="bg-[#121317] min-h-screen w-full text-[#F9FAFB] font-sans overflow-x-hidden">
            <div className="relative bg-cover bg-center" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1920&auto=format&fit=crop")' }}>
                <div className="absolute inset-0 bg-gradient-to-t from-[#121317] to-transparent"></div>
                <div className="relative z-10 max-w-4xl mx-auto px-4 py-20 text-center">
                    <img
                        src="https://img.icons8.com/fluency/240/000000/artificial-intelligence.png"
                        alt="Marketplace Icon"
                        className="mx-auto mb-6 w-20 h-20 rounded-lg shadow-lg"
                    />
                    <h1 className="text-4xl lg:text-5xl font-bold mb-5 drop-shadow-md">AI Agent App Store</h1>
                    <p className="text-lg lg:text-xl mb-10 text-[#F9FAFB] max-w-3xl mx-auto drop-shadow-sm">
                        Discover and deploy powerful AI agents to transform your workflow, enhance productivity, and solve complex problems with ease
                    </p>
                    <div className="relative flex max-w-2xl mx-auto mt-10 bg-[#1D1F24] border border-[rgba(156,163,175,0.1)] rounded-full overflow-hidden shadow-lg">
                        <input
                            type="text"
                            placeholder="Search for AI agents, tools, or capabilities..."
                            className="flex-1 py-4 px-6 text-lg bg-[#1D1F24] text-[#F9FAFB] outline-none"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button className="bg-[#0EA5E9] text-[#F9FAFB] py-4 px-8 font-bold text-lg transition">
                            Search
                        </button>
                    </div>
                </div>
            </div>

            <div className="w-full mx-auto py-10 px-6">
                {loading ? (
                    <div className="flex flex-col justify-center items-center h-96">
                        <div className="w-12 h-12 border-4 border-gray-300 border-t-[#6366F1] rounded-full animate-spin mb-5"></div>
                        <div className="text-gray-500 text-lg">Loading AI agents...</div>
                    </div>
                ) : (
                    <>
                        <div className="flex flex-wrap gap-2 mb-8 py-2 overflow-x-auto">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                                        selectedCategory === category
                                            ? 'bg-[#6366F1] text-[#F9FAFB] shadow-md'
                                            : 'bg-[rgba(156,163,175,0.1)] text-[#9CA3AF]'
                                    }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>

                        <div className="flex justify-between items-center mt-2 mb-8 py-5 border-b border-[rgba(156,163,175,0.1)]">
                            <div className="text-xl font-bold text-[#F9FAFB]">
                                {filteredAgents.length} AI Agents Available
                            </div>
                            <div className="flex items-center gap-2 text-sm text-[#9CA3AF]">
                                <span>Sort by:</span>
                                <select className="bg-[#1D1F24] text-[#F9FAFB] border border-[rgba(156,163,175,0.2)] rounded px-2 py-1">
                                    <option>Popularity</option>
                                    <option>Price: Low to High</option>
                                    <option>Price: High to Low</option>
                                    <option>Rating</option>
                                </select>
                            </div>
                        </div>

                        {filteredAgents.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                                {filteredAgents.map((agent) => (
                                    <Link to={`/agent/${agent.ID}`} key={agent.ID}>
                                        <div
                                            className="bg-[#1D1F24] rounded-2xl shadow hover:-translate-y-2 hover:shadow-xl transition-transform cursor-pointer"
                                        >
                                            <div className="relative h-44 overflow-hidden">
                                                <img src={agent.AGENT_IMAGE} alt={agent.NAME} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                                                <div className="absolute top-3 left-3 bg-[rgba(18,19,23,0.75)] text-[#F9FAFB] px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 border border-[rgba(156,163,175,0.1)]">
                                                    <span>⚙️</span> {agent.CATEGORY}
                                                </div>
                                                <div className="absolute top-3 right-3 bg-[rgba(18,19,23,0.75)] text-[#FBBF24] px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1	border border-[rgba(156,163,175,0.1)]">
                                                    <span>★</span> {agent.RATING}
                                                </div>
                                            </div>
                                            <div className="p-6 flex flex-col flex-grow">
                                                <h3 className="text-lg font-bold mb-3 text-[#F9FAFB]">{agent.NAME}</h3>
                                                <p className="text-sm mb-5 text-[#9CA3AF] flex-grow">{agent.DESCRIPTION}</p>
                                                <div className="flex flex-wrap gap-2 mb-5">
                                                    {agent.TAGS.map((tag, idx) => (
                                                        <span key={idx} className="bg-[rgba(156,163,175,0.1)] px-3 py-1 rounded text-xs text-[#9CA3AF]">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between border-t border-[rgba(156,163,175,0.1)] px-6 py-4 bg-[rgba(18,19,23,0.4)]">
                                                <div className="font-bold text-xl text-[#0EA5E9]">${agent.PRICE}</div>
                                                <div className="bg-[#6366F1] text-[#F9FAFB] rounded-lg py-2 px-4	font-bold text-sm">
                                                    Get Agent
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-24 text-[#9CA3AF] text-lg flex flex-col items-center gap-5">
                                <div className="text-5xl">🔍</div>
                                <div>No AI agents found matching your search criteria.</div>
                                <div>Try different keywords or browse all categories.</div>
                            </div>
                        )}
                    </>
                )}
            </div>

            <div className="border-t border-[rgba(156,163,175,0.1)] py-8 text-center text-[#9CA3AF] text-sm">
                © 2023 AirDock AI Marketplace. All rights reserved.
            </div>
        </div>
    );
};

export default HomePage;
