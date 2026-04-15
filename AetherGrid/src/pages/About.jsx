import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Activity, Sun, BatteryFull, Map, Compass, Settings, CloudLightning, Zap, Users,
  BarChart, ShieldAlert, ZapOff, Cpu, Workflow, Share2, Server, HelpCircle, ChevronDown
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
    }, { threshold: 0.1 });
    
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

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={`faq-item ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(!isOpen)}>
      <div className="faq-question">
        <span>{question}</span>
        <ChevronDown size={18} className="faq-icon" />
      </div>
      {isOpen && <div className="faq-answer">{answer}</div>}
    </div>
  );
};

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="about-page-wrapper">
      
      <div className="about-content-scroll">
        <div className="about-header-hero">
          <button className="back-to-login" onClick={() => navigate('/login')}>
            Enter Command Center
          </button>
          
          <div className="hero-badge animate-pulse">AETHERGRID ECOSYSTEM</div>
          <h1 className="hero-title">Shaping the Future <br/>Of Energy Resilience</h1>
          <p className="hero-subtitle">
            A smart solar grid management platform designed for modern, decentralized power systems.
          </p>
        </div>

        <div className="features-container">
          
          {/* 5W1H Section */}
          <RevealOnScroll>
            <div className="feature-category-header sys-theme">
              <h2>5W1H – Understanding Our System</h2>
              <div className="header-line"></div>
            </div>
            <div className="grid-3 gap-xl mt-xl">
               <div className="q-card">
                  <span className="q-label">What?</span>
                  <p className="q-ans">A platform to monitor energy consumption, generation, storage, and grid conditions in real-time for better decision making.</p>
               </div>
               <div className="q-card">
                  <span className="q-label">Why?</span>
                  <p className="q-ans">Renewable energy is unpredictable. This system balances supply/demand, reduces waste, and prevents failures.</p>
               </div>
               <div className="q-card">
                  <span className="q-label">Who?</span>
                  <p className="q-ans">Households managing energy, Grid Admins stabilizing the network, and Producers tracking distribution.</p>
               </div>
               <div className="q-card">
                  <span className="q-label">When?</span>
                  <p className="q-ans">Useful during peak demand, weather fluctuations (solar drop), grid stress, or for daily cost optimization.</p>
               </div>
               <div className="q-card">
                  <span className="q-label">Where?</span>
                  <p className="q-ans">Deployed in smart homes, industrial complexes, smart cities, and localized renewable energy networks.</p>
               </div>
               <div className="q-card">
                  <span className="q-label">How?</span>
                  <p className="q-ans">Collects data, uses AI to analyze patterns, applies load shifting, and enables peer-to-peer energy sharing.</p>
               </div>
            </div>
          </RevealOnScroll>

          {/* USER FEATURES */}
          <RevealOnScroll>
            <div className="feature-category-header user-theme" style={{marginTop: '100px'}}>
              <h2>User Side Capabilities</h2>
              <div className="header-line"></div>
            </div>
            <div className="features-grid">
              <FeatureCard icon={Activity} title="Energy Tracking" desc="Real-time energy consumption tracking for maximum visibility." />
              <FeatureCard icon={Sun} title="Renewable Sync" desc="Live monitoring of solar and wind generation levels." />
              <FeatureCard icon={BatteryFull} title="Storage Intel" desc="Advanced battery and storage level indication." />
              <FeatureCard icon={Map} title="Grid Alerts" desc="Instant notifications of localized grid conditions." />
              <FeatureCard icon={Compass} title="Demand Response" desc="Smart suggestions for energy-efficient usage patterns." />
              <FeatureCard icon={Settings} title="Load Control" desc="Automated control of high-demand home appliances." />
              <FeatureCard icon={CloudLightning} title="Weather Alerts" desc="Alerts tied directly to atmospheric condition shifts." />
              <FeatureCard icon={Share2} title="Energy Sharing" desc="Enabled peer-to-peer energy exchange with neighbors." />
            </div>
          </RevealOnScroll>

          {/* ADMIN FEATURES */}
          <RevealOnScroll>
            <div className="feature-category-header admin-theme" style={{marginTop: '100px'}}>
              <h2>Admin Control Deck</h2>
              <div className="header-line"></div>
            </div>
            <div className="features-grid">
              <FeatureCard icon={Activity} title="Grid Monitoring" desc="Full-spectrum monitoring of the entire energy landscape." />
              <FeatureCard icon={BarChart} title="Supply vs Demand" desc="Complex analysis of production against real-time consumption." />
              <FeatureCard icon={ShieldAlert} title="Zone Detection" desc="Automatic detection of stressed or overloaded grid sectors." />
              <FeatureCard icon={Zap} title="VPP Integration" desc="Seamless management of Virtual Power Plant clusters." />
              <FeatureCard icon={Workflow} title="Frequency Pulse" desc="Real-time monitoring of grid frequency and phase stability." />
              <FeatureCard icon={Cpu} title="AI Optimization" desc="Machine-learning based forecasting and load balancing." />
              <FeatureCard icon={Share2} title="Redistribution" desc="Automated energy redistribution to maintaining equilibrium." />
              <FeatureCard icon={Server} title="Grid Recovery" desc="High-speed response sequences for grid re-stabilization." />
            </div>
          </RevealOnScroll>

          {/* FAQ SECTION */}
          <RevealOnScroll>
            <div className="feature-category-header sys-theme" style={{marginTop: '100px'}}>
              <h2>Frequently Asked Questions</h2>
              <div className="header-line"></div>
            </div>
            <div className="faq-grid mt-xl" style={{marginBottom: '150px'}}>
              <FAQItem question="Is this system only for solar energy?" answer="No, it supports multiple renewable sources like solar and wind, and can also work with traditional grid systems." />
              <FAQItem question="Can users really sell their energy?" answer="Yes, users with excess energy (like from solar panels) can share or sell it through the system." />
              <FAQItem question="What happens during a power outage?" answer="The system helps in grid recovery and backup management, including battery usage and redistribution of energy." />
              <FAQItem question="Is the system automatic or manual?" answer="Both. Users can control settings manually, but AI automation can handle most operations for better efficiency." />
              <FAQItem question="How accurate is the data shown?" answer="The system uses real-time monitoring, so the data is highly accurate with small practical variations." />
              <FAQItem question="Will this help reduce electricity bills?" answer="Yes, by optimizing usage, reducing wastage, and using renewable energy effectively, users can lower their costs." />
              <FAQItem question="Is it safe to allow automated control?" answer="Yes, automation is designed with safety rules and user permissions, so it only controls approved devices." />
              <FAQItem question="Can this system be used in small homes?" answer="Yes, it is scalable and can be used from small homes to large smart grids." />
            </div>
          </RevealOnScroll>

        </div>
      </div>
    </div>
  );
};

export default About;
