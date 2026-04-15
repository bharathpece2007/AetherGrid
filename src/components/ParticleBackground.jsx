import React, { useRef, useEffect } from 'react';

const ParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let particles = [];
    let mouse = { x: null, y: null, radius: 150 };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const handleMouseMove = (e) => {
      mouse.x = e.x;
      mouse.y = e.y;
    };

    const handleMouseOut = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseOut);

    class Particle {
      constructor(x, y, dx, dy, size) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.size = size;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = 'rgba(255, 223, 0, 0.4)'; // Fainter golden dot
        ctx.fill();
      }

      update() {
        // Bounce off walls
        if (this.x > canvas.width || this.x < 0) this.dx = -this.dx;
        if (this.y > canvas.height || this.y < 0) this.dy = -this.dy;

        this.x += this.dx;
        this.y += this.dy;

        // Mouse interactivity
        if (mouse.x != null && mouse.y != null) {
          let dx = mouse.x - this.x;
          let dy = mouse.y - this.y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          
          // Connect line if mouse is close
          if (distance < mouse.radius) {
            ctx.beginPath();
            let opacity = (1 - distance/mouse.radius) * 0.5; // lower mouse grab intensity
            ctx.strokeStyle = `rgba(255, 215, 0, ${opacity})`; // Fainter gold line to mouse
            ctx.lineWidth = 1 + (opacity * 1); // Not as thick
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }

        this.draw();
      }
    }

    const initParticles = () => {
      particles = [];
      // Calculate particles based on screen size, but hardcap at 120 max to guarantee 60FPS
      let calculatedParticles = (canvas.width * canvas.height) / 9000;
      let numberOfParticles = Math.min(calculatedParticles, 120); 
      
      for (let i = 0; i < numberOfParticles; i++) {
        let size = Math.random() * 2 + 1;
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let dx = (Math.random() - 0.5) * 1.5;
        let dy = (Math.random() - 0.5) * 1.5;
        particles.push(new Particle(x, y, dx, dy, size));
      }
    };

    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        
        // Check connecting lines between particles
        // O(N^2) operation - keep max particles low to avoid lag
        for (let j = i + 1; j < particles.length; j++) {
          let dx = particles[i].x - particles[j].x;
          let dy = particles[i].y - particles[j].y;
          let distance = Math.sqrt(dx * dx + dy * dy);

          // We draw the line only if distance is close enough
          if (distance < 160) { 
            ctx.beginPath();
            let opacity = (1 - distance / 160) * 0.3; // Low opacity
            ctx.strokeStyle = `rgba(255, 215, 0, ${opacity})`; // Fainter gold
            ctx.lineWidth = 0.5; // Fixed small line width for performance
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      animationFrameId = window.requestAnimationFrame(animateParticles);
    };

    handleResize();
    animateParticles();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseOut);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        background: '#050505' // Black background
      }}
    />
  );
};

export default ParticleBackground;
