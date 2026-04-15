import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Activity, Sun, BatteryFull, Map, Compass, Settings, CloudLightning, Zap, Users,
  BarChart, ShieldAlert, ZapOff, Cpu, Workflow, Share2, Server
} from 'lucide-react';
import ParticleBackground from '../components/ParticleBackground';
import './About.css';

// Scroll reveal component
const RevealOnScroll = ({ children }) => {
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    });
    
    if (domRef.current) observer.observe(domRef.current);
    
    return () => {
      if (domRef.current) observer.unobserve(domRef.current);
    };
  }, []);

  return (
    <div className="reveal-section" ref={domRef}>
      {children}
    </div>
  );
};

const FeatureCard = ({ icon: Icon, title, desc }) => (
  <div className="feature-card">
    <div className="feature-icon-wrapper">
      <Icon size={28} className="feature-icon" />
    </div>
    <div className="feature-text">
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
  </div>
);

const userFeatures = [
  { icon: Activity, title: 'Real Time Energy Consumption', desc: 'Shows how much electricity you are using at the moment to help understand patterns and reduce unnecessary use.' },
  { icon: Sun, title: 'Renewable Energy Generation', desc: 'Displays how much energy is being produced from solar or wind sources, encouraging clean energy use.' },
  { icon: BatteryFull, title: 'Battery & Storage Level', desc: 'Indicates how much energy is stored, helping you decide when to store energy and when to consume it.' },
  { icon: Map, title: 'Local Grid Status', desc: 'Alerts you if the grid is stable or stressed, prompting usage reduction during high load conditions.' },
  { icon: Compass, title: 'Demand Side Response', desc: 'Suggests shifting usage to different times. Helps balance the grid by practically spreading out energy demand.' },
  { icon: Settings, title: 'Automated Load Control', desc: 'Allows the system to automatically control certain appliances, reducing manual effort while maintaining grid stability.' },
  { icon: CloudLightning, title: 'Weather Based Alerts', desc: 'Provides real-time alerts based on incoming weather layers so you can prepare for shifts in generation or peak usage.' },
  { icon: Zap, title: 'Pre-charge Battery Indication', desc: 'Automatically notifies you to charge up before peak demand periods ensuring backup power is always available.' },
  { icon: Users, title: 'Energy Sharing Network', desc: 'Allows you to actively sell or share excess energy to others, turning users into active network participants.' }
];

const adminFeatures = [
  { icon: Activity, title: 'Real Time Grid Monitoring', desc: 'Provides a complete omniview of all users and sources, enabling seamless tracking of overall grid performance.' },
  { icon: BarChart, title: 'Supply vs Demand Monitoring', desc: 'Constantly compares total energy supply with consumption to instantly identify shortages or excesses in the system.' },
  { icon: ShieldAlert, title: 'Stressed Zone Identification', desc: 'Detects areas where localized energy demand goes critical, enabling rapid action to prevent cascading failures.' },
  { icon: ZapOff, title: 'Demand Side Load Control', desc: 'Allows admin to selectively reduce or throttle energy usage in tactical areas to manage peak load situations.' },
  { icon: Cpu, title: 'Virtual Power Plant', desc: 'Combines multiple localized small energy sources into one massive pooled system, radically improving reliability.' },
  { icon: Workflow, title: 'Frequency Monitoring', desc: 'Tracks grid frequency vectors continuously. Prevents damage to downstream electrical equipment.' },
  { icon: CloudLightning, title: 'Weather To Load Forecasting', desc: 'Feeds live weather radar directly into predictive AI models to calculate and plan future distribution requirements.' },
  { icon: Cpu, title: 'AI Optimization Engine', desc: 'Automatically balances supply and demand utilizing machine learning models to reduce human effort and perfect efficiency.' },
  { icon: Share2, title: 'Energy Redistribution', desc: 'Actively transfers energy from low-demand sectors to high-demand sectors maintaining equilibrium across the grid.' },
  { icon: Server, title: 'Grid Resiliency Handling', desc: 'Enables "black start" recoveries and rapid-restart handling sequences for the grid after localized system failures.' }
];

const sysFeatures = [
  { icon: Workflow, title: 'Decentralized Control Framework', desc: 'Allows decision making logic at local node structures rather than relying on a top-heavy central system. Ensures extreme reliability.' },
  { icon: Users, title: 'P2P Energy Exchange', desc: 'Empowers raw, direct energy transfer and financial transaction tracking between neighboring nodes on a flexible grid.' }
];

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="about-page-wrapper">
      <ParticleBackground />
      
      <div className="about-content-scroll">
        <div className="about-header-hero">
          <button className="back-to-login" onClick={() => navigate('/login')}>
            Login / Sign Up
          </button>
          
          <img 
            src="/elemental-icon.png" 
            alt="Elemental Icon" 
            className="hero-logo"
          />
          <h1 className="hero-title">Intelligent Eco System</h1>
          <p className="hero-subtitle">The decentralized future of grid monitoring and energy redistribution.</p>
        </div>

        <div className="features-container">
          
          {/* USER FEATURES */}
          <RevealOnScroll>
            <div className="feature-category-header user-theme">
              <h2>User Experience</h2>
              <div className="header-line"></div>
            </div>
            <div className="features-grid">
              {userFeatures.map((feat, i) => (
                <FeatureCard key={i} icon={feat.icon} title={feat.title} desc={feat.desc} />
              ))}
            </div>
          </RevealOnScroll>

          {/* CREATIVE MURAL 1 */}
          <RevealOnScroll>
            <div className="mural-container">
              <img src="/smart-grid.png" alt="Smart Grid Map" className="creative-mural" />
              <div className="mural-glow green-glow"></div>
            </div>
          </RevealOnScroll>

          {/* ADMIN FEATURES */}
          <RevealOnScroll>
            <div className="feature-category-header admin-theme" style={{marginTop: '40px'}}>
              <h2>Admin Command Center</h2>
              <div className="header-line"></div>
            </div>
            <div className="features-grid">
              {adminFeatures.map((feat, i) => (
                <FeatureCard key={i} icon={feat.icon} title={feat.title} desc={feat.desc} />
              ))}
            </div>
          </RevealOnScroll>

          {/* CREATIVE MURAL 2 */}
          <RevealOnScroll>
            <div className="mural-container">
              <img src="/eco-node.png" alt="Renewable Eco Node" className="creative-mural" />
              <div className="mural-glow gold-glow"></div>
            </div>
          </RevealOnScroll>

          {/* SYSTEM FEATURES */}
          <RevealOnScroll>
            <div className="feature-category-header sys-theme" style={{marginTop: '40px'}}>
              <h2>System Architecture Level</h2>
              <div className="header-line"></div>
            </div>
            <div className="features-grid" style={{marginBottom: '100px'}}>
              {sysFeatures.map((feat, i) => (
                <FeatureCard key={i} icon={feat.icon} title={feat.title} desc={feat.desc} />
              ))}
            </div>
          </RevealOnScroll>

        </div>
      </div>
    </div>
  );
};

export default About;
