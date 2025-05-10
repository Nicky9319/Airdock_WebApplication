import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  FaArrowLeft,
  FaStar,
  FaTag,
  FaCalendarAlt,
  FaCodeBranch,
  FaList,
} from "react-icons/fa";

const AgentPage = () => {
  const { agentId } = useParams(); // get id from route params
  console.log("id got from param", agentId);
  const [agent, setAgent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);
  const [selectedVersion, setSelectedVersion] = useState(null);

  const serverIpAddress = import.meta.env.VITE_SERVER_IP_ADDRESS;
  console.log('Server IP Address from .env:', serverIpAddress); // For verification

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchAgentData = async () => {
      try {
        const response = await fetch(`http://${serverIpAddress}:11000/Agents/GetAgentInfo?AGENT_ID=${agentId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        let agent = await response.json();
        agent = agent.AGENT_INFO;

        // Find agent with matching id (assuming id is a string)
        console.log(agent);

        setAgent(agent);
        
        // Set the latest version as default
        if (agent.VERSIONS && agent.VERSIONS.length > 0) {
          setSelectedVersion(agent.VERSIONS[agent.VERSIONS.length - 1]);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching agent data:", error);
        setError("Failed to load agent data");
        setLoading(false);
      }
    };

    fetchAgentData();
  }, [agentId]);

  const handleGetAgent = () => {
    console.log(`Agent "${agent.NAME}" version "${selectedVersion}" requested`);
    const urlRequest = {
      "EVENT": "INSTALL_AGENT",
      "AGENT_ID": agentId,
      "VERSION": selectedVersion
    };
    window.location.href = `agentbed://${encodeURIComponent(JSON.stringify(urlRequest))}`;
    console.log(`AgentBed://${encodeURIComponent(JSON.stringify(urlRequest))}`);

    setNotification({
      message: `${agent.NAME} (${selectedVersion}) has been added to your workspace!`,
      type: "success",
    });

    // Clear notification after 5 seconds
    setTimeout(() => {
      setNotification(null);
    }, 5000);

    // Here you would typically integrate with a backend to process the agent purchase
    console.log(`Agent "${agent.NAME}" requested`);
  };

  // Version selection handler
  const handleVersionChange = (e) => {
    setSelectedVersion(e.target.value);
  };

  // Version dropdown component
  const VersionSelector = () => (
    <div className="flex flex-col mb-4">
      <label htmlFor="version-select" className="text-[#9CA3AF] mb-2 text-sm">
        Select Version:
      </label>
      <select
        id="version-select"
        value={selectedVersion || ""}
        onChange={handleVersionChange}
        className="bg-[rgba(18,19,23,0.75)] text-[#F9FAFB] py-2 px-3 rounded-lg border border-[rgba(156,163,175,0.2)] focus:outline-none focus:ring-2 focus:ring-[#6366F1]"
      >
        {agent?.VERSIONS?.map((version) => (
          <option key={version} value={version}>
            {version}
          </option>
        ))}
      </select>
    </div>
  );

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
        <div className="w-full mx-auto bg-[#1D1F24] rounded-xl p-8 shadow-lg">
          <Link
            to="/"
            className="flex items-center text-[#0EA5E9] hover:text-[#6366F1] mb-6"
          >
            <FaArrowLeft className="mr-2" /> Back to Home
          </Link>
          <div className="text-center py-12">
            <h2 className="text-2xl text-[#F87171] mb-4">Error</h2>
            <p className="text-[#9CA3AF]">
              {error || "Agent information couldn't be loaded"}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#121317] min-h-screen text-[#F9FAFB]">
      {/* Notification */}
      {notification && (
        <div
          className={`fixed top-4 right-4 z-200 px-6 py-3 rounded-lg shadow-lg flex items-center ${notification.type === "success" ? "bg-green-700" : "bg-red-700"
            }`}
        >
          <span>{notification.message}</span>
          <button
            onClick={() => setNotification(null)}
            className="ml-4 text-white hover:text-gray-200"
          >
            ✕
          </button>
        </div>
      )}

      <div className="w-full px-4 py-6">
        <Link
          to="/"
          className="flex items-center text-[#0EA5E9] hover:text-[#6366F1] mb-6 transition"
        >
          <FaArrowLeft className="mr-2" /> Back to Home
        </Link>

        <div className="bg-[#1D1F24] rounded-xl overflow-hidden shadow-lg">
          {/* Hero Section - Full width banner */}
          <div className="relative h-72 md:h-96 bg-gradient-to-r from-[#0EA5E9] to-[#6366F1]">
            <img
              src={agent.AGENT_IMAGE}
              alt={agent.NAME}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1D1F24] to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full">
              <div className="bg-[rgba(18,19,23,0.75)] text-[#F9FAFB] px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1 mb-3 border border-[rgba(156,163,175,0.1)]">
                <span>⚙️</span> {agent.CATEGORY}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-[#F9FAFB] drop-shadow-md">
                {agent.NAME}
              </h1>
            </div>
          </div>

          {/* Main Content - Two column layout for desktop */}
          <div className="p-6 md:p-8">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Left Column - Main content */}
              <div className="lg:w-2/3">
                {/* Price and Rating Bar */}
                <div className="flex flex-wrap items-center gap-4 mb-8 p-4 bg-[rgba(18,19,23,0.4)] rounded-xl">
                  <div className="bg-[rgba(18,19,23,0.75)] text-[#FBBF24] px-4 py-2 rounded-full text-sm font-bold flex items-center gap-1 border border-[rgba(156,163,175,0.1)]">
                    <FaStar className="text-[#FBBF24]" /> {agent.RATING}
                  </div>
                  <div className="text-[#0EA5E9] text-2xl font-bold">
                    ${agent.PRICE}
                  </div>
                  <div className="flex-grow"></div>
                  <button
                    onClick={handleGetAgent}
                    className="bg-[#6366F1] hover:bg-[#4F46E5] text-[#F9FAFB] rounded-lg py-3 px-6 font-bold text-sm transition shadow-md"
                  >
                    Get This Agent
                  </button>
                </div>

                {/* Description */}
                <div className="mb-8 bg-[rgba(18,19,23,0.2)] p-6 rounded-xl">
                  <h2 className="text-2xl font-bold mb-4 text-[#F9FAFB] border-b border-[rgba(156,163,175,0.1)] pb-2">
                    About this Agent
                  </h2>
                  <p className="text-[#9CA3AF] mb-4 text-lg">
                    {agent.DESCRIPTION}
                  </p>
                  <p className="text-[#9CA3AF]">{agent.DETAILED_DESCRIPTION}</p>
                </div>

                {/* Features */}
                <div className="mb-8 bg-[rgba(18,19,23,0.2)] p-6 rounded-xl">
                  <h2 className="text-2xl font-bold mb-4 text-[#F9FAFB] border-b border-[rgba(156,163,175,0.1)] pb-2">
                    <FaList className="inline mr-2" /> Key Features
                  </h2>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {agent.FEATURES.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-start bg-[rgba(18,19,23,0.3)] p-3 rounded-lg"
                      >
                        <span className="text-[#22C55E] mr-2 mt-1">✓</span>
                        <span className="text-[#F9FAFB]">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Use Cases */}
                {agent.USE_CASES && (
                  <div className="mb-8 bg-[rgba(18,19,23,0.2)] p-6 rounded-xl">
                    <h2 className="text-2xl font-bold mb-4 text-[#F9FAFB] border-b border-[rgba(156,163,175,0.1)] pb-2">
                      Use Cases
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {agent.USE_CASES.map((useCase, index) => (
                        <div
                          key={index}
                          className="bg-[rgba(18,19,23,0.4)] p-4 rounded-lg"
                        >
                          <span className="text-[#F9FAFB]">{useCase}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Reviews */}
                {agent.REVIEWS && agent.REVIEWS.length > 0 && (
                  <div className="mb-8 bg-[rgba(18,19,23,0.2)] p-6 rounded-xl">
                    <h2 className="text-2xl font-bold mb-4 text-[#F9FAFB] border-b border-[rgba(156,163,175,0.1)] pb-2">
                      User Reviews
                    </h2>
                    <div className="space-y-4">
                      {agent.REVIEWS.map((review, index) => (
                        <div
                          key={index}
                          className="bg-[rgba(18,19,23,0.4)] p-4 rounded-lg"
                        >
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium text-[#F9FAFB] text-lg">
                              {review.USER}
                            </span>
                            <div className="flex items-center bg-[rgba(18,19,23,0.6)] px-3 py-1 rounded-full">
                              <FaStar className="text-[#FBBF24] mr-1" />
                              <span className="text-[#F9FAFB]">
                                {review.RATING}
                              </span>
                            </div>
                          </div>
                          <p className="text-[#9CA3AF]">{review.COMMENT}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column - Sidebar */}
              <div className="lg:w-1/3">
                {/* Quick Action Card */}
                <div className="bg-[rgba(18,19,23,0.4)] p-6 rounded-xl mb-6 sticky top-8">
                  <h3 className="text-xl font-bold mb-4 text-[#F9FAFB]">
                    Get Started Now
                  </h3>
                  <p className="text-[#9CA3AF] mb-6">
                    Add this agent to your workspace and start boosting your
                    productivity.
                  </p>

                  {/* Add version selector here */}
                  <VersionSelector />

                  <button
                    onClick={handleGetAgent}
                    className="bg-[#6366F1] hover:bg-[#4F46E5] text-[#F9FAFB] rounded-lg py-3 px-6 font-bold text-sm w-full transition shadow-md mb-4"
                  >
                    Get This Agent
                  </button>
                  <p className="text-xs text-center text-[#9CA3AF]">
                    One-time payment, no subscription
                  </p>
                </div>

                {/* Technical Details */}
                <div className="bg-[rgba(18,19,23,0.4)] p-6 rounded-xl mb-6">
                  <h2 className="text-xl font-bold mb-4 text-[#F9FAFB] border-b border-[rgba(156,163,175,0.1)] pb-2">
                    Technical Details
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <FaCodeBranch className="text-[#9CA3AF] mr-3" />
                      <span className="text-[#9CA3AF] mr-2 w-24">Version:</span>
                      <span className="text-[#F9FAFB] font-medium">
                        {selectedVersion || (agent.VERSIONS && agent.VERSIONS.length > 0 ? agent.VERSIONS[agent.VERSIONS.length - 1] : 'N/A')}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <FaCalendarAlt className="text-[#9CA3AF] mr-3" />
                      <span className="text-[#9CA3AF] mr-2 w-24">
                        Released:
                      </span>
                      <span className="text-[#F9FAFB] font-medium">
                        {agent.RELEASE_DATE}
                      </span>
                    </div>
                    <div className="pt-2">
                      <span className="text-[#9CA3AF] block mb-2">
                        Requirements:
                      </span>
                      <span className="text-[#F9FAFB] bg-[rgba(18,19,23,0.6)] p-2 rounded block">
                        {agent.REQUIREMENTS}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="bg-[rgba(18,19,23,0.4)] p-6 rounded-xl">
                  <h2 className="text-xl font-bold mb-4 text-[#F9FAFB] border-b border-[rgba(156,163,175,0.1)] pb-2">
                    <FaTag className="inline mr-2" /> Tags
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {agent.TAGS.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-[rgba(156,163,175,0.1)] px-3 py-2 rounded-lg text-sm text-[#9CA3AF] hover:bg-[rgba(156,163,175,0.2)] transition cursor-pointer"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center text-[#9CA3AF] text-sm mt-8 pb-6">
          © {new Date().getFullYear()} Airdock Agents Marketplace
        </div>
      </div>
    </div>
  );
};

export default AgentPage;
