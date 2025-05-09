import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft, FaStar, FaTag, FaCalendarAlt, FaCodeBranch, FaList } from 'react-icons/fa';

const AgentPage = () => {
    const { agentId } = useParams();
    const [agent, setAgent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAgentData = async () => {
            try {
                const response = await fetch('/src/Views/Agent Page/agentData.json');
                let agents = await response.json();
                
                const selectedAgent = agents.find(a => a.ID === agentId);
                
                if (selectedAgent) {
                    setAgent(selectedAgent);
                } else {
                    setError('Agent not found');
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching agent data:', error);
                setError('Failed to load agent data');
                setLoading(false);
            }
        };

        fetchAgentData();
    }, [agentId]);

    if (loading) {
        return (
            <div className="bg-[#121317] min-h-screen text-[#F9FAFB] p-6 flex justify-center items-center">
                <div className="flex flex-col items-center">
                    <div className="w-12 h-12 border-4 border-gray-300 border-t-[#6366F1] rounded-full animate-spin mb-4"></div>
                    <p className="text-[#9CA3AF]">Loading agent information...</p>
                </div>
            </div>
        );
    }

    if (error || !agent) {
        return (
            <div className="bg-[#121317] min-h-screen text-[#F9FAFB] p-6">
                <div className="max-w-6xl mx-auto bg-[#1D1F24] rounded-xl p-8 shadow-lg">
                    <Link to="/" className="flex items-center text-[#0EA5E9] hover:text-[#6366F1] mb-6">
                        <FaArrowLeft className="mr-2" /> Back to Home
                    </Link>
                    <div className="text-center py-12">
                        <h2 className="text-2xl text-[#F87171] mb-4">Error</h2>
                        <p className="text-[#9CA3AF]">{error || "Agent information couldn't be loaded"}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[#121317] min-h-screen text-[#F9FAFB] p-4 md:p-6">
            <div className="max-w-6xl mx-auto">
                <Link to="/" className="flex items-center text-[#0EA5E9] hover:text-[#6366F1] mb-6 transition">
                    <FaArrowLeft className="mr-2" /> Back to Home
                </Link>
                
                <div className="bg-[#1D1F24] rounded-xl overflow-hidden shadow-lg">
                    {/* Hero Section */}
                    <div className="relative h-64 md:h-80 bg-gradient-to-r from-[#0EA5E9] to-[#6366F1]">
                        <img 
                            src={agent.AGENT_IMAGE} 
                            alt={agent.NAME} 
                            className="w-full h-full object-cover mix-blend-overlay opacity-60"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1D1F24] to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-6 md:p-8">
                            <div className="bg-[rgba(18,19,23,0.75)] text-[#F9FAFB] px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1 mb-3 border border-[rgba(156,163,175,0.1)]">
                                <span>⚙️</span> {agent.CATEGORY}
                            </div>
                            <h1 className="text-3xl md:text-4xl font-bold text-[#F9FAFB] drop-shadow-md">{agent.NAME}</h1>
                        </div>
                    </div>
                    
                    {/* Main Content */}
                    <div className="p-6 md:p-8">
                        <div className="flex flex-wrap items-center gap-4 mb-6">
                            <div className="bg-[rgba(18,19,23,0.75)] text-[#FBBF24] px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1 border border-[rgba(156,163,175,0.1)]">
                                <FaStar className="text-[#FBBF24]" /> {agent.RATING}
                            </div>
                            <div className="text-[#0EA5E9] text-2xl font-bold">${agent.PRICE}</div>
                            <div className="flex-grow"></div>
                            <button className="bg-[#6366F1] hover:bg-[#4F46E5] text-[#F9FAFB] rounded-lg py-3 px-6 font-bold text-sm transition shadow-md">
                                Get This Agent
                            </button>
                        </div>
                        
                        {/* Description */}
                        <div className="mb-8">
                            <h2 className="text-xl font-bold mb-4 text-[#F9FAFB] border-b border-[rgba(156,163,175,0.1)] pb-2">About this Agent</h2>
                            <p className="text-[#9CA3AF] mb-4">{agent.DESCRIPTION}</p>
                            <p className="text-[#9CA3AF]">{agent.DETAILED_DESCRIPTION}</p>
                        </div>
                        
                        {/* Features */}
                        <div className="mb-8">
                            <h2 className="text-xl font-bold mb-4 text-[#F9FAFB] border-b border-[rgba(156,163,175,0.1)] pb-2">
                                <FaList className="inline mr-2" /> Key Features
                            </h2>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {agent.FEATURES.map((feature, index) => (
                                    <li key={index} className="flex items-start">
                                        <span className="text-[#22C55E] mr-2">✓</span>
                                        <span className="text-[#F9FAFB]">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        
                        {/* Use Cases */}
                        {agent.USE_CASES && (
                            <div className="mb-8">
                                <h2 className="text-xl font-bold mb-4 text-[#F9FAFB] border-b border-[rgba(156,163,175,0.1)] pb-2">Use Cases</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {agent.USE_CASES.map((useCase, index) => (
                                        <div key={index} className="bg-[rgba(18,19,23,0.4)] p-3 rounded-lg">
                                            <span className="text-[#F9FAFB]">{useCase}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        
                        {/* Tags */}
                        <div className="mb-8">
                            <h2 className="text-xl font-bold mb-4 text-[#F9FAFB] border-b border-[rgba(156,163,175,0.1)] pb-2">
                                <FaTag className="inline mr-2" /> Tags
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {agent.TAGS.map((tag, index) => (
                                    <span key={index} className="bg-[rgba(156,163,175,0.1)] px-3 py-1 rounded text-sm text-[#9CA3AF]">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                        
                        {/* Technical Details */}
                        <div className="mb-8">
                            <h2 className="text-xl font-bold mb-4 text-[#F9FAFB] border-b border-[rgba(156,163,175,0.1)] pb-2">Technical Details</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-center">
                                    <FaCodeBranch className="text-[#9CA3AF] mr-2" />
                                    <span className="text-[#9CA3AF] mr-2">Version:</span>
                                    <span className="text-[#F9FAFB]">{agent.VERSION}</span>
                                </div>
                                <div className="flex items-center">
                                    <FaCalendarAlt className="text-[#9CA3AF] mr-2" />
                                    <span className="text-[#9CA3AF] mr-2">Released:</span>
                                    <span className="text-[#F9FAFB]">{agent.RELEASE_DATE}</span>
                                </div>
                                <div className="col-span-1 md:col-span-2 mt-2">
                                    <span className="text-[#9CA3AF] mr-2">Requirements:</span>
                                    <span className="text-[#F9FAFB]">{agent.REQUIREMENTS}</span>
                                </div>
                            </div>
                        </div>
                        
                        {/* Reviews */}
                        {agent.REVIEWS && agent.REVIEWS.length > 0 && (
                            <div className="mb-6">
                                <h2 className="text-xl font-bold mb-4 text-[#F9FAFB] border-b border-[rgba(156,163,175,0.1)] pb-2">User Reviews</h2>
                                <div className="space-y-4">
                                    {agent.REVIEWS.map((review, index) => (
                                        <div key={index} className="bg-[rgba(18,19,23,0.4)] p-4 rounded-lg">
                                            <div className="flex justify-between mb-2">
                                                <span className="font-medium text-[#F9FAFB]">{review.USER}</span>
                                                <div className="flex items-center">
                                                    <FaStar className="text-[#FBBF24] mr-1" />
                                                    <span className="text-[#F9FAFB]">{review.RATING}</span>
                                                </div>
                                            </div>
                                            <p className="text-[#9CA3AF]">{review.COMMENT}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AgentPage;