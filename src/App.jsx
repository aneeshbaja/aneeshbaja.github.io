import { useState, useEffect, useRef } from 'react';
import './App.css';

function TwinklingStarsBackground() {
  const canvasRef = useRef(null);
  const animationRef = useRef();
  const stars = useRef([]);
  const shootingStars = useRef([]);
  const STAR_COUNT = 120;
  const SHOOTING_STAR_FREQ = 0.012; // increased chance per frame

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    function randomStar() {
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        r: 0.5 + Math.random() * 1.2,
        baseAlpha: 0.15 + Math.random() * 0.25,
        twinkleSpeed: 0.005 + Math.random() * 0.008,
        twinklePhase: Math.random() * Math.PI * 2,
      };
    }
    stars.current = Array.from({ length: STAR_COUNT }, randomStar);

    function spawnShootingStar() {
      // Start from random top/left edge, shoot diagonally
      const fromLeft = Math.random() < 0.5;
      const x = fromLeft ? -20 : width + 20;
      const y = Math.random() * height * 0.5;
      const angle = fromLeft ? (Math.PI / 4) : (3 * Math.PI / 4);
      const speed = 8 + Math.random() * 4;
      return {
        x,
        y,
        r: 2.2 + Math.random() * 1.2,
        alpha: 1,
        angle,
        speed,
        life: 0,
        maxLife: 60 + Math.random() * 30,
      };
    }

    function animate(time) {
      ctx.clearRect(0, 0, width, height);
      // Twinkling stars
      for (let star of stars.current) {
        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinklePhase) * 0.5 + 0.5;
        ctx.globalAlpha = star.baseAlpha + twinkle * 0.25;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = '#fff';
        ctx.shadowColor = '#fff';
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.globalAlpha = 1;
      }
      // Shooting stars
      if (Math.random() < SHOOTING_STAR_FREQ) {
        shootingStars.current.push(spawnShootingStar());
      }
      for (let i = shootingStars.current.length - 1; i >= 0; i--) {
        const s = shootingStars.current[i];
        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;
        s.life++;
        s.alpha = Math.max(0, 1 - s.life / s.maxLife);
        ctx.save();
        ctx.globalAlpha = s.alpha;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = '#fff';
        ctx.shadowColor = '#fff';
        ctx.shadowBlur = 16;
        ctx.fill();
        ctx.restore();
        if (
          s.life > s.maxLife ||
          s.x < -40 || s.x > width + 40 ||
          s.y < -40 || s.y > height + 40
        ) {
          shootingStars.current.splice(i, 1);
        }
      }
      animationRef.current = requestAnimationFrame(animate);
    }
    animationRef.current = requestAnimationFrame(animate);
    function handleResize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      stars.current = Array.from({ length: STAR_COUNT }, randomStar);
    }
    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="shooting-stars-bg"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    />
  );
}

const features = [
  {
    icon: 'fa-puzzle-piece',
    title: 'Modular Platform',
    desc: 'Build your perfect teaching toolkit with our modular platform. Add or remove features to match your unique teaching style and needs.'
  },
  {
    icon: 'fa-plug',
    title: 'Plugin System',
    desc: 'Extend functionality with our powerful plugin system. Choose from hundreds of educational tools and integrations.'
  },
  {
    icon: 'fa-user-graduate',
    title: 'Personalized Learning',
    desc: 'Deliver personalized learning experiences at any scale, from individual tutoring to large classroom settings.'
  },
  {
    icon: 'fa-book-open',
    title: 'Adaptable Curriculum',
    desc: 'Easily adapt to any curriculum or teaching methodology with our flexible platform.'
  },
  {
    icon: 'fa-chart-line',
    title: 'Predictive Analytics',
    desc: 'Leverage powerful data and analytics to predict student outcomes and intervene early when needed.'
  },
  {
    icon: 'fa-tachometer-alt',
    title: 'Interactive Dashboard',
    desc: 'Your all-in-one command center to manage classes, track progress, and handle all teaching tasks from a single, intuitive interface.'
  },
];

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(true);
  const modalRef = useRef(null);

  useEffect(() => {
    if (showComingSoon) {
      const timer = setTimeout(() => setShowComingSoon(false), 2500);
      return () => clearTimeout(timer);
    }
  }, [showComingSoon]);

  useEffect(() => {
    if (modalOpen) {
      document.body.classList.add('modal-open');
      setTimeout(() => {
        if (modalRef.current) modalRef.current.focus();
      }, 50);
    } else {
      document.body.classList.remove('modal-open');
    }
    return () => document.body.classList.remove('modal-open');
  }, [modalOpen]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(true); // Show success instantly
    setLoading(true);
    const scriptURL = 'https://script.google.com/macros/s/AKfycbxXrOn-pyEUKcL0iMNOq4fISwNyxgFohyXu9tCBmdruVo5UySgltUw6WnkSvbRvMqoBmw/exec';
    const data = `name=${encodeURIComponent(form.name)}&email=${encodeURIComponent(form.email)}`;
    setForm({ name: '', email: '' });
    // Fire and forget
    fetch(scriptURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: data
    }).finally(() => setLoading(false));
  };

  return (
    <div className="landing-bg">
      {showComingSoon && (
        <div className="coming-soon-overlay">
          <span className="coming-soon-text">Coming Soon</span>
        </div>
      )}
      <TwinklingStarsBackground />
      <div className="landing-content">
        <header className="header">
          <div className="logo">Campanion</div>
        </header>
        <main className="hero-section">
          <h1>Teaching <span className="gradient-text">Simplified</span></h1>
          <p className="subtitle">Campanion is your all-in-one suite of tools designed to make teaching more effective, organized, and enjoyable. Save time and engage your students like never before.</p>
          <button className="btn-primary btn-large" onClick={() => setModalOpen(true)}>
            Join Waitlist
          </button>
          <span className="trusted-text">Trusted by educators worldwide</span>
        </main>
        <section className="features-section">
          <div className="section-header">
            <h2>Everything You Need in One Place</h2>
            <p className="section-subtitle">Campanion combines powerful tools to streamline your teaching workflow</p>
          </div>
          <div className="feature-grid">
            {features.map((f, i) => (
              <div className="feature-card" key={i}>
                <div className="feature-icon">
                  <i className={`fas ${f.icon}`}></i>
                </div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="demo-video">
          <h2>See Campanion in Action</h2>
          <div className="video-container">
            <div className="video-placeholder">
              <i className="fas fa-play-circle"></i>
              <p>Watch our product demo</p>
            </div>
          </div>
        </section>
      </div>
      {modalOpen && (
        <div className="modal-backdrop" onClick={() => setModalOpen(false)}>
          <div
            className="modal"
            ref={modalRef}
            tabIndex={-1}
            onClick={e => e.stopPropagation()}
          >
            <button className="modal-close" onClick={() => setModalOpen(false)}>&times;</button>
            <h2>Join the Waitlist</h2>
            {success ? (
              <div className="success-message">Thank you for joining the waitlist!</div>
            ) : (
              <form onSubmit={handleSubmit} className="waitlist-form">
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  autoComplete="off"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  autoComplete="off"
                />
                <button type="submit" className="btn-primary" disabled={loading}>
                  {loading ? 'Submitting...' : 'Submit'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
