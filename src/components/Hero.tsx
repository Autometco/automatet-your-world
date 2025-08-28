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
    let time = 0;
    let animationId: number;

    // Color palette inspired by OpenAI
    const colors = [
      { r: 99, g: 102, b: 241 },   // Indigo
      { r: 139, g: 92, b: 246 },   // Purple
      { r: 236, g: 72, b: 153 },   // Pink
      { r: 34, g: 197, b: 94 },    // Green
      { r: 59, g: 130, b: 246 },   // Blue
      { r: 245, g: 101, b: 101 }   // Red
    ];

    class FlowField {
      cols: number;
      rows: number;
      field: number[][];
      
      constructor(resolution: number) {
        this.cols = Math.floor(width / resolution);
        this.rows = Math.floor(height / resolution);
        this.field = [];
        
        for (let i = 0; i < this.cols; i++) {
          this.field[i] = [];
          for (let j = 0; j < this.rows; j++) {
            this.field[i][j] = 0;
          }
        }
      }
      
      update() {
        for (let i = 0; i < this.cols; i++) {
          for (let j = 0; j < this.rows; j++) {
            const angle = Math.sin(i * 0.01 + time * 0.002) * Math.PI * 2 + 
                         Math.cos(j * 0.01 + time * 0.002) * Math.PI * 2;
            this.field[i][j] = angle;
          }
        }
      }
    }

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      color: { r: number; g: number; b: number };
      trail: { x: number; y: number; opacity: number }[];
      maxTrailLength: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = 0;
        this.vy = 0;
        this.size = Math.random() * 2 + 1;
        this.opacity = Math.random() * 0.8 + 0.2;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.trail = [];
        this.maxTrailLength = 15;
      }

      update(flowField: FlowField) {
        const col = Math.floor(this.x / (width / flowField.cols));
        const row = Math.floor(this.y / (height / flowField.rows));
        
        if (col >= 0 && col < flowField.cols && row >= 0 && row < flowField.rows) {
          const angle = flowField.field[col][row];
          this.vx = Math.cos(angle) * 0.5;
          this.vy = Math.sin(angle) * 0.5;
        }
        
        // Add current position to trail
        this.trail.push({ x: this.x, y: this.y, opacity: this.opacity });
        if (this.trail.length > this.maxTrailLength) {
          this.trail.shift();
        }
        
        this.x += this.vx;
        this.y += this.vy;

        // Wrap around edges
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
      }

      draw() {
        // Draw trail
        this.trail.forEach((point, index) => {
          const trailOpacity = (index / this.trail.length) * this.opacity * 0.3;
          const size = (index / this.trail.length) * this.size * 0.5;
          
          ctx.save();
          ctx.globalAlpha = trailOpacity;
          const gradient = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, size * 2);
          gradient.addColorStop(0, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${trailOpacity})`);
          gradient.addColorStop(1, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0)`);
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        });

        // Draw main particle
        ctx.save();
        ctx.globalAlpha = this.opacity;
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 3);
        gradient.addColorStop(0, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity})`);
        gradient.addColorStop(0.4, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity * 0.5})`);
        gradient.addColorStop(1, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0)`);
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Add subtle glow
        ctx.shadowBlur = 20;
        ctx.shadowColor = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0.5)`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 0.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    let particles: Particle[] = [];
    let flowField: FlowField;

    const init = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width;
      canvas.height = height;
      
      flowField = new FlowField(50);
      particles = [];
      
      // Create fewer, more elegant particles
      for (let i = 0; i < 60; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      time++;
      
      // Create sophisticated background gradient
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      const baseHue = (time * 0.1) % 360;
      
      gradient.addColorStop(0, `hsla(${baseHue}, 20%, 8%, 0.95)`);
      gradient.addColorStop(0.3, `hsla(${(baseHue + 60) % 360}, 25%, 12%, 0.92)`);
      gradient.addColorStop(0.7, `hsla(${(baseHue + 120) % 360}, 20%, 10%, 0.9)`);
      gradient.addColorStop(1, `hsla(${(baseHue + 180) % 360}, 15%, 6%, 0.95)`);
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
      
      // Add subtle noise texture
      const imageData = ctx.getImageData(0, 0, width, height);
      const data = imageData.data;
      
      for (let i = 0; i < data.length; i += 4) {
        const noise = (Math.random() - 0.5) * 8;
        data[i] += noise;     // Red
        data[i + 1] += noise; // Green  
        data[i + 2] += noise; // Blue
      }
      
      ctx.putImageData(imageData, 0, 0);
      
      // Update and draw flow field and particles
      flowField.update();
      
      particles.forEach(particle => {
        particle.update(flowField);
        particle.draw();
      });
      
      // Add ethereal overlay gradients
      const overlayGradient1 = ctx.createRadialGradient(width * 0.3, height * 0.3, 0, width * 0.3, height * 0.3, width * 0.5);
      overlayGradient1.addColorStop(0, 'rgba(139, 92, 246, 0.03)');
      overlayGradient1.addColorStop(1, 'rgba(139, 92, 246, 0)');
      ctx.fillStyle = overlayGradient1;
      ctx.fillRect(0, 0, width, height);
      
      const overlayGradient2 = ctx.createRadialGradient(width * 0.7, height * 0.7, 0, width * 0.7, height * 0.7, width * 0.4);
      overlayGradient2.addColorStop(0, 'rgba(59, 130, 246, 0.02)');
      overlayGradient2.addColorStop(1, 'rgba(34, 197, 94, 0)');
      ctx.fillStyle = overlayGradient2;
      ctx.fillRect(0, 0, width, height);

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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Animated Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-90"
      />

      {/* Sophisticated Overlay Gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      <div className="absolute inset-0 bg-gradient-to-tl from-transparent via-background/10 to-transparent" />

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