import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";

export const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width: number, height: number;
    let particles: Particle[] = [];
    let animationId: number;

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      color: string;
      life: number;
      maxLife: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 3 + 1;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.color = `hsl(${220 + Math.random() * 40}, 70%, ${60 + Math.random() * 20}%)`;
        this.life = 0;
        this.maxLife = Math.random() * 200 + 100;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life++;

        // Wrap around screen
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;

        // Fade based on life
        this.opacity = Math.max(0, 0.7 - (this.life / this.maxLife));
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    const init = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width;
      canvas.height = height;
      
      particles = [];
      for (let i = 0; i < 80; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      // Dark background with subtle gradient
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, 'rgba(15, 23, 42, 0.95)');
      gradient.addColorStop(0.5, 'rgba(30, 41, 59, 0.9)');
      gradient.addColorStop(1, 'rgba(51, 65, 85, 0.85)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Update and draw particles
      particles.forEach((particle, index) => {
        particle.update();
        particle.draw();

        // Remove dead particles and replace with new ones
        if (particle.life > particle.maxLife) {
          particles[index] = new Particle();
        }
      });

      // Draw connections between nearby particles
      particles.forEach((particle, i) => {
        particles.slice(i + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.save();
            ctx.globalAlpha = (120 - distance) / 120 * 0.2;
            ctx.strokeStyle = 'rgba(59, 130, 246, 0.5)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
            ctx.restore();
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };

    const handleResize = () => init();

    window.addEventListener("resize", handleResize);
    init();
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-900">
      {/* Animated Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 via-transparent to-slate-900/30" />

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-4 text-center animate-fade-in">
        <h1 className="text-4xl md:text-6xl font-bold mb-8 text-white leading-[1.1] tracking-tight">
          El Futuro es Autónomo.{" "}
          <span className="bg-hero-gradient bg-clip-text text-transparent">
            Potenciamos tu Negocio con IA.
          </span>
        </h1>
        <p className="text-lg md:text-xl text-slate-300 max-w-4xl mx-auto mb-8 animate-slide-up leading-relaxed">
          Usamos el poder de la Inteligencia Artificial para crear automatizaciones que piensan, aprenden y optimizan por ti.
        </p>
        <Button 
          size="lg" 
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg shadow-glow animate-bounce-in hover:scale-105 transition-transform"
          onClick={scrollToContact}
        >
          Diseña tu Solución de IA
        </Button>
      </div>

      {/* Floating Geometric Elements */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-blue-400/30 rotate-45 animate-float" />
      <div className="absolute top-40 right-20 w-6 h-6 bg-teal-400/30 rounded-full animate-float" style={{ animationDelay: "1s" }} />
      <div className="absolute bottom-40 left-20 w-3 h-3 bg-purple-400/30 rotate-45 animate-float" style={{ animationDelay: "2s" }} />
      <div className="absolute top-1/3 right-1/4 w-8 h-8 border border-cyan-400/20 rotate-12 animate-float" style={{ animationDelay: "0.5s" }} />
    </section>
  );
};