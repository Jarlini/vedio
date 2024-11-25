import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Tv, Users, Zap } from 'lucide-react';
import { color } from 'framer-motion';

// Light theme with teal and orange color scheme
const theme = {
  light: {
    background: {
      page: '#f9fafb',
      card: '#ffffff',
      cardHover: '#f3f4f6',
      cardDefault: '#f9fafb',
      color:'teal',
    },
    text: {
      primary: '#111827',
      secondary: '#4B5563',
      tertiary: '#6B7280',
    },
    accent: {
      primary: '#008080', // teal
      primaryHover: '#006666', // darker teal
      secondary: '#FFA500', // orange
      tertiary: 'rgba(255, 165, 0, 0.2)', // light orange
    },
    border: {
      card: '#e5e7eb',
    },
  },
};

// CSS Styles
const styles = {
  container: (themeMode) => ({
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: themeMode.background.page,
  }),
  mainCard: (themeMode) => ({
    width: '100%',
    height: '70%',
    maxWidth: '64rem',
    padding: '2rem',
    borderRadius: '0.75rem',
    backgroundColor: themeMode.background.card,
    border: `1px solid ${themeMode.border.card}`,
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    position: 'relative',
  }),
  title: {
    fontSize: '3.75rem',
    fontWeight: 'bold',
    color: theme.light.text.primary,
    textAlign: 'center',
    marginBottom: '1.5rem',
  },
  accentText: {
    color: theme.light.accent.primary,
  },
  input: {
    width: '100%',
    padding: '0.75rem 1rem',
    backgroundColor: '#f3f4f6',
    border: '1px solid #e5e7eb',
    borderRadius: '0.375rem',
    color: '#111827',
  },
  button: {
    padding: '1rem 2rem',
    backgroundImage: 'linear-gradient(to right, #008080, #00B8B8)', // gradient from teal to light teal
    color: '#FFFFFF',
    borderRadius: '0.375rem',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    cursor: 'pointer',
  },
  featureCard: {
    padding: '1.5rem',
    borderRadius: '0.5rem',
    backgroundColor: '#f9fafb',
    transition: 'all 0.3s ease',
  },
};

const ParticleAnimation = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    setParticles(Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      size: Math.random() * 3 + 1,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 10 + 20,
      delay: Math.random() * 5,
    })));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden h-auto">
      {particles.map((particle) => (
        <div
          key={particle.id}
          style={{
            position: 'absolute',
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            backgroundColor: '#FFA500', // orange color for particles
            borderRadius: '50%',
            animation: `float ${particle.duration}s infinite alternate`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

const FeatureCard = ({ icon: Icon, title, description, themeMode }) => {
  return (
    <div style={styles.featureCard}>
      <Icon
        style={{
          color: themeMode.accent.secondary, // orange color
          width: '3rem',
          height: '3rem',
          marginBottom: '1rem',
        }}
      />
      <h3 style={{ color: themeMode.text.primary, fontSize: '1.25rem', marginBottom: '0.5rem' }}>
        {title}
      </h3>
      <p style={{ color: themeMode.text.secondary }}>{description}</p>
    </div>
  );
};

const LiveStream = () => {
  const [roomId, setRoomId] = useState('');
  const navigate = useNavigate();

  const handleClick = () => {
    if (roomId) navigate(`/room/${roomId}`);
  };

  return (
    <div style={styles.container(theme.light)}>
      <ParticleAnimation />
      
      <div style={styles.mainCard(theme.light)}>
        <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
          <h1 style={styles.title}>
            Live Stream <span style={styles.accentText}>Now</span>
          </h1>
          <p style={{ color: theme.light.text.secondary, fontSize: '1.25rem' }}>
            Experience the thrill of live content at your fingertips
          </p>
        </div>

        <div style={{ maxWidth: '32rem', margin: '0 auto', marginBottom: '1rem' }}>
          <input
            type="text"
            placeholder="Enter room ID"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            style={styles.input}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '1.5rem' }}>
          <button
            style={styles.button}
            onClick={handleClick}
          >
            <Play style={{ width: '1.5rem', height: '1.5rem' }} />
            Join Stream
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
  <FeatureCard
    icon={Tv}
    title="Real-Time Updates"
    description="Stay updated with real-time notifications and alerts for your trips."
    themeMode={theme.light}
  />
  <FeatureCard
    icon={Users}
    title="Group Communication"
    description="Easily communicate with fellow travelers through Voyago's group messaging system."
    themeMode={theme.light}
  />
  <FeatureCard
    icon={Zap}
    title="Instant Support"
    description="Get instant support from our team for any travel-related queries."
    themeMode={theme.light}
  />
</div>

      </div>
    </div>
  );
};

export default LiveStream;
