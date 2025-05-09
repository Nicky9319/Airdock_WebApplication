import React, { useState, useEffect } from 'react';

const HomePage = () => {
    const [agents, setAgents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [categories, setCategories] = useState(['All']);

    useEffect(() => {
        // Simulating API call to fetch data
        const fetchAgents = async () => {
            try {
                // In a real app, this would be a proper API endpoint
                const response = await fetch('/src/data/agentsData.json');
                let data = await response.json();
                
                // Add sample image URLs based on agent category
                data = data.map(agent => {
                    const imageMap = {
                        'Productivity': 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?q=80&w=500&auto=format&fit=crop',
                        'Research': 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?q=80&w=500&auto=format&fit=crop',
                        'Creativity': 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?q=80&w=500&auto=format&fit=crop',
                        'Writing': 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=500&auto=format&fit=crop',
                        'Data Analysis': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=500&auto=format&fit=crop',
                        'Communication': 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?q=80&w=500&auto=format&fit=crop',
                        'Finance': 'https://images.unsplash.com/photo-1591696205602-2f950c417cb9?q=80&w=500&auto=format&fit=crop',
                        'Education': 'https://images.unsplash.com/photo-1503676382389-4809596d5290?q=80&w=500&auto=format&fit=crop',
                        'Healthcare': 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=500&auto=format&fit=crop',
                        'Customer Support': 'https://images.unsplash.com/photo-1534536281715-e28d76689b4d?q=80&w=500&auto=format&fit=crop',
                        'Design': 'https://images.unsplash.com/photo-1618004912476-29818d81ae2e?q=80&w=500&auto=format&fit=crop'
                    };
                    
                    return {
                        ...agent,
                        IMAGE: agent.IMAGE || imageMap[agent.CATEGORY] || 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=500&auto=format&fit=crop'
                    };
                });
                
                setAgents(data);
                
                // Extract unique categories
                const uniqueCategories = ['All', ...new Set(data.map(agent => agent.CATEGORY))];
                setCategories(uniqueCategories);
                
                setLoading(false);
            } catch (error) {
                console.error('Error fetching agents data:', error);
                setLoading(false);
            }
        };

        setTimeout(() => {
            fetchAgents();
        }, 800); // Simulate network delay
    }, []);

    // Filter agents based on search term and selected category
    const filteredAgents = agents.filter(agent => {
        const matchesSearch = 
            agent.NAME.toLowerCase().includes(searchTerm.toLowerCase()) ||
            agent.DESCRIPTION.toLowerCase().includes(searchTerm.toLowerCase()) ||
            agent.CATEGORY.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesCategory = selectedCategory === 'All' || agent.CATEGORY === selectedCategory;
        
        return matchesSearch && matchesCategory;
    });

    // Redesigned styles for enhanced user experience with dark theme
    const styles = {
        pageWrapper: {
            background: '#121317', // Background from dark theme
            minHeight: '100vh',
            width: '100%',
            color: '#F9FAFB', // Text Primary from dark theme
            fontFamily: 'Arial, sans-serif',
            overflowX: 'hidden',
        },
        navBar: {
            position: 'sticky',
            top: 0,
            zIndex: 100,
            background: 'rgba(18, 19, 23, 0.8)', // Slightly transparent background
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid rgba(156, 163, 175, 0.1)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '12px 24px',
            width: '100%',
        },
        logo: {
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontWeight: 'bold',
            fontSize: '1.3rem',
            color: '#F9FAFB',
            textDecoration: 'none',
        },
        logoImage: {
            width: '32px',
            height: '32px',
            borderRadius: '6px',
        },
        headerBanner: {
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.9) 0%, rgba(79, 70, 229, 0.9) 100%)',
            backgroundImage: 'url("https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1920&auto=format&fit=crop")',
            backgroundBlendMode: 'overlay',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            padding: '80px 0 100px',
            position: 'relative',
            overflow: 'hidden',
            textAlign: 'center',
            color: '#F9FAFB',
        },
        headerGradientOverlay: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(0deg, #121317 0%, rgba(18, 19, 23, 0) 50%, rgba(18, 19, 23, 0.8) 100%)',
        },
        headerContent: {
            position: 'relative',
            zIndex: 2,
            maxWidth: '1000px',
            margin: '0 auto',
            padding: '0 20px',
        },
        marketplaceIcon: {
            width: '80px',
            height: '80px',
            margin: '0 auto 24px',
            display: 'block',
            borderRadius: '16px',
            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',
        },
        title: {
            fontSize: '3.5rem',
            marginBottom: '20px',
            fontWeight: 'bold',
            color: '#F9FAFB',
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
            lineHeight: 1.2,
        },
        subtitle: {
            fontSize: '1.4rem',
            marginBottom: '40px',
            color: '#F9FAFB',
            maxWidth: '800px',
            margin: '0 auto 40px',
            lineHeight: 1.5,
            textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
        },
        searchBar: {
            display: 'flex',
            maxWidth: '700px',
            margin: '0 auto',
            width: '100%',
            position: 'relative',
            top: '40px',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.3)',
            borderRadius: '50px',
            overflow: 'hidden',
            background: '#1D1F24',
            border: '1px solid rgba(156, 163, 175, 0.1)',
        },
        searchInput: {
            flex: '1',
            padding: '18px 25px',
            fontSize: '1.1rem',
            border: 'none',
            backgroundColor: '#1D1F24',
            color: '#F9FAFB',
            outline: 'none',
        },
        searchButton: {
            background: '#0EA5E9',
            color: '#F9FAFB',
            border: 'none',
            padding: '18px 35px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '1.1rem',
            transition: 'all 0.2s ease',
        },
        mainContent: {
            width: '100%',
            margin: '0 auto',
            padding: '40px 24px 80px',
            maxWidth: '1600px',
        },
        categoryFilters: {
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
            marginBottom: '30px',
            padding: '10px 0',
            overflowX: 'auto',
        },
        categoryButton: {
            padding: '10px 20px',
            borderRadius: '50px',
            fontSize: '0.95rem',
            fontWeight: 'medium',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            border: 'none',
            whiteSpace: 'nowrap',
        },
        activeCategory: {
            background: '#6366F1',
            color: '#F9FAFB',
            boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
        },
        inactiveCategory: {
            background: 'rgba(156, 163, 175, 0.1)',
            color: '#9CA3AF',
        },
        resultsHeader: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '10px',
            marginBottom: '30px',
            padding: '20px 0',
            borderBottom: '1px solid rgba(156, 163, 175, 0.1)',
        },
        resultsCount: {
            fontSize: '1.3rem',
            fontWeight: 'bold',
            color: '#F9FAFB',
        },
        sortOptions: {
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            color: '#9CA3AF',
            fontSize: '0.95rem',
        },
        grid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '30px',
            width: '100%',
        },
        card: {
            background: '#1D1F24',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            border: '1px solid rgba(156, 163, 175, 0.05)',
        },
        cardImageContainer: {
            position: 'relative',
            height: '180px',
            overflow: 'hidden',
        },
        cardImage: {
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s ease',
        },
        cardCategory: {
            position: 'absolute',
            top: '12px',
            left: '12px',
            background: 'rgba(18, 19, 23, 0.75)',
            color: '#F9FAFB',
            padding: '6px 12px',
            borderRadius: '50px',
            fontSize: '0.8rem',
            fontWeight: 'bold',
            backdropFilter: 'blur(4px)',
            border: '1px solid rgba(156, 163, 175, 0.1)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
        },
        cardRating: {
            position: 'absolute',
            top: '12px',
            right: '12px',
            background: 'rgba(18, 19, 23, 0.75)',
            color: '#FBBF24',
            padding: '6px 12px',
            borderRadius: '50px',
            fontSize: '0.8rem',
            fontWeight: 'bold',
            backdropFilter: 'blur(4px)',
            border: '1px solid rgba(156, 163, 175, 0.1)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
        },
        cardContent: {
            padding: '25px',
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
        },
        agentName: {
            fontSize: '1.3rem',
            fontWeight: 'bold',
            marginBottom: '12px',
            color: '#F9FAFB',
            lineHeight: 1.3,
        },
        agentDescription: {
            fontSize: '0.95rem',
            color: '#9CA3AF',
            marginBottom: '20px',
            lineHeight: '1.6',
            flexGrow: 1,
        },
        tagsContainer: {
            display: 'flex',
            flexWrap: 'wrap',
            gap: '6px',
            marginBottom: '20px',
        },
        tag: {
            background: 'rgba(156, 163, 175, 0.1)',
            padding: '5px 10px',
            borderRadius: '6px',
            fontSize: '0.75rem',
            color: '#9CA3AF',
        },
        cardFooter: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid rgba(156, 163, 175, 0.1)',
            padding: '15px 25px',
            background: 'rgba(18, 19, 23, 0.4)',
        },
        price: {
            fontWeight: 'bold',
            fontSize: '1.2rem',
            color: '#0EA5E9',
        },
        actionButton: {
            background: '#6366F1',
            color: '#F9FAFB',
            border: 'none',
            borderRadius: '8px',
            padding: '8px 16px',
            fontSize: '0.9rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
        },
        loadingContainer: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '400px',
        },
        loadingSpinner: {
            width: '50px',
            height: '50px',
            border: '4px solid rgba(156, 163, 175, 0.2)',
            borderTop: '4px solid #6366F1',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            marginBottom: '20px',
        },
        loadingText: {
            color: '#9CA3AF',
            fontSize: '1.1rem',
        },
        noResults: {
            textAlign: 'center',
            padding: '100px 0',
            color: '#9CA3AF',
            fontSize: '1.2rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
        },
        noResultsEmoji: {
            fontSize: '3rem',
            marginBottom: '10px',
        },
        footer: {
            borderTop: '1px solid rgba(156, 163, 175, 0.1)',
            padding: '30px 0',
            textAlign: 'center',
            color: '#9CA3AF',
            fontSize: '0.9rem',
        },
        '@keyframes spin': {
            from: { transform: 'rotate(0deg)' },
            to: { transform: 'rotate(360deg)' }
        },
    };

    // Get responsive grid columns
    const getGridTemplateColumns = () => {
        const width = window.innerWidth;
        if (width > 1600) return 'repeat(4, 1fr)';
        if (width > 1200) return 'repeat(3, 1fr)';
        if (width > 750) return 'repeat(2, 1fr)';
        return 'repeat(1, 1fr)';
    };

    const [gridColumns, setGridColumns] = useState(getGridTemplateColumns());

    useEffect(() => {
        const handleResize = () => {
            setGridColumns(getGridTemplateColumns());
        };
        
        window.addEventListener('resize', handleResize);
        handleResize(); // Initial call
        
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div style={styles.pageWrapper}>
            <nav style={styles.navBar}>
                <a href="/" style={styles.logo}>
                    <img 
                        src="https://img.icons8.com/fluency/96/000000/artificial-intelligence.png" 
                        alt="AI Marketplace" 
                        style={styles.logoImage} 
                    />
                    <span>AirDock</span>
                </a>
            </nav>

            <div style={styles.headerBanner}>
                <div style={styles.headerGradientOverlay}></div>
                <div style={styles.headerContent}>
                    <img 
                        src="https://img.icons8.com/fluency/240/000000/artificial-intelligence.png" 
                        alt="Marketplace Icon" 
                        style={styles.marketplaceIcon} 
                    />
                    <h1 style={styles.title}>AI Agent Marketplace</h1>
                    <p style={styles.subtitle}>
                        Discover and deploy powerful AI agents to transform your workflow, 
                        enhance productivity, and solve complex problems with ease
                    </p>
                    <div style={styles.searchBar}>
                        <input
                            type="text"
                            placeholder="Search for AI agents, tools, or capabilities..."
                            style={styles.searchInput}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button style={styles.searchButton}>
                            Search
                        </button>
                    </div>
                </div>
            </div>

            <div style={styles.mainContent}>
                {loading ? (
                    <div style={styles.loadingContainer}>
                        <div style={{...styles.loadingSpinner, animation: 'spin 1s linear infinite'}}></div>
                        <div style={styles.loadingText}>Loading AI agents...</div>
                    </div>
                ) : (
                    <>
                        <div style={styles.categoryFilters}>
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    style={{
                                        ...styles.categoryButton,
                                        ...(selectedCategory === category ? styles.activeCategory : styles.inactiveCategory)
                                    }}
                                    onClick={() => setSelectedCategory(category)}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                        
                        <div style={styles.resultsHeader}>
                            <div style={styles.resultsCount}>
                                {filteredAgents.length} AI Agents Available
                            </div>
                            <div style={styles.sortOptions}>
                                <span>Sort by:</span>
                                <select style={{
                                    background: '#1D1F24',
                                    color: '#F9FAFB',
                                    border: '1px solid rgba(156, 163, 175, 0.2)',
                                    borderRadius: '6px',
                                    padding: '6px 10px'
                                }}>
                                    <option>Popularity</option>
                                    <option>Price: Low to High</option>
                                    <option>Price: High to Low</option>
                                    <option>Rating</option>
                                </select>
                            </div>
                        </div>
                        
                        {filteredAgents.length > 0 ? (
                            <div style={{...styles.grid, gridTemplateColumns: gridColumns}}>
                                {filteredAgents.map((agent) => (
                                    <div
                                        key={agent.ID}
                                        style={styles.card}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.transform = 'translateY(-8px)';
                                            e.currentTarget.style.boxShadow = '0 20px 30px rgba(0, 0, 0, 0.3)';
                                            const img = e.currentTarget.querySelector('img');
                                            if (img) img.style.transform = 'scale(1.05)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.transform = 'none';
                                            e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
                                            const img = e.currentTarget.querySelector('img');
                                            if (img) img.style.transform = 'scale(1)';
                                        }}
                                    >
                                        <div style={styles.cardImageContainer}>
                                            <img src={agent.IMAGE} alt={agent.NAME} style={styles.cardImage} />
                                            <div style={styles.cardCategory}>
                                                <span>⚙️</span> {agent.CATEGORY}
                                            </div>
                                            <div style={styles.cardRating}>
                                                <span>★</span> {agent.RATING}
                                            </div>
                                        </div>
                                        <div style={styles.cardContent}>
                                            <h3 style={styles.agentName}>{agent.NAME}</h3>
                                            <p style={styles.agentDescription}>{agent.DESCRIPTION}</p>
                                            <div style={styles.tagsContainer}>
                                                {agent.TAGS.map((tag, idx) => (
                                                    <span key={idx} style={styles.tag}>{tag}</span>
                                                ))}
                                            </div>
                                        </div>
                                        <div style={styles.cardFooter}>
                                            <div style={styles.price}>${agent.PRICE}</div>
                                            <button style={styles.actionButton}>Get Agent</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div style={styles.noResults}>
                                <div style={styles.noResultsEmoji}>🔍</div>
                                <div>No AI agents found matching your search criteria.</div>
                                <div>Try different keywords or browse all categories.</div>
                            </div>
                        )}
                    </>
                )}
            </div>

            <div style={styles.footer}>
                © 2023 AirDock AI Marketplace. All rights reserved.
            </div>
        </div>
    );
};

export default HomePage;